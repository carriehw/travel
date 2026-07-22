# Carrie AI Intelligence — 每週出刊 Workflow（SOP）

> 每次出新一期（「出 Issue 00X」）由頭到尾照住呢份文件行。
> 行完之後必做兩件事：更新本文件（如流程有改良）＋ 喺 `LEARNINGS.md` append 當期學習。

## 全流程總覽（約 60–90 分鐘）

```
0. 讀取記憶 → 1. 研究 → 2. 起草 → 3. Fact-check（agents）→ 4. 專家 panel（agent）
→ 5. 修正 → 6. 驗證 render + 連結 → 7. Push 兩個 repo → 8. LinkedIn post → 9. 記錄 learnings
```

## Step 0 — 讀取記憶（開工前必做）

1. 讀 `LEARNINGS.md` 全文——上期犯過嘅錯唔可以重犯
2. 讀上一期 `index.html` 嘅 story 結構做模板
3. 確認本期覆蓋日期範圍（上週一至週日）

## Step 1 — 研究（WebSearch 為主）

- 注意：**環境 proxy 會封鎖大部分 WebFetch／curl**，靠 WebSearch 嘅 snippet 攞料
- 每個分類搜 2–3 條 query：
  - 🔥 MUST KNOW：`biggest AI news [當週日期] OpenAI Google Anthropic`
  - ⚡ PRODUCTIVITY：`ChatGPT Claude Gemini new feature [月份] 2026`
  - 📈 MARKETING IMPACT：`AI marketing advertising news [月份] Meta Google ads`
- **大中華線（必搜，中文 query）**：
  - `微信 AI 功能 更新 [月份]`／`小紅書 聚光 AI 商業化`／`巨量引擎 智能投放 AI`
  - `騰訊廣告 AI [月份]`／`AIGC 標識 新規 備案`／`阿里 字節 大模型 [月份]`
  - `旅遊零售 AI 營銷`（Carrie 主場，有料必用）
  - 來源：平台官方公告、36氪、晚點 LatePost、界面——同樣要一手
- 大型研究可調用 `deep-research` skill
- 全期揀 9–10 則（每類約 3 則，🔥 MUST KNOW 可以 4 則），標準：
  - **必須係當週新聞**（用 roundup 搵料，但要核實原始日期——roundup 成日炒冷飯）
  - 對香港 marketer 有實際意義
  - 有可連結嘅一手來源（官方 blog／CNBC／TechCrunch 級數，唔要 aggregator）
  - **全期至少 2–3 則 GC/HK 原生新聞**（WeChat／RED／Douyin／騰訊／字節／中國 AI 監管／travel retail AI），散落喺三個分類，唔另設分區——呢個係本 brief 對比美國 newsletter 嘅 moat
  - **每則全球新聞必須答到「香港/GC marketer 有咩關係」**（喺 Key Highlights 或 Industry Insight 入面）——答唔到嘅新聞唔夠格入選
  - 受眾提示：讀者係香港（主）＋台灣＋海外華人 marketer（LinkedIn 大陸用唔到）——但佢哋做緊大陸市場生意，GC 內容線係 moat，一啲都唔減

## Step 2 — 起草

每則 story 必備欄位（照上期 HTML 結構複製）：

| 欄位 | 要求 |
|---|---|
| Source badge + 日期 | 真實日期；來源寫實際出處 |
| 標題 | 可 click 去原文 |
| Key Highlights／重點摘要 | 2–3 粒 bullet（`<ul class="kh">`），事實＋重要性融埋寫，數字要具體 |
| Industry Insight／行業洞察 | 1–2 句**中性行文**——冇「我／I」、冇個人掛名（Carrie 2026-07-21 決定：「我嘅觀點唔一定啱，費事講錯嘢俾人周」），保留 hedge（「趨勢看來」「usually」） |
| 行動訊號 | 🟢 Act now / 🟡 Watch / 🔴 Wait，加一句具體動作 |
| Pattern Watch／趨勢觀察 | 有實據 pattern 先寫（見預測準則），中性行文，唔用「我預期」 |

- 語言：EN + 書面中文（`.en`/`.zh` span 兩版都要寫）；hero 標題係固定刊頭語（「看懂 AI，不必看盡 AI」），唔使每期改
- 同步更新：hero 嘅 Issue 號/日期、This week's signal、底部「本週值得思考的三個問題」（**問題形式，唔用命令句**；對 agency 同品牌方都成立，主題每期轉）
- **當期頭圖**：用 `assets/covers/cover-template.html` 換 Issue 號＋英文 hook＋三行新聞速覽，headless chromium 1080×1350 @2x render 做 `assets/covers/issue-XXX.png`——**圖片全英文（Carrie 規定）**，SendUserFile 交俾 Carrie 出 post 用

