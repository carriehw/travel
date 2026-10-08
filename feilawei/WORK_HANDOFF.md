# ChatGPT Work Handoff — 飛啦喂！ v20

## Objective
Continue building the 飛啦喂！ mobile web app from the approved Golden Master designs, using GitHub Pages as staging/UAT and Vercel only for final production.

## Repository
- Repo: carriehw/travel
- Development branch: chatgpt/feilawei-v20-golden-master
- Staging branch: gh-pages
- Master coordination issue: #11

## Non-negotiable design rules
1. The approved Golden Master screens are the highest visual authority.
2. Do not redesign the art direction.
3. Do not redraw or recolor 小天線隊長.
4. Character anatomy is fixed: 2 hands, 2 feet, 2 antennae.
5. Do not replace illustration-led layouts with generic app cards.
6. Do not use low-resolution full-screen screenshots as final UI.
7. Do not use object-fit: fill or height-based stretching.
8. Restore visual fidelity first, then expand functionality.
9. Each screen must pass Reference / Live / 50% Overlay QA before proceeding.
10. Screen 1 must pass before Screen 2 implementation begins.

## Product flow
Home
→ Travel type
→ Companion
→ Trip conditions
→ Concerns/preferences
→ Visited / Excluded
→ Matching
→ 12 blind boxes
→ Reveal
→ Result

## Confirmed product logic
- visited destinations should normally be excluded from MVP recommendations
- excluded destinations are hard excludes
- anti-repeat should avoid showing the same destinations again under similar conditions
- blind-box destination assignment happens before the user taps
- result must explain why the destination fits using actual user answers
- itinerary planning is out of MVP scope for now

## Confirmed slogan
You only live once, 人生得一次，仲等咩？飛啦喂！

## Deployment rule
- GitHub Pages = staging / UAT
- Vercel = final production only after all screens + functional QA + final user UAT pass

## Project docs to read first
1. feilawei/docs/00_PRODUCTION_BIBLE.md
2. feilawei/docs/01_ROLE_MATRIX.md
3. feilawei/docs/02_ACCEPTANCE_CRITERIA.md
4. feilawei/docs/03_HANDOFF_WORKFLOW.md
5. feilawei/docs/04_SCREEN1_ASSET_INVENTORY.md
6. feilawei/docs/05_SCREEN1_COORDINATE_SPEC.md
7. feilawei/docs/06_V20_SPRINT_BOARD.md
8. feilawei/docs/07_DEPLOYMENT_STRATEGY.md
9. feilawei/docs/08_SCREEN1_UX_MOTION_SPEC.md
10. feilawei/docs/09_PRODUCT_STATE_MODEL.md
11. feilawei/docs/10_COPY_LOCK.md
12. feilawei/docs/checkpoints/2026-10-07_v20_SCREEN1_FOUNDATION.md
13. feilawei/docs/11_SCREEN1_ENGINEERING_HANDOFF.md
14. feilawei/assets/v20/assets_manifest.md
15. feilawei/qa/README.md
16. feilawei/docs/checkpoints/2026-10-08_v20_SCREEN1_ENGINEERING_QA.md
17. feilawei/docs/12_SCREEN1_SOURCE_RECOVERY.md
18. feilawei/assets/reference/README.md
19. feilawei/docs/checkpoints/2026-10-08_v20_SOURCE_RECOVERY_AND_INTEGRITY.md

## Project-local skills
- feilawei/skills/project-orchestration/SKILL.md
- feilawei/skills/golden-master-visual-fidelity/SKILL.md
- feilawei/skills/ux-flow-review/SKILL.md
- feilawei/skills/webapp-engineering/SKILL.md
- feilawei/skills/motion-interaction/SKILL.md
- feilawei/skills/asset-pipeline/SKILL.md
- feilawei/skills/qa-release/SKILL.md

## Team model
- Product Lead / Creative Director
- Visual / Illustration Designer
- Asset Production / Design Technologist
- UX / Product Designer
- Motion / Interaction Designer
- Web App / Front-end Engineer
- Visual + Functional QA
- Cantonese Copy + Accessibility Reviewer

## Current status
Latest continuation: **2026-10-08 source recovery + integrity; visual QA FAIL.**

Read the latest checkpoint before using the older foundation status below.
The current branch has a Screen 1-only entry, corrected 390×788.4 geometry,
atomic artwork loading, fetched-byte SHA-256 verification and reproducible QA.
The approved original master and confirmed character sheet are now recovered,
and the recorded canonical crop is verified pixel-for-pixel. Production layers
are still absent. Native Retina resolution is insufficient, and the recorded
crop clips the slogan; concrete source review evidence is linked above.
Do not mistake source recovery or 22 passing engineering checks for visual PASS.
No source-quality exception, reference crop or artboard change is approved.

v19 is rejected as a design candidate and retained only as a technical prototype.
v20 foundation is in place:
- fixed-artboard architecture
- Screen 1 coordinate spec
- UX/motion spec
- state model
- QA gates
- deployment strategy

## Immediate next task
Continue Screen 1 only:
1. prepare exact production-quality Screen 1 artwork/assets from the approved Golden Master
   - sources are recovered; first resolve native source quality and the footer crop conflict
   - never count a resized native crop as a high-resolution original
2. integrate into the 390px artboard architecture
3. validate on 375 / 390 / 393 / 430 widths
4. run Reference / Live / 50% Overlay QA
5. fix Critical/Major issues
6. only after internal PASS, deploy to gh-pages for user UAT
7. do not begin Screen 2 before Screen 1 passes

## User approval policy
Do not interrupt the user for:
- spacing fixes
- bug fixes
- browser compatibility
- asset optimisation
- obvious fidelity corrections
- implementation details

Ask only if:
- a confirmed Golden Master/brand/character/copy rule must change
- two materially different creative solutions need a decision
- a product/business decision cannot be inferred safely
- internal QA has passed and Screen 1 is ready for user UAT

## Expected working style
Work autonomously, log progress in Markdown checkpoints, keep GitHub issues updated, and only surface to the user when approval is genuinely needed.
