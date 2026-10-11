# Checkpoint — 2026-10-11 — Screen 1 v20.4 Staging UAT

## What changed
- removed low-resolution full-screen raster production renderer
- all important Chinese copy is real zh-HK text
- hero title + brand use crisp vector assets generated from real Traditional Chinese glyphs
- step icons use SVG
- major decorative blobs / globe / flower / border traced into vector from Golden Master
- mascot still uses approved character artwork
- fixed proportional mobile composition retained

## Internal QA
Latest successful development QA:
- GitHub Actions run: 38137008094
- Chromium 375 / 390 / 393 / 430: PASS
- WebKit 375 / 390 / 393 / 430: PASS
- text integrity: PASS
- CTA interaction: PASS
- no full-screen low-res raster renderer: PASS

Manual visual gate:
PASS WITH MINOR.
Remaining differences are small hand-drawn-style nuances / tiny decorative details.

## Staging deploy
- gh-pages commit: 845ca1413135aab4a712cca79f991d23268d2bf4
- GitHub Pages run: 38137321297
- deployment: SUCCESS
- URL: https://carriehw.github.io/travel/

## Current gate
User real-device UAT.

Ask user to judge only:
1. sharpness
2. Traditional Chinese correctness
3. overall Golden Master visual fidelity
4. CTA press behaviour

Do not begin Screen 2 until Screen 1 is signed off.