### 寫作規則（違反過先寫低，唔好再犯）

1. **網站唔用第一身、唔用個人掛名觀點**（2026-07-21 Carrie 決定）：行業洞察用中性觀察行文；「I've seen…」親歷式聲稱一律禁止；LinkedIn post 係個人發言可用第一身，但預測都用 pattern-watch 式（「值得留意」）唔用斷言
2. **香港執行度檢查**：每個 🟢 Act now 問一次「香港讀者聽日返工做唔做到？」做唔到就改成 readiness 動作或者註明市場限制
3. **預測要單一、有日期、可驗證**——唔好將兩個預測綁埋一齊（命中率減半，錯一半就當你全錯）
4. **絕對化字眼收斂**：「cheapest they will ever be」呢類必然句改做「usually／historically」
5. **同期內部一致**：唔好 A 則講「兩強競賽」、B 則又講第三個挑戰者
6. **每期🟢唔好超過 3 個**——「今次真係要行動」講得多會麻木

## Step 3 — Fact-check（兩個並行 agent）

開兩個 general-purpose agent（一個負責 🔥 MUST KNOW，一個負責其餘 6–7 則），prompt 要求：
- 逐條 claim 判定 VERIFIED / PARTLY WRONG / CANNOT CONFIRM
- 附證據 URL；建議更好嘅一手來源
- 特別核對：日期係咪當週、數字、產品狀態字眼（default／GA／beta／rolling out）、**「可用市場」清單要搵最新完整名單**（Issue 001 教訓：ChatGPT Ads 寫剩 3 個市場實際 7 個）、日期 metadata 都要有來源

## Step 4 — 專家 panel（一個 agent，同 Step 3 並行）

一個 agent 以三重視角 review 所有 Industry Insight + Pattern Watch：
- 前媒體總編：邏輯、有冇 overreach、同期一致性
- Agency director：香港執行度、專業風險（客戶日後可以指住話你錯嘅句子）
- Personal branding：斷章取義風險、fabricated experience、voice 一致
- 判決制：KEEP / TWEAK / RETHINK + 建議改寫

## Step 5 — 修正

- 照 fact-check 逐項改：日期、數字、來源 URL、措辭
- 照 panel 判決改 Industry Insight／Pattern Watch（TWEAK/RETHINK 全改，KEEP 不動）
- 舊聞（>7 日前而且唔係當週有新發展）整則換走

## Step 6 — 驗證

```bash
# headless chromium render + 檢查連結（executablePath: /opt/pw-browsers/chromium，playwright-core）
# 檢查：全部 readsrc 連結正確（badge 對 link 域名）、JS error = 0、中英 toggle 正常、full page screenshot 人眼過一次
# 另 grep：第一身殘留（我會／我預期／I expect／my read）、廣東話殘留（緊／咗／嘅／係／唔）、簡體殘留（着／里／为）、舊 label（Summary／Why it matters／Carrie）
# 中文翻譯腔自測（見 LEARNINGS）：長前置修飾語／「面對…隨著…」骨架／被動 calque／名詞化堆疊——每句問「母語讀者會唔會咁講」
```

**如果起草後有大改（重寫、濃縮、加新聞）**：再開一個 agent 做獨立來源覆核——濃縮改寫會引入 drift（Issue 001 就係咁捉返兩個錯）。清晰度自測：每段洞察抽離前文都要即刻明（見 LEARNINGS 清晰度規則）。

## Step 7 — Push（兩個 repo 都要）

1. `carriehw/travel` branch `claude/carrie-ai-intelligence-rebrand-ky4mxi`（開發記錄）
2. `carriehw/carrie-ai-intelligence` `main`（生產，GitHub Pages 自動 deploy）

## Step 8 — LinkedIn post

- 更新 `linkedin-post.md`：EN 版 + 書面中文版 + first comment
- 結構：hook（本週訊號一句）→ 3 個 takeaway（🟢🟡🔴 開頭）→ 1 個 pattern watch（「One pattern worth watching」式，寫明依據，唔用斷言）→ CTA（"one brief, not fifty headlines"）
- 規則：brief 連結＋「Personal project — views mine, not any employer's or client's」放 first comment（60 秒內貼＋pin）；當期頭圖做 post 附圖；香港時間週二／三 8:30–9:30am 出；hashtags 6–8 個；出 post 前重溫 linkedin-post.md 尾段嘅應對小抄同 24 小時 playbook

## Step 9 — 記錄 learnings（收工前必做）

喺 `LEARNINGS.md` append 一段：
- 今期 fact-check／panel 揪出咗乜（下期點避免）
- 流程邊度慢咗／卡咗（下期點改良）
- 有冇新規則要加入本文件 Step 2 寫作規則
