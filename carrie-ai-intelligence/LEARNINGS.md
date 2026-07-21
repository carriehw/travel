# LEARNINGS — Carrie AI Intelligence

> 每期出刊後 append 一段。下期開工前**必讀全文**。

## Issue 001（2026-07-21 出刊，覆蓋 7 月 14–20 日）

### Fact-check 揪出嘅錯（下期直接避免）

1. **Roundup 炒冷飯係最大陷阱**：三則「當週新聞」其實係舊聞——Karpathy 加盟 Anthropic（5 月 19 日）、Meta AI 助手全球推送（4 月 24 日）、Threads 廣告全球開放（1 月）。**規則：每則新聞都要搜返原始公布日期，唔可以信 roundup 嘅日期。**
2. **「成為預設」「全面推出」呢類字眼最易出事**：GPT-5.6 係「正式開放」但預設仍係 GPT-5.5 Instant。產品狀態（GA／default／beta／announced／rolling out）要逐隻字核實。
3. **市場可用性要逐個 check**：ChatGPT Ads 只開放美日韓，香港落唔到——差啲叫香港讀者做一件做唔到嘅事。**規則：每個 🟢 行動都要核實香港做唔做到。**
4. **Aggregator 來源要升級**：初稿用咗 Tech Startups／LLM Stats／b2the7 呢類二三手來源，全部可以搵到一手（CNBC／OpenAI 官方／Search Engine Land）。搵料時直接加 `site:techcrunch.com OR site:cnbc.com` 呢類 filter 慳返一輪。
5. **數字寫實數好過寫概數**：「三分之一」→「29.45%（SE Ranking，50,032 個關鍵字）」，有研究名同樣本量先似 intelligence。

### 專家 panel 嘅寫作教訓（已寫入 WORKFLOW.md 規則）

- Ghostwrite 嘅親歷聲稱（「I've seen it decide shortlists」）係 IP 信譽炸彈——「I read it as…」安全，「I've seen…」禁用
- 複合預測要拆單（兩個綁埋，錯一半＝全錯）
- 絕對化句子（「cheapest they will ever be」）係最易被斷章取義嘅句子
- 同一期唔好自相矛盾（A 則「兩強競賽」vs B 則「第三勢力崛起」）

### 流程學習

- **環境限制**：proxy 封鎖大部分 WebFetch/curl（chatgpt.com、techstartups、b2the7、甚至 GitHub Pages 站都 403）——一律用 WebSearch snippet 攞料
- **三 agent 並行審核好有效率**（2 個 fact-check + 1 個 panel，~3 分鐘完成），成本遠低過出街後俾人捉錯
- **GitHub integration 冇權開新 repo**（403）——要開 repo 需用戶親手開，然後 add_repo + clone + push
- **Playwright 驗證必做**：render、9 條連結、JS error、中英 toggle，一個 script 搞掂
- 相片處理：用 PIL 以面部為中心裁 800×800 正方形，圓形 crop 先唔會切頭

### 未完成／下期跟進

- [ ] 用戶開通 LinkedIn Newsletter 後，換 `index.html` 兩個 Subscribe 連結（search `Subscribe:` 註釋）
- [ ] Archive 結構：Issue 002 起考慮 `/issues/001.html` 存檔制，首頁永遠最新一期
- [ ] 預測記錄頁（公開追蹤估中／估錯）——panel 認為係建立 authority 嘅最強手段
- [ ] LinkedIn headline 建議同 tagline 統一（已向用戶提出，未確認）
