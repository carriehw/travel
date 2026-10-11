# v20 Task Priority — 2026-10-11

## Decision principle
重要性用四個維度評分：
1. 會唔會令產品失去真實用途
2. 會唔會直接造成用戶看得見的錯誤
3. 會唔會令之後工作需要重做
4. 是否阻塞下一步

## P0 — 必須先完成

### 1. Screen 1 真實繁體字
**Importance: 10/10**
原因：
- AI 假字直接破壞產品可信度
- copy 錯比 spacing 問題嚴重
- 所有後續 screen 都必須沿用同一 rendering rule

Status: BUILDING → QA

### 2. Screen 1 真機清晰度
**Importance: 10/10**
原因：
- 用戶真機已證明 low-res raster 不合格
- 放大 raster 只會放大模糊
- 必須改用 native text/vector + approved artwork

Status: BUILDING → QA

### 3. Renderer architecture lock
**Importance: 10/10**
新規則：
- 文字 = 真實 DOM text
- icon = SVG/CSS
- mascot = approved artwork
- AI screenshot 只做 composition/style reference
- 禁止 full-screen raster text production

Status: LOCKED

## P1 — Screen 1 過 P0 後立即做

### 4. Golden Master visual alignment
**Importance: 9/10**
檢查：
- hierarchy
- relative positioning
- palette
- mascot scale
- CTA
- three-step composition

注意：
不再用 AI 字形做 pixel-equality authority。

### 5. Real-device UAT
**Importance: 9/10**
Safari / ChatGPT in-app browser
只測 Screen 1。
PASS 後 Screen 1 freeze。

## P2 — Screen 1 freeze 後做

### 6. Screen 2 + gameplay production
**Importance: 8/10**
Core logic 已分離，可繼續用 game-engine。
Screen 2 implementation 仍然被 Screen 1 gate 阻擋。

## P3 — 暫時不做

### Vercel production / realtime Room Mode / extra animations
**Importance now: 2–4/10**
理由：
未驗證核心 screen fidelity 前做呢啲只會增加返工成本。
