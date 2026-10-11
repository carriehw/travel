# Screen 1 Text Integrity + Sharpness Correction — v20.4

## Severity
P0 / Major

## Why this outranks every other task
Real-device UAT exposed two production blockers:
1. the full-screen raster artwork is visibly blurry;
2. several Chinese strings inside the AI-generated artwork are not reliable real Traditional Chinese glyphs.

A visually faithful screenshot is not acceptable if the copy itself is malformed.

## Locked correction
Screen 1 switches from:
single low-resolution raster artboard

to:
native Traditional Chinese DOM text + vector/CSS UI + approved mascot artwork

This is a targeted rendering correction, not a visual redesign.

## Source-of-truth hierarchy
1. Confirmed copy in docs/10_COPY_LOCK.md
2. Golden Master composition / palette / visual hierarchy
3. Approved mascot character sheet
4. Engineering implementation

AI-rendered glyph shapes in the Golden Master are not copy authority.

## What stays locked
- overall composition
- cream / coral / blue / mint / yellow visual language
- brand placement
- hero title wording
- mascot identity
- 3-step explanation
- CTA wording
- slogan
- canonical mobile composition

## What changes
- all important visible copy becomes real HTML text with zh-HK language context
- icons become vector SVG / CSS
- decorative blobs become CSS shapes
- mascot is sourced from the approved high-resolution character sheet
- the low-resolution artboard is no longer the live production renderer

## New QA gates
### P0 Text integrity
- every visible Chinese string must exist as a real DOM text node
- strings must match docs/10_COPY_LOCK.md
- no AI-generated Chinese glyphs in production-visible copy

### P0 Sharpness
- hero copy / CTA / step labels must remain crisp at 430px viewport and Retina DPR
- no raster enlargement of text
- no full-screen raster text layer

### P1 Visual fidelity
- preserve approved relative positions, palette and hierarchy
- mascot identity cannot change

## Rework rule
This decision does not reopen gameplay, screen flow, or prior product decisions.
Only the Screen 1 renderer changes.
