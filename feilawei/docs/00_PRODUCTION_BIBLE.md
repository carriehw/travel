# 飛啦喂！v20 Production Bible

## 目的
將已確認的 Golden Master 視覺稿精準落地成可玩、流暢、手機友善的 Web App。視覺還原優先於功能擴展；所有新增功能不得破壞既有設計語言。

## 不可違反規則
1. 8 張 Golden Master 為最高視覺準則。
2. 不准自行改畫風、改色、改角色比例、重畫小天線隊長。
3. 小天線隊長固定：薄荷綠身體、藍色背包、2 隻手、2 隻腳、2 條天線。
4. 不准用 generic SaaS cards 取代插畫式版面。
5. 不准用低解像 full-screen screenshot 拉伸充當 UI。
6. 不准使用 object-fit: fill 拉扯 artwork。
7. 先還原視覺，再加入 matching / anti-repeat / animation 等功能。
8. 每頁完成後必須做 Reference / Live / 50% Overlay 驗收。
9. Screen 1 未過關，不進 Screen 2；逐頁 gate。
10. 所有變更需可追溯：Issue → Implementation → QA → Checkpoint。

## Target Flow
首頁
→ 旅行類型
→ 旅伴
→ 旅程條件（日數 / 距離 / Budget / 地區等）
→ Concern / 旅行偏好
→ 已去過 / 不想再出現
→ 智能配對
→ 12 個盲盒
→ 揭曉動畫
→ 結果 + 適合原因

## MVP 邊界
- 暫不開放 itinerary planning。
- 核心價值：抽旅行目的地、避免重複、解釋「點解適合你」。
- 保留 visited / exclude / anti-repeat。
- 所有動畫需支援 prefers-reduced-motion。

## 製作原則
### Design first
先建立精準 artboard / assets / typography / coordinates，再 coding。

### One coordinate system
以單一 mobile artboard 為設計基準；不同 iPhone 寬度只做等比例 scaling + safe-area 處理，不讓各元素各自亂跑。

### Asset ownership
角色、手寫字、品牌字、插畫、特殊 icon 應以正式 SVG / 高解像透明 PNG 輸出；普通說明文字才用 HTML text。

### No silent redesign
工程遇到限制時，先記錄 technical constraint，由 Visual + UX 提替代解法，經 Product Lead approve 才改。

## Definition of Done
一個 screen 只有同時符合以下條件才算完成：
- Visual match >= 95%（以 overlay review 判定）
- 所有 tap target 正常
- iPhone 375 / 390 / 393 / 430 viewport 正常
- Safari / in-app browser 無 overflow / crop
- 文字清晰、無低清放大
- 動畫不卡頓、不影響操作
- Back / refresh / state restore 符合預期
- QA reviewer sign-off
