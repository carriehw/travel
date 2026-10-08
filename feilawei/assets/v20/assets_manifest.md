# Screen 1 production asset contract — v20.1

Authority: [coordinate spec](../../docs/05_SCREEN1_COORDINATE_SPEC.md),
[asset inventory](../../docs/04_SCREEN1_ASSET_INVENTORY.md),
[visual skill](../../skills/golden-master-visual-fidelity/SKILL.md).

## Current status: BLOCKED

No production artwork has been fabricated, enlarged, traced or approved in this
checkpoint. All eleven manifest file slots are deliberately null. The homepage
does not load rejected screenshots or browser-font approximations as artwork.

The canonical `home_master_clean.png` (345×697), character sheet
`小天線隊長旅行角色設定圖.png` (1122×1402), and named transparent mascot candidates
are absent from this branch/workspace. Their file names in prior docs establish
the intended source, not possession of the source bytes.

## Measured export frames

Frames come directly from the locked 390px coordinate spec. Export transparent
artwork in the corresponding frame; do not independently reflow any zone.

| ID | x | y | width | height | Preferred format |
|---|---:|---:|---:|---:|---|
| decorations | 0 | 0 | 390 | 788.4 | SVG; measured background decoration only |
| brand | 127.7 | 6.8 | 175.3 | 72.3 | outlined SVG / transparent raster |
| title | 54.3 | 85.9 | 313.1 | 202.4 | outlined SVG / transparent raster |
| mascot | 70.1 | 288.3 | 208 | 221.5 | exact approved pose, transparent raster |
| letsgo | 297.3 | 275.8 | 79.1 | 100.6 | outlined SVG / transparent raster |
| route | 229.5 | 374.2 | 153.7 | 168.4 | exact route and plane artwork |
| condition | 15.8 | 487.2 | 106.3 | 136.8 | approved icon + lettering |
| blindbox | 144.7 | 511 | 117.6 | 122 | approved icon + lettering |
| reveal | 275.8 | 457.8 | 110.8 | 161.7 | approved icon + lettering |
| cta | 33.9 | 651.1 | 333.5 | 83.7 | approved pill, shadow and lettering |
| slogan | 81.4 | 737 | 281.5 | 50.9 | approved lettering and underline |

The route/plane and reveal frames overlap because these are the existing
measured zones. Actual alpha and stacking must be checked against the source.
No silhouette, palette or stroke can be inferred solely from these rectangles.

## Integration procedure

1. Restore the exact approved reference to `assets/reference/home_master_clean.png`.
2. Verify source dimensions and record its SHA-256.
3. Export exact artwork layers, with source provenance; never redraw the mascot.
4. Supply each `file`, `source`, `sha256` and correct `kind` in
   `screen01_manifest.json`. Paths are relative to `feilawei/`.
5. Check immutable character identity: mint body, blue backpack, two hands,
   two feet, two antennae. Compare pose, proportions and colours.
6. Record technical asset sign-off with `approval.assetsReady` only after source
   review. This is not a new creative approval and does not imply visual PASS.
7. Run source validation, browser capture and Reference / Live / 50% Overlay.

Raster minimum: 2× at the **430px maximum rendered width**, 3× preferred.
For the 208×221.5 mascot frame: minimum **459×489**; preferred **688×733**.
Use transparent padding if needed to preserve the frame aspect ratio.
SVGs must be self-contained paths with a matching viewBox; no font dependency
or raster screenshot wrapped inside an SVG.

## Source audit

| Available file | Decoding result | Production decision |
|---|---|---|
| `assets/master/screen1.webp` | 260×478 RGB, decodes | Cropped, low resolution; diagnostic only |
| `mascot.png` | Header advertises 112×114; full decode fails | Reject; corrupt and too small |
| Historical first home WebP | 256×471, decodes | Same insufficient source class |
| Historical replacement home WebPs | Full decode fails | Reject |
| `gh-pages/home-master.jpg` | Full decode fails | Reject |
| `gh-pages/six-screen-master.jpg` | Full decode fails | Reject |

The legacy master ratio 260/478 differs materially from 345/697. It cannot be
converted into the approved crop by CSS or padding. Retain it solely as
unverified diagnostic input, labelled as such in the QA review.

## Known coordinate rounding

697 × 390 / 345 = 787.913px, while the approved engineering spec explicitly
states 788.4px. Use **788.4px** consistently in engineering; the 0.487px rounding
discrepancy is below the acceptance tolerance. The real image keeps its own
aspect ratio; no artwork is stretched to absorb this difference.
