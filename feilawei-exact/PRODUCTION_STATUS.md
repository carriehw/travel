# 飛啦喂！Exact-Image Production v21 — Status

Updated: 2026-10-15

## Locked visual authority
The confirmed V13 visual-master screens are the source:
- Home
- Question 1
- Blind Box
- Open Box
- Analysis
- Result
- Share Card

No screen may be redesigned from scratch.

## Completed in the v21 production pass
- Recovered the confirmed 7 visual-master PNGs.
- Q1 remains byte-for-byte the confirmed Question master.
- Q2–Q8 were produced as derivatives of Q1:
  - same header and brand treatment
  - same progress language
  - same hero question panel
  - same card geometry/materials
  - same palette
  - only question copy, progress and option content change
- Full Match flow implemented: Home → Q1–Q8 → Blind Box → Open Box → Analysis → Result → Share.
- Fate flow implemented: Home → Q1–Q4 → Open Box → Analysis → Result.
- Invisible-hotspot runtime only; no visible HTML/CSS UI overlays.
- Seven box-name Open Box / Analysis derivatives prepared.
- Self-contained standalone HTML prepared to eliminate missing-asset/broken-path failures.
- Chromium functional smoke test passed through the entire Full Match path.

## Current limitation
The confirmed Result artwork is still the Taipei demonstration result.
Dynamic destination-specific Result artwork remains a separate production asset task.

## Runtime rule
Do not replace the approved artwork with generic app UI.
Do not redraw characters.
Do not add visible overlays over approved screens.
