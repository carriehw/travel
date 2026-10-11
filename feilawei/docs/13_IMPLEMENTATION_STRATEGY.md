# v20 Implementation Strategy — Locked 2026-10-11

## Why this exists
過去最大問題係：已經確認嘅設計去到 coding 階段被重新演繹，結果愈改愈偏，亦不斷重做。

用戶已重新鎖定兩個優先條件：
1. **Golden Master = 100% 定稿**
2. **一個 canonical mobile size 精準還原，其他尺寸只等比例縮放／放大**

同時要求以 **cost + time effective** 方法完成。

---

## Final rendering strategy

### A. 已確認 Golden Master screen
使用 **Canonical Artboard + Semantic Hotspots**。

即係：
- 視覺由 approved Golden Master artboard 直接呈現
- 整幅畫面作為一個受 hash 驗證嘅 production asset
- 按鈕／選項／可點範圍用透明 semantic HTML hotspot 疊上去
- 所有裝置只按寬度等比例 scaling
- 不重新排版
- 不由工程師用 CSS 重畫角色／插畫／手寫字

### Why
呢個方法最符合：
- 100% style fidelity
- 最少工程 interpretation
- 最快落地
- 最低返工風險
- 最低前端複雜度

---

## B. 新增 gameplay screen
例如：
- Party Setup
- Privilege Cards
- Mystery Elimination

呢啲未有 Golden Master，所以流程係：

1. Product mechanic spec
2. Static Golden Master design
3. User/design lock
4. Export canonical artboard
5. Semantic hotspots
6. Engineering
7. Overlay QA

**未有 static approved design，不准直接 code。**

---

## What we are NOT doing anymore

### ❌ 不再要求每個已定稿 screen 拆成 10+ layers
除非某一 layer 真係需要獨立 animation / state。

之前 Screen 1 被拆成 11 layers，產生：
- asset production bottleneck
- Retina source shortage
- 重新描畫風險
- implementation drift
- 大量 QA 成本

對一個已完全鎖定嘅畫面，呢個複雜度冇產品價值。

### ❌ 不再由 browser font 模仿 Golden Master 字款
獨特 title / lettering 已經係 artwork 一部分。

### ❌ 不再先 optimize 再驗收
順序改為：
**fidelity → QA → optimize**

如果 compression 令畫面走樣，就唔接受。

---

## Quality strategy

Screen 1 production:
- verified complete-footer Golden Master reference
- lossless WebP production artboard
- standard Lanczos technical resample only
- no AI upscale
- no redraw
- no recolour
- no relayout
- hash locked

Automation:
- asset hash/provenance validation
- browser geometry QA
- interaction QA
- Reference / Live / 50% Overlay
- pixel MAE / PSNR threshold

Real-device:
- GitHub Pages staging
- iPhone Safari
- ChatGPT in-app browser
- user UAT

---

## Architecture rule

Visual layer and product logic must remain separate.

```
Golden Master Artboard
        +
Semantic Hotspots
        ↓
UI Events
        ↓
Game State / Recommendation Engine
```

Changing recommendation logic must never require redrawing approved UI.

---

## Cost guardrail

MVP:
- vanilla HTML/CSS/JS
- localStorage
- single-device Party Mode
- no login
- no backend
- no real-time multiplayer
- GitHub Pages staging

Only after gameplay is validated:
- Room Mode
- backend/shared session
- Vercel production

---

## Anti-rework rule

A completed decision may only reopen when:
1. user explicitly changes it;
2. a measured QA failure proves it cannot work;
3. a technical constraint makes it impossible.

「工程師覺得另一種靚啲／方便啲」唔係 reopen 理由。
