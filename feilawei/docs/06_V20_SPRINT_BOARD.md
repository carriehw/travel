# v20 Sprint Board

## Sprint 0 — Foundation
- [x] Production Bible
- [x] Role Matrix
- [x] Acceptance Criteria
- [x] Handoff Workflow
- [x] Local project skills
- [x] v19 root-cause audit
- [x] Screen 1 asset inventory
- [x] Screen 1 coordinate spec

## Sprint 1 — Screen 1 Golden Master
### Visual / Asset
- [x] Canonical Screen 1 reference identified
- [x] High-resolution character sheet identified
- [ ] Final exact home-pose mascot production asset
- [ ] Brand/title/LET'S GO asset decision
- [ ] Step icon asset decision
- [ ] Decorative asset export

### UX
- [x] One primary CTA confirmed
- [x] Screen 1 purpose confirmed: explain 3-step experience and start
- [x] Accessibility reading order
- [x] Short-height engineering behaviour (real in-app UAT pending)

### Motion
- [x] Idle mascot motion spec and layer animation prepared (real art pending)
- [ ] route animation spec
- [x] CTA press feedback (synthetic engineering verification)
- [x] reduced-motion fallback (synthetic engineering verification)

### Engineering
- [x] Remove v19 native approximation from production path
- [x] Build 390px fixed artboard architecture
- [ ] Use exact artwork layers
- [x] Add CTA interaction overlay
- [x] Safe-area handling
- [x] No height-based stretching
- [x] Correct 824px scaffold height to approved 788.4px
- [x] Atomic layer loading with missing/corrupt/Retina asset guard
- [x] Reproducible capture and Reference / Live / 50% Overlay tooling

### QA
- [ ] 375px
- [ ] 390px
- [ ] 393px
- [ ] 430px
- [ ] iOS Safari
- [ ] ChatGPT in-app browser
- [ ] Reference / Live / Overlay
- [ ] Screen 1 PASS

### 2026-10-08 gate status

Engineering verification is logged separately in the latest checkpoint.
The four viewport checkboxes above remain unchecked for **visual sign-off**:
the canonical reference and all production layers are absent.
The diagnostic Reference / Live / Overlay viewer is available, but its old
reference is explicitly unverified and does not satisfy Golden Master QA.
Screen 1 remains FAIL; Screen 2 and staging promotion remain blocked.

## Gate
**Do not begin Screen 2 implementation until Screen 1 QA = PASS.**

## Approval points requiring user input
Only interrupt user for:
1. a genuine conflict between Golden Master and usability/safety;
2. a change to confirmed brand/character/copy;
3. a choice between two materially different visual solutions;
4. final Screen 1 UAT after internal QA passes.

Everything else should be handled by the project team workflow without asking.
