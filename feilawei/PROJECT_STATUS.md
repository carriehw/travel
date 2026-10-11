# 飛啦喂！ — Project Status / Single Source of Truth

Last updated: 2026-10-11
Branch: `chatgpt/feilawei-v20-golden-master`

## Product goal — LOCKED
用一個似遊戲嘅形式，令一班人一齊揀下一個旅行目的地，增加趣味性、參與感同驚喜感，同時最後結果真係有旅行決策作用。

## Decisions that must NOT be reopened

| Decision | Status |
|---|---|
| Golden Master is 100% design authority | LOCKED |
| Canonical-size pixel fidelity first | LOCKED |
| Other phone widths scale proportionally | LOCKED |
| Core gameplay = Privilege Cards + Mystery Elimination + 小天線隊長 Game Master | LOCKED |
| Existing 12 Blind Boxes remain | LOCKED |
| Final 3 destinations map to 12 boxes before tap | LOCKED |
| Phase 1 = single-device Party Mode | LOCKED |
| Room Code multiplayer = Phase 2 | LOCKED |
| GitHub Pages = staging/UAT | LOCKED |
| Vercel = final production only | LOCKED |
| Existing Golden Master screens use canonical artboard + hotspots | LOCKED |
| New gameplay screens must be designed/approved before coding | LOCKED |

## Progress

### Foundation
- [x] Anti-rework decision log added
- [x] Pure gameplay engine added (separate from UI)
- [x] Core engine smoke tests PASS: ranking / 6→4 elimination / 12-box mapping / grounded reasons

- [x] Product purpose clarified
- [x] Core game loop locked
- [x] Screen flow mapped
- [x] Deployment strategy locked
- [x] UX/state model documented
- [x] QA workflow created
- [x] Project-local skills created

### Screen 1 — Home
- [x] Approved six-screen master recovered
- [x] Exact Screen 1 crop provenance verified
- [x] Historical footer clipping fixed by extending crop from y=735 → y=750 only
- [x] Complete-footer reference committed
- [x] Canonical artboard strategy locked
- [x] Lossless production WebP committed
- [x] CTA hotspot implemented
- [x] Hash verification implemented
- [x] QA scripts updated
- [x] GitHub Actions QA workflow created
- [x] Automated browser QA PASS
- [x] GitHub Pages staging deploy
- [x] User real-device UAT attempted
- [ ] **UAT FAIL — artwork visibly blurry on real device**
- [ ] High-resolution production artboard replacement
- [ ] Sharpness/native-resolution QA
- [ ] Screen 1 final PASS

### Screen 2+
**BLOCKED until Screen 1 PASS.**
No implementation should begin.

## Current task
**Fix Screen 1 asset sharpness only — do not redesign or rebuild layout.**

Real-device UAT on 2026-10-11 exposed a Major issue:
- visual composition matches the locked Golden Master;
- production artwork is visibly blurry because the canonical reference is only 345×712 and the current 780×1610 WebP was created by Lanczos enlargement from that low-resolution raster;
- automated overlay/pixel-similarity QA passed because it measured fidelity to the same low-resolution source, not native display sharpness.

### Root-cause classification
**Asset-resolution QA gap**, not layout/architecture failure.

### Corrective action
1. keep the canonical-artboard + semantic-hotspot architecture;
2. keep all approved coordinates and copy locked;
3. replace only the visual artboard with a genuinely high-resolution reconstruction/export;
4. use exact approved artwork/character identity — no redesign;
5. add a native-resolution/sharpness gate before browser QA;
6. redeploy Screen 1 to GitHub Pages;
7. ask user to re-UAT only after internal sharpness QA passes.

Screen 2 remains blocked.

## Rule for every future update
Each session should:
1. read this file;
2. continue from Current task;
3. update checkboxes;
4. create a checkpoint only when a real milestone changes;
5. never repeat completed work unless a QA failure requires it.
