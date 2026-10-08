# 飛啦喂！ Web App — v20 Golden Master Rebuild

目前 v19 只保留作 technical prototype。v20 進入 **Golden Master-led production**：先逐頁還原已確認設計，再加入功能與動畫。

## Non-negotiables
- 8 張 Golden Master 為最高視覺準則
- 不准重畫／改色小天線隊長
- 不准將插畫式版面變成 generic app cards
- 不准用低清 full-page screenshot 拉伸充當 UI
- Screen 1 未過 Visual QA，不進 Screen 2
- 每頁使用 Reference / Live / 50% Overlay 驗收

## Confirmed product scope
- 首頁 → 旅行類型 → 旅伴 → 條件 → Concern / 偏好 → 已去過 / 排除
- 智能配對 → 12 個盲盒 → Reveal → Result
- visited / exclude / anti-repeat
- 暫不開放 itinerary planning
- Slogan：**You only live once, 人生得一次，仲等咩？飛啦喂！**

## Production docs
- [Production Bible](docs/00_PRODUCTION_BIBLE.md)
- [Role Matrix](docs/01_ROLE_MATRIX.md)
- [Acceptance Criteria](docs/02_ACCEPTANCE_CRITERIA.md)
- [Handoff Workflow](docs/03_HANDOFF_WORKFLOW.md)
- [Screen 1 Asset Inventory](docs/04_SCREEN1_ASSET_INVENTORY.md)
- [Latest checkpoint](docs/checkpoints/2026-10-08_v20_SCREEN1_ENGINEERING_QA.md)
- [Screen 1 engineering handoff](docs/11_SCREEN1_ENGINEERING_HANDOFF.md)
- [Production asset contract](assets/v20/assets_manifest.md)
- [Internal QA tools](qa/README.md)
- [QA evidence viewer](docs/qa/2026-10-08/index.html)

## Project-local skills
- [Golden Master Visual Fidelity](skills/golden-master-visual-fidelity/SKILL.md)
- [UX Flow Review](skills/ux-flow-review/SKILL.md)
- [Web App Engineering](skills/webapp-engineering/SKILL.md)
- [Motion & Interaction](skills/motion-interaction/SKILL.md)
- [Asset Pipeline](skills/asset-pipeline/SKILL.md)
- [QA & Release](skills/qa-release/SKILL.md)

## Team workstreams
GitHub master issue: #11

Subtasks:
- #5 Visual / Illustration
- #6 UX / Product
- #7 Motion / Interaction
- #8 Web Engineering
- #9 Visual + Functional QA
- #10 Cantonese Copy + Accessibility

## Current next step
**Screen 1 only**: exact asset preparation → coordinate spec → engineering → overlay QA.

Do not patch v19 visual layout further.

## Current entry and gate

`index.html` is now a Screen 1-only v20 entry with independent styling and
runtime. The previous HTML is archived as `prototype-v19.html`; legacy scripts
and artwork are unchanged.

**Screen 1 visual QA = FAIL.** The canonical reference and Retina artwork layers
are not in the repository. The asset loader records a blocked state and disables
the CTA until actual approved art is supplied. This branch is an engineering
checkpoint, not a usable homepage or user UAT candidate.

GitHub Pages remains staging/UAT only. No staging promotion or Vercel release
has been made for this checkpoint.
