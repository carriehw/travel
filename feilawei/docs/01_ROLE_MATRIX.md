# Project Team Role Matrix

## 1. Product Lead / Creative Director
Owner: ChatGPT coordination layer

### 負責
- 鎖定 Golden Master 與 scope
- 解決角色之間衝突
- 決定是否可進下一頁
- 保護已確認內容，不容許自行 redesign

### 不做
- 不以「工程方便」理由自行改視覺

---

## 2. Visual / Illustration Designer
### 任務
- 整理 8 張 Golden Master
- 建立 asset inventory
- 輸出角色 / decorative shapes / handwritten text / icons
- 鎖定 color tokens、stroke、shadow、corner treatment
- 確保所有角色一致

### Deliverables
- assets_manifest.md
- high-res transparent assets
- screen coordinate spec
- typography spec

---

## 3. UX / Product Designer
### 任務
- 檢查完整 flow 是否直觀
- 減少不必要問題
- 定義 back / skip / retry / saved result
- 定義 visited / exclude / anti-repeat 邏輯的呈現方式
- 驗證用戶唔會「同一條件又抽返同一批地點」

### Deliverables
- ux_flow.md
- state diagram
- error / empty / loading states
- usability findings

---

## 4. Motion / Interaction Designer
### 任務
- 小天線隊長 idle motion
- 選項 tap feedback
- page transition
- blind-box wiggle / pick / reveal
- countdown / confetti
- reduced-motion fallback

### 原則
動畫是加強定稿，不是用動畫掩蓋版面偏差。

---

## 5. Web App / Front-end Engineer
### 任務
- 按 approved coordinate spec 落地
- mobile safe-area / viewport / Safari
- retina assets
- state management
- localStorage
- animation performance
- GitHub Pages deployment
- cache busting

### 禁止
- full-page low-res screenshot UI
- object-fit: fill
- 任意替換字型 / icon / artwork

---

## 6. Visual QA + Functional QA
### 任務
- Reference / Live / 50% Overlay
- 逐頁 visual diff
- tap targets
- back / refresh / repeat / save / reroll
- 375 / 390 / 393 / 430 widths
- Safari / ChatGPT in-app browser

### Gate
任何 Critical / Major issue 未清零，不准進下一 screen。

---

## 7. Cantonese Copy + Accessibility Reviewer
### 任務
- 廣東話自然度
- 避免大陸腔 / AI 味
- 文案一致
- tap target 至少約 44px
- readable contrast
- aria-label / semantic labels
- motion accessibility

---

## Optional specialist
### Asset Production / Design Technologist
如 Golden Master 素材需要由整頁稿拆成高解像 layer，加入此角色。這個角色介乎設計與工程之間，負責準確切圖、SVG 清理、透明邊緣、Retina export、檔名與版本控制。

此角色對本 project 很重要，建議納入正式流程。
