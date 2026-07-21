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

## Issue 001 出街前最終審核（2026-07-21，Editor + 行業專家三席 + 風險審計）

### 新增規則（Issue 002 起生效）

1. **日期窗口誠實**：hero 唔好寫「14–20 July」呢類窗口（一定有新聞跌出窗外俾人捉）——改用出刊日期「Issue 00X · 21 July」
2. **雙語完整性 checklist**：所有 label（包括 Carrie's Take→Carrie 觀點）、所有日期都要有 .zh span；簡體字殘留（着→著）要 grep 一次
3. **標題都要 hedge**：內文有「據報」唔夠，標題先係被 screenshot 嘅嘢——「reportedly／據報」要出現喺標題
4. **產品歸屬要準**：Reels 係 Instagram 唔係 TikTok——平台產品名前面加返公司名
5. **閱讀時間唔好報細數**；訊號圖例（🟢🟡🔴）要有解釋
6. **僱主風險語氣**：行業經濟評論用觀察式（「行業正面對…」）唔用指令式（「agency 應該…」）；footer 常設「個人出版物，不代表僱主」+ AI 協作聲明

### 行業專家評分同 Issue 002 方向

- Agency 讀者 7/10、in-house 讀者 4/10。**最高影響改善：大中華視角要結構化**——每期至少 2–3 則 GC/HK 原生新聞（WeChat／RED／Douyin／travel retail AI），每則全球新聞加「香港角度」一句。呢個係 Carrie IP 嘅 moat，冇咗佢就只係另一份美國科技摘要
- 每則新聞加「Say this to your client」一句（客戶 email 直接用得），係 agency 讀者轉發嘅誘因
- 🟢 每期上限三個（Issue 001 有五個——訊號通脹）；發布 Act/Watch/Wait 準則
- 預測 scorecard 由 Issue 002 開始（上期預測回顧：中／唔中／點解）——冇 scorecard 唔好叫人「Screenshot this」
- In-house 讀者：每個 🟢 加「細團隊版本」動作（無 agency、低預算做法）

### 風險清單（需 Carrie 本人行動，唔係網站改到）

- [ ] **出街前同上司／comms 打招呼**（email，留低回覆）——唯一 career 級風險
- [ ] 換走網站上嘅私人 Gmail（開專用 alias），私人帳戶全部開 2FA
- [ ] LinkedIn About 加「Views are my own」
- [ ] 定期 search 自己名+職銜，望下有冇假冒 profile
