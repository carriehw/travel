# Screen 1 Coordinate Spec — v20

Reference: `home_master_clean.png` (345 × 697)
Engineering base artboard: **390 × 788.4**
Scale factor from reference to base artboard: **1.1304348**

> Purpose: stop freehand approximation. Screen 1 must be implemented from measured coordinates.

## Major visual zones

| Element | Reference bbox (x1,y1,x2,y2) | 390px artboard bbox | Normalized x/y/w/h |
|---|---:|---:|---:|
| Brand + planet + subtitle | 113,6,268,70 | 127.7,6.8,303.0,79.1 | 32.8%,0.9%,44.9%,9.2% |
| Main title | 48,76,325,255 | 54.3,85.9,367.4,288.3 | 13.9%,10.9%,80.3%,25.7% |
| Mascot hero | 62,255,246,451 | 70.1,288.3,278.1,509.8 | 18.0%,36.6%,53.3%,28.1% |
| LET'S GO artwork | 263,244,333,333 | 297.3,275.8,376.4,376.4 | 76.2%,35.0%,20.3%,12.8% |
| Route + plane zone | 203,331,339,480 | 229.5,374.2,383.2,542.6 | 58.8%,47.5%,39.4%,21.4% |
| Step: 揀條件 | 14,431,108,552 | 15.8,487.2,122.1,624.0 | 4.1%,61.8%,27.2%,17.4% |
| Step: 揀盲盒 | 128,452,232,560 | 144.7,511.0,262.3,633.0 | 37.1%,64.8%,30.1%,15.5% |
| Step: 揭曉下一站 | 244,405,342,548 | 275.8,457.8,386.6,619.5 | 70.7%,58.1%,28.4%,20.5% |
| CTA | 30,576,325,650 | 33.9,651.1,367.4,734.8 | 8.7%,82.6%,85.5%,10.6% |
| Slogan | 72,652,321,697 | 81.4,737.0,362.9,787.9 | 20.9%,93.5%,72.2%,6.5% |

## Responsive rule
- Layout coordinate system remains 390px wide.
- Scale the **entire artboard proportionally** to viewport width.
- Do not independently reflow mascot / title / CTA / decorative art.
- Apply safe-area outside the artboard, not by moving internal artwork.
- If viewport width > 430px, center artboard instead of enlarging beyond approved mobile scale.
- Do not use viewport height to stretch content.

## Interaction layer
Only these areas need semantic overlay on Screen 1:
- CTA: 開始飛啦 → travelType
- Optional accessibility text for brand/title/steps
- Decorative artwork must use pointer-events:none

## QA target
For a 390px viewport:
- major object displacement <= 4px
- CTA bbox within <= 3px
- no vertical stretch
- no crop introduced by browser toolbars
- bottom slogan remains visible by scroll if viewport height is shorter than artboard height
