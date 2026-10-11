"""Build reference/live/overlay evidence for native-text Screen 1.
Pixel equality is intentionally not a gate because Golden Master AI glyphs are not copy authority.
"""
import argparse,json
from pathlib import Path
from PIL import Image,ImageOps

ROOT=Path(__file__).resolve().parents[1]
ap=argparse.ArgumentParser();ap.add_argument("directory",type=Path);args=ap.parse_args();directory=args.directory.resolve()
capture=json.loads((directory/"capture.json").read_text())
canonical=ROOT/"assets/reference/home_master_complete_footer.png"
if not canonical.is_file(): raise SystemExit("missing canonical reference")
with Image.open(canonical) as im: source=im.convert("RGB")

cases=[]
for item in capture["cases"]:
    prefix=item["engine"]+"-"+str(item["width"])
    with Image.open(directory/item["live"]) as im: live=im.convert("RGB")
    reference=Image.new("RGB",live.size,"#fff8e9")
    fitted=ImageOps.contain(source,live.size,Image.Resampling.LANCZOS)
    reference.paste(fitted,((live.width-fitted.width)//2,0))
    reference.save(directory/(prefix+"-reference.png"))
    Image.blend(reference,live,.5).save(directory/(prefix+"-overlay50.png"))
    cases.append({"label":item["engine"]+" / "+str(item["width"])+"px","reference":prefix+"-reference.png","live":item["live"],"overlay":prefix+"-overlay50.png"})

verdict="READY_FOR_MANUAL_VISUAL_REVIEW" if capture["engineeringVerdict"]=="PASS" else "FAIL"
review={"visualVerdict":verdict,"copyAuthority":"DOM Traditional Chinese","referenceRole":"composition/style only","note":"Do not use pixel equality against AI-rendered glyphs as a pass/fail gate.","cases":cases}
(directory/"review.json").write_text(json.dumps(review,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"visual":verdict,"cases":len(cases)}))
raise SystemExit(0 if verdict!="FAIL" else 1)
