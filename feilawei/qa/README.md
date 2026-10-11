# Screen 1 Automated QA — v20.3

Screen 1 uses the locked **Canonical Artboard + Semantic Hotspot** strategy.

## Commands

```sh
npm --prefix feilawei/qa ci
npx --prefix feilawei/qa playwright install chromium webkit
python3 feilawei/qa/validate-assets.py --output feilawei/docs/qa/latest/asset-validation.json
node feilawei/qa/capture-screen1.cjs feilawei/docs/qa/latest
python3 feilawei/qa/build-review.py feilawei/docs/qa/latest
```

GitHub Actions runs the same pipeline automatically.

## Gates

### Asset gate
Checks:
- exact source provenance
- complete-footer crop is pixel-identical to approved six-screen master
- production hash/dimensions
- asset-level pixel fidelity

Threshold:
- MAE <= 2
- PSNR >= 37 dB

### Browser gate
Chromium + WebKit:
- 375 / 390 / 393 / 430 widths
- proportional 390×804.87 artboard
- correct CTA hotspot
- no horizontal overflow
- short viewport scrolling
- keyboard/touch
- duplicate activation guard
- reduced motion
- artwork hash rejection
- 430px cap / safe-area independence

### Visual gate
Reference / Live / 50% Overlay.

Automated tolerance:
- MAE <= 4
- PSNR >= 30 dB

### Final gate
Real iPhone Safari + ChatGPT in-app browser + user UAT.

Automated browser PASS does not replace real-device UAT.

## Important
Do not restore the old 11-layer QA fixtures. That workflow was superseded after the user locked canonical-size pixel fidelity and cost/time-effective delivery.
