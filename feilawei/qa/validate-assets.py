"""Validate Screen 1 native-text renderer inputs and copy integrity."""
import argparse, json, hashlib, re, html as html_lib
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
REQUIRED=[
"飛啦喂！","外星旅人・地球導遊","想去邊？","抽咗先算。","揀條件","話你知想點玩",
"揀盲盒","揀你心儀嘅盒","揭曉下一站","睇吓去邊！","開始飛啦",
"You only live once","人生得一次，仲等咩？飛啦喂！"
]

def sha256(p): return hashlib.sha256(p.read_bytes()).hexdigest()

def validate():
    issues=[]; evidence={}
    html=(ROOT/"index.html").read_text(encoding="utf-8")\n    dom_text=html_lib.unescape(re.sub(r"<[^>]+>", "", html))
    css=(ROOT/"screen1.css").read_text(encoding="utf-8")
    js=(ROOT/"screen1.js").read_text(encoding="utf-8")

    def fail(code,detail): issues.append({"severity":"Major","code":code,"detail":detail})

    if 'lang="zh-HK"' not in html: fail("LANG_MISSING","html lang must be zh-HK")
    for text in REQUIRED:
        if text not in html:
            fail("COPY_MISSING",text)

    if "screen01_golden@2x.webp" in html+css+js:
        fail("LOW_RES_ARTBOARD_STILL_LIVE","full-screen raster artboard must not render in v20.4")

    if "native-text-hybrid-art" not in js or "real-zh-HK-dom" not in js:
        fail("RENDERER_STRATEGY_NOT_LOCKED","screen1.js strategy marker missing")

    mascot=ROOT/"assets/reference/小天線隊長旅行角色設定圖.png"
    if not mascot.is_file():
        fail("MASCOT_SOURCE_MISSING",str(mascot))
    else:
        with Image.open(mascot) as im:
            im.load()
            evidence["mascotSource"]={"pixels":list(im.size),"sha256":sha256(mascot)}
            if im.width < 1000 or im.height < 1200:
                fail("MASCOT_SOURCE_TOO_SMALL",str(im.size))

    evidence["requiredCopyCount"]=len(REQUIRED)
    evidence["allCopyIsDOM"]=all(text in dom_text for text in REQUIRED)
    evidence["fullScreenRasterRenderer"]=False

    return {
        "status":"READY_FOR_BROWSER_QA" if not issues else "FAIL",
        "strategy":"native-text-hybrid-art",
        "issues":issues,
        "evidence":evidence
    }

if __name__=="__main__":
    ap=argparse.ArgumentParser();ap.add_argument("--output",type=Path);args=ap.parse_args()
    result=validate();body=json.dumps(result,ensure_ascii=False,indent=2)+"\n"
    if args.output:
        args.output.parent.mkdir(parents=True,exist_ok=True);args.output.write_text(body,encoding="utf-8")
    print(body,end="");raise SystemExit(1 if result["status"]=="FAIL" else 0)
