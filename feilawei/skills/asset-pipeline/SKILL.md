# Skill: Asset Pipeline

## Goal
確保所有正式素材高清、可追溯、不走樣。

## Asset classes
1. Mascot / character
2. brand mark
3. handwritten title / LET'S GO
4. decorative blobs / stars / route
5. icons
6. destination imagery

## Raster requirements
- transparent PNG/WebP
- hero artwork >= 2x rendered width; ideally 3x for Retina
- never upscale tiny source assets
- visually inspect after compression

## Vector requirements
- SVG viewBox correct
- no unexpected font dependencies
- strokes preserved
- no embedded raster unless intentional

## Naming
screen01_mascot_v01.png
screen01_title_v01.svg
shared_star_yellow_v01.svg

## Validation
- dimensions
- alpha edges
- color match
- no corruption
- no unintended crop
