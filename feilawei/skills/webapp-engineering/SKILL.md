# Skill: Web App Engineering for Illustrated Mobile UI

## Goal
將固定插畫式 Golden Master 精準變成 responsive mobile web experience。

## Engineering approach
- Base artboard: 390px wide.
- Use scale/contain strategy for the design coordinate system.
- Use CSS variables for design tokens.
- Use safe-area env() for iOS.
- Use high-resolution assets (2x/3x where raster).
- Prefer SVG for line art / logo / handwritten marks where possible.
- Interactive elements are semantic HTML overlays aligned to reference coordinates.
- Avoid independent responsive reflow for artwork-heavy screens.

## Forbidden
- object-fit: fill
- low-res hero assets
- full-page screenshot as final UI
- unreviewed browser font substitution
- viewport-height hacks that crop browser content

## Pre-merge checks
- no broken assets
- no duplicate IDs
- no JS syntax errors
- no horizontal overflow
- touch targets work
- localStorage states valid
- cache-busting version updated
