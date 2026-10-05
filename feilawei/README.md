# 飛啦喂！ Web App v8

以最新確認的 Playful Pastel 視覺稿為基礎重製的可玩 Web App prototype。

## Design direction
- 暖米白底 + Coral / Powder Blue / Mint / Butter Yellow / Lilac
- 避免規整 SaaS 卡片感，改用 sticker、手繪路線、便條紙、postcard、盲盒
- 小天線隊長固定：薄荷綠身體、藍色背包、2 手、2 腳、2 條天線
- Slogan 固定：**You only live once, 人生得一次，仲等咩？飛啦喂！**

## Flow
首頁 → 玩法 → 旅伴 → 日數/預算 → 旅行類型 → Concern → 旅行記憶 → 配對 → 12 個盲盒 → Reveal → 結果原因

## MVP scope
- 有 anti-repeat / visited / exclude logic
- 有動畫與盲盒互動
- 暫時沒有 itinerary planning
- 純 HTML/CSS/JS，無需 build step

## Run
直接用 web server 開 `feilawei/index.html`；手機正式測試建議用 HTTPS host，而唔係 iOS 文件預覽器。
