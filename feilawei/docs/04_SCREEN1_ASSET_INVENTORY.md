# Screen 1 Asset Inventory — v20

## Canonical visual reference
- Source: `home_master_clean.png`
- Dimensions: 345 × 697 px
- Use: visual reference only, NOT final full-screen UI asset.
- Reason: resolution is insufficient for Retina if stretched to full viewport.

## Canonical character reference
- Source: `小天線隊長旅行角色設定圖.png`
- Dimensions: 1122 × 1402 px
- Use: highest-resolution source currently available for character identity, proportions, colours and approved poses.

### Character rules confirmed from the sheet
- 2 hands
- 2 feet
- 2 antennae
- mint-green body
- blue backpack
- friendly rounded proportion
- no AI halftone / dot-grid texture

## Existing transparent mascot candidates
### mascot_main_transparent.png
- 324 × 330 px
- RGBA
- Better than current repo mascot, still marginal for a large Retina hero.

### mascot_crop.png
- 360 × 380 px
- RGBA
- Slightly higher resolution.
- Must visually compare with the exact approved home pose before use.

## Current repo mascot problem
- Live repo `mascot.png` is only 112 × 114 px.
- This is unsuitable for a hero rendered around ~200 CSS px on 2x/3x iPhones.
- It must not be used in v20 production.

## Asset strategy for Screen 1
1. Use `home_master_clean.png` as reference only.
2. Extract / reproduce exact approved mascot pose from the high-resolution character sheet without redesign.
3. Preserve unique hand-drawn title / LET'S GO treatment as artwork where browser fonts cannot match.
4. Rebuild generic text as HTML only where it visually matches.
5. Decorative blobs / stars / route can be SVG/CSS only after their silhouette and position are measured from reference.
6. All raster hero assets: target >= 2× rendered width; 3× preferred.

## Required production assets
- [ ] screen01_mascot_hero@3x.png
- [ ] screen01_brandmark.svg or high-res transparent PNG
- [ ] screen01_title.svg or high-res transparent PNG
- [ ] screen01_letsgo.svg or high-res transparent PNG
- [ ] screen01_icon_condition.svg
- [ ] screen01_icon_blindbox.svg
- [ ] screen01_icon_reveal.svg
- [ ] shared decorative blobs / stars
- [ ] screen01 route line / plane icon
- [ ] CTA styling spec

## Measurement target
Base artboard for engineering: 390px wide.
All key element positions must be recorded in artboard coordinates before implementation.
