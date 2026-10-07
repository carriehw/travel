# Checkpoint — 2026-10-07 — v20 Screen 1 Foundation

## Environment decision
- GitHub Pages = staging/UAT
- Vercel = final production release only

## Branch
`chatgpt/feilawei-v20-golden-master`

## Completed
- v20 production docs and role matrix
- Screen 1 coordinate spec
- Screen 1 UX + motion spec
- Product state model
- Copy lock
- Deployment strategy
- 390×824 fixed-artboard architecture
- semantic CTA hotspot
- no viewport-height stretching in v20 Screen 1
- screen-reader text for image-led artwork

## Current blocker / active work
The approved visual source exists as a raster Golden Master. The old repo asset is too low resolution and has the wrong crop/aspect for final use.

Asset Production is preparing a higher-fidelity Screen 1 visual asset from the canonical approved reference. Until that asset is integrated, v20 must **not** be promoted to `gh-pages`.

## QA rule
Do not ask user to test this checkpoint yet.

Next internal gate:
1. exact Screen 1 visual asset integrated
2. local visual comparison completed
3. no stretch/crop
4. then deploy to GitHub Pages for user UAT
