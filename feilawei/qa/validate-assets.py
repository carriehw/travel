"""Validate the locked Screen 1 Golden Master artboard and its provenance."""
import argparse
import hashlib
import json
import math
from pathlib import Path

from PIL import Image, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_DESIGN = {"width": 390, "height": 804.87, "maxWidth": 430}


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def local_file(value):
    if not isinstance(value, str):
        return None
    path = (ROOT / value).resolve()
    return path if path.is_relative_to(ROOT) and path.is_file() else None


def validate():
    manifest = json.loads((ROOT / "assets/v20/screen01_manifest.json").read_text())
    issues = []
    evidence = {}

    def fail(code, detail):
        issues.append({"severity": "Major", "code": code, "detail": detail})

    if manifest.get("schemaVersion") != 2:
        fail("MANIFEST_SCHEMA", "Expected schemaVersion 2")
    for key, value in EXPECTED_DESIGN.items():
        if manifest.get("design", {}).get(key) != value:
            fail("DESIGN_SPEC_CHANGED", f"{key}: expected {value}")

    reference = manifest.get("reference", {})
    reference_path = local_file(reference.get("path"))
    if reference_path is None:
        fail("CANONICAL_REFERENCE_MISSING", str(reference.get("path")))
    else:
        with Image.open(reference_path) as image:
            image.load()
            if image.size != (reference.get("width"), reference.get("height")):
                fail("REFERENCE_DIMENSIONS", str(image.size))
        actual = sha256(reference_path)
        if actual != reference.get("sha256"):
            fail("REFERENCE_HASH", actual)

    provenance_path = local_file(reference.get("provenance"))
    if provenance_path is None:
        fail("PROVENANCE_MISSING", str(reference.get("provenance")))
    elif reference_path:
        try:
            provenance = json.loads(provenance_path.read_text())
            records = {item["id"]: item for item in provenance["assets"]}
            complete = records["home_master_complete_footer"]
            master = records["six_screen_master"]
            complete_path = local_file(complete["path"])
            master_path = local_file(master["path"])
            if complete_path != reference_path:
                raise ValueError("Manifest reference differs from provenance record")
            for record, path in [(complete, complete_path), (master, master_path)]:
                if path is None or sha256(path) != record["sha256"]:
                    raise ValueError("Source hash mismatch: " + record["id"])
                with Image.open(path) as image:
                    image.load()
                    if image.size != (record["width"], record["height"]):
                        raise ValueError("Source dimensions changed: " + record["id"])
            with Image.open(master_path) as source, Image.open(complete_path) as restored:
                crop = source.crop(tuple(complete["crop"])).convert("RGB")
                restored_rgb = restored.convert("RGB")
                if crop.size != restored_rgb.size or crop.tobytes() != restored_rgb.tobytes():
                    raise ValueError("Complete-footer reference is not pixel-identical to master crop")
            evidence["provenanceVerified"] = True
        except Exception as error:
            fail("PROVENANCE_INVALID", str(error))

    if manifest.get("approval", {}).get("assetsReady") is not True:
        fail("ASSET_NOT_APPROVED", "assetsReady must be true")
    if manifest.get("approval", {}).get("strategy") != "canonical-artboard":
        fail("WRONG_STRATEGY", "Screen 1 must use the locked canonical artboard strategy")

    art = manifest.get("artboard", {})
    art_path = local_file(art.get("file"))
    if art_path is None:
        fail("PRODUCTION_ART_MISSING", str(art.get("file")))
    else:
        actual = sha256(art_path)
        if actual != art.get("sha256"):
            fail("PRODUCTION_ART_HASH", actual)
        try:
            with Image.open(art_path) as image:
                image.load()
                if image.size != (art.get("width"), art.get("height")):
                    fail("PRODUCTION_ART_DIMENSIONS", str(image.size))
                production = image.convert("RGB")
            if reference_path:
                with Image.open(reference_path) as image:
                    canonical = image.convert("RGB")
                back = production.resize(canonical.size, Image.Resampling.LANCZOS)
                diff = ImageChops.difference(canonical, back)
                stats = ImageStat.Stat(diff)
                mae = sum(stats.mean) / len(stats.mean)
                mse = sum(value * value for value in stats.rms) / len(stats.rms)
                psnr = float("inf") if mse == 0 else 10 * math.log10((255 * 255) / mse)
                evidence["pixelFidelity"] = {
                    "mae": round(mae, 4),
                    "psnr": round(psnr, 3),
                    "canonicalPixels": list(canonical.size),
                    "productionPixels": list(production.size),
                }
                if mae > 2.0 or psnr < 37:
                    fail("PIXEL_FIDELITY", f"MAE={mae:.3f}, PSNR={psnr:.2f}")
        except Exception as error:
            fail("PRODUCTION_ART_CORRUPT", str(error))

    hotspots = manifest.get("hotspots", [])
    start = next((item for item in hotspots if item.get("id") == "start"), None)
    if not start:
        fail("START_HOTSPOT_MISSING", "start")
    else:
        box = start.get("box")
        if not isinstance(box, list) or len(box) != 4 or not all(isinstance(v, (int, float)) and math.isfinite(v) for v in box):
            fail("START_HOTSPOT_INVALID", str(box))
        else:
            x, y, width, height = box
            if min(x, y) < 0 or min(width, height) <= 0 or x + width > 390.1 or y + height > 804.97:
                fail("START_HOTSPOT_OUTSIDE", str(box))
            evidence["startHotspot"] = box

    return {
        "status": "FAIL" if issues else "READY_FOR_BROWSER_QA",
        "strategy": "canonical-artboard",
        "note": "Asset integrity + pixel fidelity only. Browser geometry and real-device UAT remain separate gates.",
        "issues": issues,
        "evidence": evidence,
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    result = validate()
    body = json.dumps(result, ensure_ascii=False, indent=2) + "\n"
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(body)
    print(body, end="")
    raise SystemExit(1 if result["status"] == "FAIL" else 0)
