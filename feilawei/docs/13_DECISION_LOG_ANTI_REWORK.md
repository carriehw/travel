# Decision Log — Anti-Rework Rules

## Why this exists
過去最大問題唔係欠缺 effort，而係確認咗嘅內容喺 implementation 階段又被重新演繹，導致重做。

由 v20 起，每一項決定只可以屬於以下其中一個狀態：

- **LOCKED** — 已確認，不可自行改
- **BUILDING** — 正在製作，只可修正 technical issue
- **QA** — 功能已完成，正做 visual / functional 驗收
- **PASSED** — 已過關，不可重開除非用戶提出 change request

## Current LOCKED decisions
- Product purpose: 用遊戲形式令一班人一齊揀下一個旅行目的地
- Golden Master = 100% visual authority
- Canonical approach = one fixed mobile size, other widths proportional scale
- Core gameplay = Privilege Cards + Mystery Elimination + 小天線隊長 Game Master
- Keep 12-box Golden Master
- Phase 1 = single-device Party Mode
- GitHub Pages = staging/UAT
- Vercel = final production only

## No-rework rule
已 PASSED 嘅 screen 不因後續 coding convenience 而 redesign。

如後續 requirement 真的需要影響已 PASSED screen：
1. 記錄 change request
2. 列明影響 screen
3. 先確認 impact
4. 只改受影響範圍

## Engineering rule
UI 未 ready 時可以先做 pure logic module。
Pure logic 不可以包含 DOM、layout 或 artwork decision，減少之後視覺修改造成重寫。

## Progress reporting
每次只報：
- Done
- Building
- Blocked
- Next
唔用「差唔多」「應該得」等模糊字眼。
