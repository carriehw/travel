"""Validate supplied artwork without manufacturing or changing any source image."""
import argparse
import hashlib
import json
import math
from pathlib import Path
import xml.etree.ElementTree as ET

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = {
    "decorations", "brand", "title", "mascot", "letsgo", "route",
    "condition", "blindbox", "reveal", "cta", "slogan",
}


def validate():
    manifest = json.loads((ROOT / "assets/v20/screen01_manifest.json").read_text())
    issues = []
    assets = []

    def fail(code, detail):
        issues.append({"severity": "Major", "code": code, "detail": detail})

    def local_file(value):
        if not isinstance(value, str):
            return None
        path = (ROOT / value).resolve()
        return path if path.is_relative_to(ROOT) and path.is_file() else None

    def check_hash(path, expected, label):
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        if actual != expected:
            fail("HASH_NOT_LOCKED", label + ": record verified source SHA-256")
        return actual

    reference = manifest["reference"]
    path = local_file(reference["path"])
    source_review = {"verified": False, "records": []}
    if path is None:
        fail("CANONICAL_REFERENCE_MISSING", reference["path"])
    else:
        try:
            with Image.open(path) as image:
                image.load()
                if image.size != (345, 697):
                    fail("REFERENCE_DIMENSIONS", str(image.size))
            check_hash(path, reference.get("sha256"), "Golden Master")
        except Exception as error:
            fail("REFERENCE_CORRUPT", str(error))

        provenance = local_file(reference.get("provenance"))
        if provenance is None:
            fail("REFERENCE_PROVENANCE_MISSING", "Record the approved original and exact crop")
        else:
            before = len(issues)
            try:
                records = json.loads(provenance.read_text())["assets"]
                sources = {}
                for record in records:
                    original = local_file(record["path"])
                    if original is None:
                        raise ValueError("Missing source: " + record["path"])
                    check_hash(original, record["sha256"], record["id"])
                    with Image.open(original) as image:
                        image.load()
                        if image.size != (record["width"], record["height"]):
                            raise ValueError("Source dimensions changed: " + record["id"])
                    sources[record["id"]] = (record, original)
                    source_review["records"].append({
                        "id": record["id"], "path": record["path"],
                        "sha256": record["sha256"],
                        "pixels": [record["width"], record["height"]],
                    })
                home, restored = sources["home_master_clean"]
                _, master = sources[home["derivedFrom"]]
                if restored != path:
                    raise ValueError("Canonical source record points to a different file")
                with Image.open(master) as original, Image.open(path) as restored_image:
                    crop = original.crop(tuple(home["crop"])).convert("RGB")
                    if crop.size != restored_image.size or crop.tobytes() != restored_image.convert("RGB").tobytes():
                        raise ValueError("Restored reference differs from the recorded original crop")
                source_review["verified"] = len(issues) == before
                source_review["cropPixelsIdentical"] = True
            except Exception as error:
                fail("REFERENCE_PROVENANCE_INVALID", str(error))

    if manifest.get("schemaVersion") != 1 or any(
        manifest["design"].get(key) != value
        for key, value in {"width": 390, "height": 788.4, "maxWidth": 430}.items()
    ):
        fail("DESIGN_SPEC_CHANGED", "Use the locked 390 x 788.4 coordinate system")
    if manifest["approval"].get("assetsReady") is not True:
        fail("ASSETS_NOT_SIGNED_OFF", "Asset integration has not passed source review")
    layers = manifest["layers"]
    ids = [layer["id"] for layer in layers]
    if len(set(ids)) != len(ids) or set(ids) != REQUIRED:
        fail("INCOMPLETE_LAYER_SET", "All eleven measured artwork zones are required")

    for layer in layers:
        label = layer["id"]
        box = layer.get("box", [])
        if len(box) != 4 or not all(
            isinstance(value, (int, float)) and math.isfinite(value) for value in box
        ):
            fail("INVALID_BOX", label)
            continue
        x, y, width, height = box
        if min(x, y) < 0 or min(width, height) <= 0 or x + width > 390.1 or y + height > 788.5:
            fail("BOX_OUTSIDE_ARTBOARD", label)
        path = local_file(layer.get("file"))
        if path is None:
            fail("PRODUCTION_LAYER_MISSING", label)
            continue
        if layer["kind"] == "raster" and width >= 390 * .8 and height >= 788.4 * .8:
            fail("FULL_PAGE_RASTER", label)
        check_hash(path, layer.get("sha256"), label)
        if not layer.get("source"):
            fail("SOURCE_PROVENANCE_MISSING", label)
        try:
            if layer["kind"] == "vector":
                if path.suffix.lower() != ".svg":
                    raise ValueError("Vector layers must be SVG")
                tree = ET.parse(path).getroot()
                viewbox = [float(n) for n in tree.attrib.get("viewBox", "").replace(",", " ").split()]
                if len(viewbox) != 4 or viewbox[2] <= 0 or viewbox[3] <= 0:
                    raise ValueError("SVG needs a valid viewBox")
                if abs(viewbox[2] / viewbox[3] * height - width) > 1:
                    fail("ASPECT_MISMATCH", label)
                tags = {element.tag.rsplit("}", 1)[-1] for element in tree.iter()}
                if tags & {"text", "foreignObject", "image", "script"}:
                    fail("SVG_DEPENDENCY", label + ": use outlined, self-contained artwork")
                assets.append({"id": label, "kind": "vector", "viewBox": viewbox})
            elif layer["kind"] == "raster":
                with Image.open(path) as image:
                    image.load()
                    pixels = image.size
                    scale = 430 / 390
                    required = (math.ceil(width * scale * 2), math.ceil(height * scale * 2))
                    preferred = (math.ceil(width * scale * 3), math.ceil(height * scale * 3))
                    if pixels[0] < required[0] or pixels[1] < required[1]:
                        fail("INSUFFICIENT_RETINA_RESOLUTION", label + ": need " + str(required))
                    if abs(pixels[0] / pixels[1] * height - width) > 1:
                        fail("ASPECT_MISMATCH", label)
                    if "A" not in image.getbands() or image.getchannel("A").getextrema()[0] == 255:
                        fail("TRANSPARENCY_MISSING", label)
                    assets.append({
                        "id": label, "kind": "raster", "pixels": pixels,
                        "minimum2x": required, "preferred3x": preferred,
                    })
            else:
                fail("INVALID_LAYER_KIND", label)
        except Exception as error:
            fail("ASSET_CORRUPT", label + ": " + str(error))

    return {
        "status": "FAIL" if issues else "READY_FOR_VISUAL_QA",
        "note": "Asset integrity is not visual sign-off.",
        "referenceSources": source_review,
        "issues": issues, "assets": assets,
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
