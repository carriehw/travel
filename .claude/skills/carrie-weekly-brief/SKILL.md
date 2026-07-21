---
name: carrie-weekly-brief
description: Produce a new issue of "Carrie AI Intelligence" — the bilingual (EN + 書面中文) weekly AI brief for marketers at carriehw/carrie-ai-intelligence. Covers the full pipeline; research the past week's AI news, draft 9 sourced stories in 3 categories, adversarial fact-check and expert-panel review via parallel agents, verify and publish to GitHub Pages, and update the LinkedIn post drafts. Use this skill whenever the user asks to 出 Issue / 出新一期 / next issue / weekly brief update / 更新網站新聞 / write this week's LinkedIn post for Carrie AI Intelligence, or mentions updating the AI marketing weekly site — even if they only mention one part (e.g. just the LinkedIn post), because every part depends on the same verified story set.
---

# Carrie AI Intelligence — 出刊 skill

呢個 skill 係為 Carrie Hui 嘅個人 IP 產品「Carrie AI Intelligence」出新一期 weekly brief。品牌承諾：**Helping marketers filter AI noise into business decisions** — 做 intelligence（解讀＋決策），唔係 news（快訊）。讀者係香港／大中華嘅 marketers 同 agency 決策者。

## 開工前必讀（Step 0）

1. Repo root 嘅 `LEARNINGS.md` — 過往每期嘅錯同教訓，唔讀就會重犯
2. Repo root 嘅 `WORKFLOW.md` — 完整 SOP（研究 query 模板、story 欄位表、寫作規則、驗證 script、push 目標）
3. 上一期 `index.html` — 直接複製佢嘅 story card HTML 結構

如果搵唔到呢啲檔案（例如喺 travel repo 開 session），先 clone `carriehw/carrie-ai-intelligence`（可能需要 add_repo）。

## 流程摘要（詳細見 WORKFLOW.md）

1. **研究**：WebSearch 為主（proxy 封鎖大部分 WebFetch）；每分類 2–3 條 query，**另加中文 query 搜大中華線**（微信 AI／小紅書聚光／巨量引擎／騰訊廣告／AIGC 監管／travel retail AI）；每則新聞必須核實**原始公布日期**係當週——roundup 成日將舊聞包裝成新聞
2. **起草**：3 分類共 9–10 則（🔥 MUST KNOW／⚡ PRODUCTIVITY／📈 MARKETING IMPACT），每則齊：來源＋日期＋一 click 原文連結＋**Key Highlights（2–3 粒 bullet，事實＋重要性融埋）**＋**Industry Insight（中性行文，冇「我」、冇個人掛名）**＋🟢🟡🔴 訊號；有實據 pattern 先加 Pattern Watch；EN 同書面中文兩版都要寫
3. **審核（必做，唔可以跳過）**：三個 agent 並行——兩個 fact-check（逐 claim VERIFIED/PARTLY WRONG/CANNOT CONFIRM＋證據 URL），一個專家 panel（總編／agency director／personal branding 三視角，判 KEEP/TWEAK/RETHINK）
4. **修正 → 驗證**：headless chromium（`/opt/pw-browsers/chromium` + playwright-core）check render、全部原文連結、JS error、中英 toggle
5. **發布**：push `carriehw/carrie-ai-intelligence` main（GitHub Pages 自動 deploy）＋開發 branch；更新 `linkedin-post.md`（EN＋書面中文＋first comment）
6. **記錄**：喺 `LEARNINGS.md` append 今期學習——呢步係下期質素嘅來源，收工前必做

## 不可妥協嘅規則

呢啲規則全部係 Issue 001 實戰中俾 fact-check／專家 panel 揪出嚟嘅，每條背後都有一次真實失誤：

- **來源要一手**（官方 blog／CNBC／TechCrunch／Search Engine Land 級數），aggregator 只可以用嚟搵線索
- **網站唔用第一身、唔用個人掛名觀點**（Carrie 決定：「我嘅觀點唔一定啱，費事講錯嘢俾人周」）——行業洞察中性行文；「I've seen…」親歷聲稱一律禁用
- **每個 🟢 Act now 要通過香港執行度測試**：香港讀者聽日返工做唔做到？做唔到就改 readiness 或註明市場限制
- **大中華視角係結構性要求**：每期至少 2–3 則 GC/HK 原生新聞（散落三個分類，唔另設分區）；每則全球新聞必須答到「香港/GC marketer 有咩關係」——呢個係本 brief 嘅 moat，冇咗就只係另一份美國科技摘要
- **預測單一、有日期、可驗證**；產品狀態字眼（default／GA／beta／rolling out）逐隻核實
- **公司名唔出現**：Carrie 嘅身份係「AI Marketing Strategist · Travel Retail & Greater China」，唔提僱主；獎項寫「所屬團隊曾獲」
- 所有 Take／Prediction 係代 Carrie 起草，出街前由佢過目——喺總結中提醒佢
