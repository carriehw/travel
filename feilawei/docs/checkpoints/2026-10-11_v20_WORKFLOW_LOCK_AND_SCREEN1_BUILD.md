# Checkpoint — 2026-10-11 — Workflow Lock + Screen 1 Production Build

## User directive
Avoid repeating previous work. Progress must be clear, incremental and irreversible unless a measured QA failure requires reopening a decision.

## Key workflow correction
The prior 11-layer Screen 1 plan was technically rigorous but not cost/time effective for a 100% locked Golden Master.

New locked implementation:
**Canonical Golden Master artboard + semantic interaction hotspots.**

This eliminates engineer reinterpretation of the design.

## Screen 1 completed in this checkpoint
- recovered approved complete footer directly from original six-screen master
- exact new reference crop: (7,38,352,750)
- committed 345×712 verified reference
- created lossless 780×1610 production WebP
- no AI redraw/upscale
- switched manifest to schema v2 canonical-artboard
- updated artboard height to 804.87
- CTA hotspot now comes from manifest geometry
- production art hash verification retained
- old 11-layer loading removed from runtime
- asset QA updated for pixel fidelity
- browser QA updated for real production artboard
- automated Reference / Live / Overlay comparison updated
- GitHub Actions workflow added

## Local asset fidelity result
Production artboard resized back to canonical source:
- MAE ≈ 1.29
- PSNR ≈ 38.55 dB

This passes the new asset-level threshold (MAE <= 2; PSNR >= 37).

## Current gate
GitHub Actions browser QA is the next gate.

No Screen 2 implementation.
No gh-pages promotion until automated QA passes.
No Vercel deployment.


## Automated QA result — PASS

GitHub Actions run:
`38128410822`

Results:
- provenance/hash validation: PASS
- asset pixel fidelity: PASS
  - MAE 1.2926
  - PSNR 38.551 dB
- browser engineering QA: PASS
- 8 browser/width cases: PASS
  - Chromium: 375 / 390 / 393 / 430
  - WebKit: 375 / 390 / 393 / 430
- Reference / Live / Overlay automated verdict: PASS_AUTOMATED
- no engineering failures

Browser visual metrics:
- Chromium 375: MAE 2.6649 / PSNR 32.500
- Chromium 390: MAE 0.9205 / PSNR 42.084
- Chromium 393: MAE 0.7731 / PSNR 43.620
- Chromium 430: MAE 0.7603 / PSNR 43.840
- WebKit 375: MAE 2.6649 / PSNR 32.500
- WebKit 390: MAE 0.9205 / PSNR 42.084
- WebKit 393: MAE 0.7731 / PSNR 43.620
- WebKit 430: MAE 1.6296 / PSNR 34.555

## Staging deployment — PASS

gh-pages commit:
`f5a5fc9a4cadc1895a99e8db0adec1a6b58f6ae4`

GitHub Pages deployment run:
`38128615980`

Deployment conclusion:
**success**

Staging:
https://carriehw.github.io/travel/

## Current gate
Await real-device / user UAT for Screen 1.

Do not start Screen 2 until user sign-off.
