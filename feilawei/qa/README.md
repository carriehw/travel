# Screen 1 internal QA

These tools validate engineering separately from visual approval. A passing
engineering run cannot unlock Screen 2 or publish staging.

## Setup

Python 3 with Pillow 11+; Node 20+; Playwright 1.57.0.

```sh
npm --prefix feilawei/qa ci
npx --prefix feilawei/qa playwright install chromium webkit
```

On a configured host, run from the repository root:

```sh
python3 feilawei/qa/validate-assets.py --output feilawei/docs/qa/latest/asset-validation.json
node feilawei/qa/capture-screen1.cjs feilawei/docs/qa/latest
python3 feilawei/qa/build-review.py feilawei/docs/qa/latest
```

Asset validation and visual review exit 1 while blocked. This is an intentional
FAIL, not a tooling error. Capture exits 0 only for its engineering checks across
both browser engines; its report records a separate visual verdict.

The capture tool starts its own loopback server. Optional environment variables:

- `PLAYWRIGHT_MODULE`: installed Playwright module path.
- `CHROMIUM_EXECUTABLE`: existing Chromium executable.
- `PLAYWRIGHT_BROWSERS_PATH`: directory containing installed WebKit/Chromium.

## Missing reference

The canonical input is `assets/reference/home_master_clean.png`, 345×697, with
its verified SHA-256 recorded in the manifest. If it is unavailable, a diagnostic
comparison can be generated explicitly:

```sh
python3 feilawei/qa/build-review.py feilawei/docs/qa/latest --diagnostic-source feilawei/assets/master/screen1.webp
```

The diagnostic image is proportionally contained, never stretched. Its crop
and low resolution differ from the canonical reference. The review stays FAIL
and labels the reference slot unverified. It cannot establish a 95% match.

## Evidence

- Actual artboard and viewport captures at 375 / 390 / 393 / 430.
- Actual short viewport captures after scrolling to the bottom.
- CTA geometry, proportional scaling, overflow and missing-file diagnostics.
- Separate synthetic rectangle fixtures for transport, single-tap/keyboard
  activation, reduced motion, failed-layer rollback and refresh checks.
- Reference / Live / 50% Overlay PNGs and an interactive comparison page.

Synthetic fixtures are served only by Playwright request interception. They are
not production files, never depict 小天線隊長, and never enter visual evidence.

Before sign-off, review all immutable art, colours, copy, alpha edges and Retina
sharpness against the real source. Record every Critical/Major mismatch. Require
actual iOS Safari and ChatGPT in-app UAT after internal QA passes. Do not infer
device sign-off from desktop WebKit emulation.
