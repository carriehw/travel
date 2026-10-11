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
- [ ] User real-device UAT
- [ ] Screen 1 final PASS

### Screen 2+
**BLOCKED until Screen 1 PASS.**
No implementation should begin.

## Current task
Wait for / inspect automated Screen 1 GitHub Actions QA.

If FAIL:
- fix only the measured failure
- do not redesign
- rerun

If PASS:
- promote Screen 1 to GitHub Pages
- ask user to test on phone
- only after user pass, start the next screen

## Rule for every future update
Each session should:
1. read this file;
2. continue from Current task;
3. update checkboxes;
4. create a checkpoint only when a real milestone changes;
5. never repeat completed work unless a QA failure requires it.
