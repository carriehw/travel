# Screen 1 Coordinate Spec — v20.3

## Canonical reference
`assets/reference/home_master_complete_footer.png`

- Source: approved six-screen Golden Master
- Exact crop: `(7, 38, 352, 750)`
- Reference pixels: **345 × 712**
- No redraw / no resampling in reference
- Historical 345×697 crop remains audit-only because it clipped the confirmed slogan.

## Engineering artboard
Base width: **390px**

Proportional height:

```
712 × 390 / 345 = 804.869565...
```

Locked engineering height: **804.87px**

Maximum display width: **430px**

## Scaling
- 390px is the canonical CSS width.
- 375 / 393 / 430 scale the entire artboard proportionally.
- Never independently reflow title, mascot, icons or footer.
- Never stretch to viewport height.
- Short screens scroll vertically.
- Safe-area padding sits outside the artboard.

## Visual rendering
Screen 1 is a single canonical production artboard:
`assets/v20/screen01_golden@2x.webp`

The production file is a lossless technical 2× resample of the verified reference.
It is not a redesigned screenshot, browser recreation or AI upscale.

## Interactive geometry

### Start CTA
Measured base box:
- x = 33.9
- y = 651.1
- width = 333.5
- height = 83.7

The hotspot is positioned from the manifest, not duplicated in CSS.

## Acceptance
At supported widths:
- artwork proportions unchanged
- CTA displacement <= 4px at 390px equivalent
- no horizontal overflow
- bottom slogan reachable on short viewport
- production bytes match locked SHA-256
- browser output passes automated pixel comparison
- real-device UAT still required
