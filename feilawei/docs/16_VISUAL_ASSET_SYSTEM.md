# Visual Asset System — Golden Master → Production

## Purpose
避免再用低清 AI mockup 直接做 production，同時保留 Golden Master 已確認的構圖與風格。

## Source-of-truth order
1. Confirmed copy / real Traditional Chinese
2. Approved Golden Master composition
3. Approved character artwork
4. Production vector / HTML implementation

## Asset classes

### A. Real copy
Use:
- HTML DOM text for body / labels / CTA / helper copy
- lang=zh-HK
- copy must match locked copy file

Never:
- AI-generated raster Chinese as production copy

### B. Hero display typography
Use:
- vector SVG outlines generated from real Traditional Chinese glyphs
- visually tune scale / rotation / spacing to follow Golden Master
- retain real DOM text in accessibility layer

Reason:
- sharp on Retina
- platform-independent
- no malformed AI glyphs
- closer to Golden Master than generic system font

### C. Mascot
Use:
- approved high-resolution character sheet / approved transparent source only
- crop / position without redrawing

Never:
- regenerate mascot
- recolour
- change anatomy

### D. Icons / decorative shapes
Use:
- SVG / CSS
- measured against Golden Master
- no raster upscale

### E. Photos
Use high-resolution real destination imagery only when a screen requires photography.

## Screen 1 production assets
- screen01_brand.svg — real Traditional Chinese vector
- screen01_title.svg — real Traditional Chinese vector
- step icons — inline SVG
- decorative blobs / route — CSS/SVG
- mascot — approved character sheet
- all helper copy / CTA / slogan — real DOM text

## QA
Every screen must pass:
1. Text integrity
2. Asset sharpness
3. Visual alignment
4. Browser/device geometry
5. User UAT

Pixel equality against AI glyphs is not a valid text QA method.
