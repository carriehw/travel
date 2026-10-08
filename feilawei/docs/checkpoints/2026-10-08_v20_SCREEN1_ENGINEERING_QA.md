# Checkpoint — 2026-10-08 — v20 Screen 1 engineering + QA

## Decision

**Screen 1 visual QA = FAIL.** Continue Screen 1 only. Do not start Screen 2,
promote this checkpoint to GitHub Pages or deploy to Vercel.

The current homepage is an engineering scaffold blocked by missing artwork,
not a completed or usable design candidate. No user UAT request is appropriate.

## Revision and ownership

- Branch: `chatgpt/feilawei-v20-golden-master`.
- Starting commit: `2069cf0db4e49f97f14718ef3863eb1cb6275f10`.
- Cache version: **20.1**.
- This checkpoint's resulting commit is recorded in Git history and issue #11.
- Tested runtime file hashes: [implementation.json](../qa/2026-10-08/implementation.json).
- Issues: #5 asset source blocker, #8 engineering, #9 QA, #11 coordination.
- Local preview: `http://127.0.0.1:8765/feilawei/`; QA runner uses its own
  temporary loopback server. No new public live URL.

Handoff, all twelve original referenced production docs, the README's v19
audit, and all seven project-local skills were read before implementation.
There is no project AGENTS.md. Specialist workstreams were handled in sequence;
no delegated agents or external creative services were used.

## Completed engineering

- Replaced the 390×824 mismatch with the approved **390×788.4** artboard.
- Fixed CTA box to **33.9 / 651.1 / 333.5 / 83.7**. Old top was about 29.5px low.
- Isolated the v20 entry from all v19 CSS/JS and later-screen screenshot UI.
- Preserved pre-continuation HTML exactly as `prototype-v19.html`; legacy
  scripts and artwork remain byte-for-byte unchanged.
- Defined the eleven measured production artwork frames and source manifest.
- Added atomic image loading; reject missing/unapproved/corrupt/small artwork.
- No rejected screenshot, enlarged tiny mascot or browser-font display imitation
  is loaded by the v20 entry.
- Added semantic reading order, one CTA, keyboard focus and double-tap guard.
- Prepared approved entry/mascot/CTA motion and reduced-motion behavior.
- Kept safe-area outside the artboard; short viewports scroll without squashing.
- Added repeatable source validation, browser capture and overlay review tools.

See [engineering handoff](../11_SCREEN1_ENGINEERING_HANDOFF.md) and
[asset contract](../../assets/v20/assets_manifest.md).

## Internal engineering QA: PASS

Playwright **1.57.0**, Chromium and WebKit **26.0** headless emulation, DPR 3.
Four widths in each engine; **18 checks passed**, no engineering failures.

| Width | Artboard height in both engines | CTA top in both engines | 568px viewport bottom reachable |
|---:|---:|---:|---|
| 375 | 758.0625 | 626.03125 | Yes |
| 390 | 788.390625 | 651.078125 | Yes |
| 393 | 794.453125 | 656.09375 | Yes |
| 430 | 869.25 | 717.859375 | Yes |

Maximum CTA coordinate/size deviation from the scaled spec: **0.02645px**.
Normal/short artboards retain their height. No horizontal overflow, broken
production file requests or page errors in the eight real-output captures.
The 430px desktop cap, centering and synthetic safe-area padding also passed.

Separate **synthetic rectangle fixtures** verified:

- complete assets load together and enable the semantic CTA;
- rapid repeated clicks emit one start event;
- keyboard activation and visible focus;
- press feedback before 100ms and reduced-motion fallback;
- refresh with corrupt legacy localStorage does not break home;
- tiny raster rejection and failed-layer rollback.

These checks prove transport/geometry/control behavior only. They do **not**
prove artwork fidelity, real mascot animation quality or completed navigation.
Screen 2 remains unimplemented; a future controller will consume the start event.

## Visual QA: FAIL

[Reference / Live / 50% Overlay viewer](../qa/2026-10-08/index.html)

The viewer includes eight matched artboard-size comparisons. The source used
in its Reference slot is explicitly **UNVERIFIED diagnostic input**:
`assets/master/screen1.webp`, 260×478, proportionally contained. It is not the
345×697 canonical Golden Master and cannot establish a 95% match.

Live captures correctly show the blocked, empty artwork state. The comparison
therefore fails; no visual pass, character sign-off or sharpness score is claimed.
The original 390px scaffold capture is retained as `baseline-390.png`.

| Finding | Severity | Status / action |
|---|---|---|
| S1-001: no production artwork; home cannot be used | Critical | OPEN, #5 / #9; restore exact approved layers |
| S1-002: canonical Golden Master bytes absent | Major | OPEN, #5 / #9; restore reference and lock SHA-256 |
| S1-003: 824px artboard misplaced CTA | Major | FIXED; all eight geometry cases pass |
| S1-004: v20 depended on missing full-page image and legacy flow | Major | FIXED architecture; actual artwork still blocked by S1-001 |

Asset validator intentionally exits 1: missing canonical reference, absent
technical asset sign-off and eleven missing layer slots.

Not assessed until sources exist: exact mascot/pose/anatomy/colours, unique
lettering, icons, decorative silhouettes, alpha edges, Retina sharpness and
95% visual match. Do not fabricate these from coordinates or upscale old images.

## Source recovery audit

- Canonical home, character sheet and transparent candidates named in docs are
  absent from the branch and current workspace.
- Git history only offers small/cropped home images or corrupt replacements.
- The 112×114 mascot's header can be read, but full image decoding fails.
- gh-pages carries the same rejected home image; its extra home/six-screen JPEGs
  also fail full decoding.
- Connected Drive searches for the exact home name, mascot name and project
  returned no accessible source.

No redraw, recolouring, source recreation or new creative direction was used.

## Browser limits

Desktop WebKit emulation is **not** real iOS Safari sign-off. iOS Safari and
ChatGPT in-app browser UAT have not run.

WebKit and its runtime libraries were installed under `/workspace/qa-browsers`.
Its bundle wrapper initially discarded the local library path; local QA setup
was corrected to preserve it. Host registry validation cannot see the local
GLES library, so that registry check was skipped after resolving dependencies
and verifying that the actual WebKit engine launches and renders. System
packages were not replaced. Browser setup files are outside the project.

## Next work

1. Restore the exact approved reference and character/pose source.
2. Produce transparent Retina layers or exact outlined vector assets; supply
   provenance and file hashes in the existing manifest.
3. Integrate without any character, typography, colour or layout redesign.
4. Rerun source checks and actual Reference / Live / 50% Overlay review at all
   four widths. Check idle/tap motion using real layers.
5. Clear all Critical/Major visual findings before staging promotion.
6. Only after internal visual PASS, promote to gh-pages, verify deployment and
   smoke test, then request real-device user UAT.

GitHub Pages remains staging/UAT only. Vercel remains reserved for final
production after the whole app and final UAT pass.
