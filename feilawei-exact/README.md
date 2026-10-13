# 飛啦喂！Exact-Image Production v21

This directory is the production continuation baseline approved on 2026-10-13.

## Non-negotiable renderer rule
- Approved full-screen artwork is the only visible UI.
- No visible HTML/CSS text, cards, icons, illustrations, borders, shadows, stickers or decoration may be layered over approved artwork.
- Code may provide only invisible hotspots, navigation/state, deterministic matching logic, analytics and native share actions.
- Existing approved artwork must not be redrawn.
- Artwork must be shown with aspect-ratio preservation and no cropping/stretch distortion.

## Current gate
Existing v2 states: Home / Mode / Q1 / Blind Box / Result.
Next production state: **Q2 — trip length**.

Do not deploy this branch until the required exact PNG assets are committed and mobile QA passes.
