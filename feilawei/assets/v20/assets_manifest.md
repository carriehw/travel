# Screen 1 Production Asset Contract — v20.3

## Status
**READY FOR AUTOMATED BROWSER QA**

## Strategy
Screen 1 now uses the approved **Canonical Artboard + Semantic Hotspot** method.

This replaces the earlier 11-layer production requirement.

### Why the strategy changed
The user explicitly locked:
- Golden Master = 100% final design
- one canonical mobile composition
- proportional scaling on other phones
- cost/time-effective delivery

Splitting an already-final screen into eleven independently recreated assets added cost and introduced design drift without improving the product.

## Reference
`assets/reference/home_master_complete_footer.png`

- 345×712
- SHA-256: `63dd1cbfd7e31f81adeeec802c02ba226282f5c6ea4e3ac00413dc2cf2d80624`
- exact crop from approved six-screen master: `(7,38,352,750)`
- extends the historical crop downward by 15 source pixels only to include the complete locked slogan
- no redraw
- no resampling

## Production artboard
`assets/v20/screen01_golden@2x.webp`

- 780×1610
- lossless WebP
- standard Lanczos resample only
- SHA-256: `591b47506a968c12516d141f3875b569873d03a7a89a65d6a594f24a3fea7fc9`
- no AI generation / upscaling
- no recolouring
- no relayout

## Interaction
Only the CTA is interactive on Screen 1.
Its semantic HTML button is an invisible hotspot aligned to the locked Golden Master.

## QA
Required:
1. provenance/hash validation
2. asset pixel-fidelity check
3. Chromium + WebKit geometry
4. CTA/keyboard/reduced-motion checks
5. Reference / Live / 50% Overlay
6. GitHub Pages real-device UAT

Do not optimize/compress the production artboard further until Screen 1 is visually signed off.
