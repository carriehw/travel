"""Build same-size Reference / Live / 50% Overlay evidence. Never auto-sign off."""
import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

parser = argparse.ArgumentParser()
parser.add_argument("directory", type=Path)
parser.add_argument("--diagnostic-source", type=Path)
args = parser.parse_args()
directory = args.directory.resolve()
capture = json.loads((directory / "capture.json").read_text())
manifest = json.loads((ROOT / "assets/v20/screen01_manifest.json").read_text())
canonical = ROOT / manifest["reference"]["path"]
verified = canonical.is_file() and hashlib.sha256(canonical.read_bytes()).hexdigest() == manifest["reference"]["sha256"]
source = canonical if verified else args.diagnostic_source
source_image = None
if source:
    with Image.open(source) as image:
        image.load()
        source_image = image.convert("RGB")
    if verified and source_image.size != (345, 697):
        raise ValueError("Canonical dimensions differ from the locked source")

cases = []
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
    cases.append({
        "label": item["engine"] + " / " + str(item["width"]) + "px",
        "reference": prefix + "-reference.png", "live": item["live"],
        "overlay": prefix + "-overlay50.png", "width": live.width, "height": live.height,
    })

review = {
    "visualVerdict": "FAIL" if not verified or capture["visualVerdict"] == "FAIL" else "REQUIRES_HUMAN_REVIEW",
    "referenceVerified": verified,
    "source": str(source.relative_to(ROOT)) if source and source.is_relative_to(ROOT) else str(source),
    "sourceSHA256": hashlib.sha256(source.read_bytes()).hexdigest() if source else None,
    "note": "Diagnostic source is cropped, low resolution and NOT an approved reference. It cannot establish fidelity." if not verified else "Review geometry, artwork identity, copy, sharpness and all remaining acceptance criteria.",
    "cases": cases,
}
(directory / "review.json").write_text(json.dumps(review, ensure_ascii=False, indent=2) + "\n")
data = json.dumps(cases, ensure_ascii=False)
reference_label = "Reference — verified Golden Master" if verified else "Reference slot — UNVERIFIED diagnostic source"
html = """<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Screen 1 QA evidence</title>
<style>
body{font:16px/1.5 system-ui;margin:24px;color:#262626;background:#fafafa}
select,input{font:inherit}strong{color:#9c2626}
.panels{display:flex;gap:16px;align-items:flex-start;overflow:auto;margin-top:20px}
figure{margin:0;flex:0 0 auto}figcaption{font-size:14px;margin-bottom:8px}
img{display:block;max-width:430px;border:1px solid #ccc}
.stack{position:relative}.stack img:last-child{position:absolute;inset:0;opacity:.5}
label{margin-right:16px}p{max-width:900px}
</style><h1>Screen 1 visual QA: VERDICT</h1>
<p><strong>NOTE</strong></p>
<p>Live captures are actual v20 output. Blank Live captures show the missing production artwork.
Engineering fixtures are excluded. WebKit emulation does not replace real iOS Safari or ChatGPT in-app UAT.</p>
<label>Browser / width <select id="case"></select></label>
<label>Live opacity <input id="opacity" type="range" min="0" max="100" value="50">
<output id="percentage">50%</output></label>
<div class="panels">
<figure><figcaption>REFERENCE_LABEL</figcaption><img id="reference" alt="Reference slot"></figure>
<figure><figcaption>Live — actual Screen 1</figcaption><img id="live" alt="Actual live artboard"></figure>
<figure><figcaption>Overlay — starts at 50% Live</figcaption>
<div class="stack"><img id="overlay-reference" alt=""><img id="overlay-live" alt="Live over reference"></div></figure>
</div><p>Saved 50% overlay PNGs are listed in <a href="review.json">review.json</a>.
Measurements and checks: <a href="capture.json">capture.json</a>.
Source integrity: <a href="asset-validation.json">asset-validation.json</a>.</p>
<script>
const cases=CASE_DATA, selector=document.getElementById("case");
for(let i=0;i<cases.length;i++){const option=new Option(cases[i].label,i);selector.add(option);}
function show(){const item=cases[selector.value||0];if(!item)return;
document.getElementById("reference").src=item.reference;
document.getElementById("live").src=item.live;
document.getElementById("overlay-reference").src=item.reference;
document.getElementById("overlay-live").src=item.live;}
selector.onchange=show;show();
document.getElementById("opacity").oninput=event=>{
document.getElementById("overlay-live").style.opacity=event.target.value/100;
document.getElementById("percentage").value=event.target.value+"%";};
</script></html>"""
html = html.replace("VERDICT", review["visualVerdict"]).replace("NOTE", review["note"])
html = html.replace("REFERENCE_LABEL", reference_label).replace("CASE_DATA", data)
(directory / "index.html").write_text(html)
print(json.dumps({"visual": review["visualVerdict"], "verifiedReference": verified, "cases": len(cases)}))
raise SystemExit(1 if review["visualVerdict"] == "FAIL" else 0)
