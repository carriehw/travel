"""Build Reference / Live / Overlay evidence and calculate pixel-fidelity metrics."""
import argparse
import hashlib
import json
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageOps, ImageStat

ROOT = Path(__file__).resolve().parents[1]

parser = argparse.ArgumentParser()
parser.add_argument("directory", type=Path)
args = parser.parse_args()
directory = args.directory.resolve()
capture = json.loads((directory / "capture.json").read_text())
manifest = json.loads((ROOT / "assets/v20/screen01_manifest.json").read_text())
canonical = ROOT / manifest["reference"]["path"]
verified = canonical.is_file() and hashlib.sha256(canonical.read_bytes()).hexdigest() == manifest["reference"]["sha256"]
source_image = None
if verified:
    with Image.open(canonical) as image:
        image.load()
        source_image = image.convert("RGB")
    expected = (manifest["reference"]["width"], manifest["reference"]["height"])
    if source_image.size != expected:
        raise ValueError("Canonical dimensions differ from manifest")

cases = []
pixel_pass = verified and capture["visualVerdict"] != "FAIL"
for item in capture["cases"]:
    prefix = item["engine"] + "-" + str(item["width"])
    with Image.open(directory / item["live"]) as image:
        live = image.convert("RGB")
    reference = Image.new("RGB", live.size, "#fff8e9")
    if source_image:
        fitted = ImageOps.contain(source_image, live.size, Image.Resampling.LANCZOS)
        reference.paste(fitted, ((live.width - fitted.width) // 2, 0))
    reference.save(directory / (prefix + "-reference.png"))
    Image.blend(reference, live, .5).save(directory / (prefix + "-overlay50.png"))

    diff = ImageChops.difference(reference, live)
    stat = ImageStat.Stat(diff)
    mae = sum(stat.mean) / len(stat.mean)
    mse = sum(value * value for value in stat.rms) / len(stat.rms)
    psnr = float("inf") if mse == 0 else 10 * math.log10((255 * 255) / mse)
    this_pass = mae <= 4.0 and psnr >= 30
    pixel_pass = pixel_pass and this_pass

    cases.append({
        "label": item["engine"] + " / " + str(item["width"]) + "px",
        "reference": prefix + "-reference.png",
        "live": item["live"],
        "overlay": prefix + "-overlay50.png",
        "width": live.width,
        "height": live.height,
        "mae": round(mae, 4),
        "psnr": round(psnr, 3),
        "pixelPass": this_pass,
    })

verdict = "PASS_AUTOMATED" if pixel_pass else "FAIL"
review = {
    "visualVerdict": verdict,
    "referenceVerified": verified,
    "source": str(canonical.relative_to(ROOT)) if verified else None,
    "sourceSHA256": hashlib.sha256(canonical.read_bytes()).hexdigest() if verified else None,
    "thresholds": {"maeMax": 4.0, "psnrMin": 30},
    "note": "Automated pixel pass means the browser output matches the locked Golden Master within tolerance. Real-device UAT is still required before staging sign-off.",
    "cases": cases,
}
(directory / "review.json").write_text(json.dumps(review, ensure_ascii=False, indent=2) + "\n")

data = json.dumps(cases, ensure_ascii=False)
html = """<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Screen 1 QA evidence</title>
<style>
body{font:16px/1.5 system-ui;margin:24px;color:#262626;background:#fafafa}
select,input{font:inherit}.panels{display:flex;gap:16px;align-items:flex-start;overflow:auto;margin-top:20px}
figure{margin:0;flex:0 0 auto}figcaption{font-size:14px;margin-bottom:8px}
img{display:block;max-width:430px;border:1px solid #ccc}.stack{position:relative}
.stack img:last-child{position:absolute;inset:0;opacity:.5}label{margin-right:16px}p{max-width:900px}
</style><h1>Screen 1 visual QA: VERDICT</h1>
<p>Reference is the verified complete-footer Golden Master. Live captures are the actual v20.3 browser output.</p>
<label>Browser / width <select id="case"></select></label>
<label>Live opacity <input id="opacity" type="range" min="0" max="100" value="50"><output id="percentage">50%</output></label>
<div class="panels">
<figure><figcaption>Reference</figcaption><img id="reference" alt="Verified Golden Master"></figure>
<figure><figcaption>Live</figcaption><img id="live" alt="Actual Screen 1"></figure>
<figure><figcaption>50% Overlay</figcaption><div class="stack"><img id="overlay-reference" alt=""><img id="overlay-live" alt="Live over reference"></div></figure>
</div>
<p id="metrics"></p>
<script>
const cases=CASE_DATA,selector=document.getElementById("case");
for(let i=0;i<cases.length;i++)selector.add(new Option(cases[i].label,i));
function show(){const item=cases[selector.value||0];if(!item)return;
reference.src=item.reference;live.src=item.live;
document.getElementById("overlay-reference").src=item.reference;
document.getElementById("overlay-live").src=item.live;
document.getElementById("metrics").textContent="MAE "+item.mae+" / PSNR "+item.psnr+" dB / "+(item.pixelPass?"PASS":"FAIL");}
selector.onchange=show;show();
opacity.oninput=e=>{document.getElementById("overlay-live").style.opacity=e.target.value/100;percentage.value=e.target.value+"%";};
</script></html>"""
html = html.replace("VERDICT", verdict).replace("CASE_DATA", data)
(directory / "index.html").write_text(html)
print(json.dumps({"visual": verdict, "verifiedReference": verified, "cases": len(cases)}))
raise SystemExit(0 if verdict == "PASS_AUTOMATED" else 1)
