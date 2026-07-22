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

## Voice 規則（2026-07-21 語氣審核後定立，永久生效）

Carrie 明確指示：呢個網站係「市場 News + 我嘅觀察」，冇超然或必定嘅 comment。

1. **過去用事實寫，未來用第一身寫**：已發生嘅嘢可以直述（「TikTok 開放咗 Ads Manager」）；未發生嘅一律「I expect／my read is／my bet is／我預期／我的觀察是」，日期保留（accountability），但唔可以斷言（prophecy）
2. **以同行身份建議，唔好做老師**：命令句（「Run a test」「本週請重跑」）改「here's what I'd do」（「我本週會重跑自己嘅 prompts，也建議你照做」）；淨係 Actions 清單同 🟢🟡🔴 label 可以用祈使句（讀者已 opt-in 接受指示）
3. **招牌對比句式保留**：「Most people read X, I read Y」「a bet, not a plan」係品牌——自信來自觀察嘅銳利，唔係動詞嘅必然
4. Prediction 收尾用 accountability hook（「Check back on me in January — I'll own it either way」），唔用「Screenshot this」先知式
5. **Footer 一句搞掂**：全部聲明壓縮做一行 muted 細字（© · 個人觀點 · AI 輔助經審閱 · 附原文出處），詳細版放 About——結尾唔可以累贅

## 預測準則（2026-07-21 Carrie 定立，永久生效）

**冇實在支持嘅推測，寧願唔出。** 每個 prediction／expectation 出街前過三關：

1. **有冇可驗證嘅依據？**（觀察到嘅 pattern、數據、已發生嘅 sequence）——類比唔算證據（multi-cloud 類比嗰個預測因此刪走）
2. **依據要寫埋出嚟**（「The basis: …／依據：…」），俾讀者自己判斷推論強唔強
3. **依賴第三方未公布決定嘅預測唔好出**（例：「ChatGPT Ads 登陸香港後兩季內…」——OpenAI 未公布香港時間表，刪走）

Issue 001 應用結果：三個預測刪剩一個（lookalike audiences——有 Meta 劇本 sequence + custom audiences 技術前設做依據）。**質素標準：一個有依據嘅預測，好過三個冇依據嘅。**

## Issue 001 終審決定（2026-07-21）

- **📈 分類招牌暫時用中性描述**（"and what I'd do about it"）——「香港及大中華視角」呢個招牌要等 Issue 002 真係有 2–3 則 GC 原生新聞先掛返上去，招牌唔可以走喺內容前面
- Post 承諾寫 "every week" 唔寫 "every Monday"（出 post 日係週二／三，唔好自己打倒自己）
- LinkedIn post 嘅 first comment 加常設一句「Personal project — views mine, not any employer's or client's」
- 出街日應對小抄同 24 小時 playbook 已存喺 linkedin-post.md 尾段，每期出 post 前重溫

## 編輯方針改版（2026-07-21 Carrie 決定，永久生效）

**網站唔用個人掛名觀點。** Carrie 原話：「我想個網站資訊性要夠強，而我嘅觀點又唔一定啱，所以我會採取資料性、重要性、行業洞察，唔用 Carrie's take，費事講錯嘢俾人周。」

新卡片結構（Issue 001 已重造，之後照跟）：
1. **Key Highlights／重點摘要**：2–3 粒 bullet，事實＋重要性融埋寫（取代 Summary + Why it matters 兩段）
2. **Industry Insight／行業洞察**：1–2 句中性行文——冇「我／I」、冇個人掛名，保留 hedge
3. **Pattern Watch／趨勢觀察**（取代 My Prediction）：有實據 pattern 先寫，中性行文（「值得留意」），冇個人承諾式收尾
4. LinkedIn post 係個人發言可用第一身，但預測同樣用 pattern-watch 式

其他當日決定：
- **WAICO 補入 Issue 001 做第 10 則**（29 國 7 月 16 日上海簽署、政府間組織、已 fact-check：gov.cn + Al Jazeera + Sixth Tone 三源核實）——Issue 001 由此有咗第一則 GC 原生新聞
- 漏網新聞覆盤：Thinking Machines Inkling（975B open-weight）同 Kimi K3 撞主題冇入；小紅書聚光「爆文拆解／簡單投」+ 蒲公英新規來源未夠實（搜狐/網易級數），列入 Issue 002 候選待驗證

## 清晰度規則（2026-07-21 Carrie feedback 後定立，永久生效）

Carrie 指出洞察段「表達唔清晰、前文後理難以理解」（例：Atlas 嗰段「賭博而不是計劃／平台層／side projects」）。問題根源係**壓縮式寫法**。新規則：

1. **每段洞察要自足**——一個冇睇過前文嘅讀者都要即刻明；指涉要明確（「教訓」係咩教訓？「平台層」即係邊啲產品？）
2. **少用壓縮比喻**（「賭博而不是計劃」呢類）——直接講清楚因果：「呢類產品隨時會被叫停，所以唔好依賴」
3. **術語節制**：marketer 圈通用術語（SEO、prompt、lookalike audiences）可以用；含糊嘅抽象詞（平台層、visibility strategy、stack、決策價值）要換做具體講法或者即場解釋
4. **寫完自測一次**：「唔知前文嘅讀者，單睇呢段明唔明？」唔明就重寫

## 最終來源覆核結果（2026-07-21 晚，出街前最後把關）

10 則逐 claim 覆核（26 次搜尋、全部附證據 URL），8 則完全 VERIFIED，2 個修正：
1. **ChatGPT Ads 市場清單寫少咗**：實際已開放 7 個市場（美加英澳紐日韓），我哋只寫咗 3 個——教訓：**「可用市場」呢類清單要搵最新完整名單，唔好照抄舊報導**
2. **Atlas「7 月 14 日確認時間表」查無實據**（死線 7 月 9 日已公布）——教訓：日期 metadata 都要有來源，冇來源就刪
另外注意：Kimi K3「明顯平過同級」係成立但偏進取（vs 旗艦平三分之二，但同中階模型同價）——下期呢類比較寫明對比對象。

## 受眾定位（2026-07-22 Carrie 確認，永久生效）

**中文版讀者 = 香港（主）+ 台灣 + 海外華人。大陸用戶唔係目標讀者**——LinkedIn 喺大陸用唔到，佢哋根本接觸唔到呢份簡報。

執行含義：
1. **語言維持「香港書面中文」**：繁體＋行內英文詞（prompt／workflow／agency）——呢個係 Carrie 把聲嘅一部分，唔使為接觸唔到嘅讀者中性化；唔出簡體版
2. 「營銷」照用（香港用法），台灣讀者睇得明，唔為單一詞分裂版本
3. **重要區分：大陸讀者 ≠ 大陸內容**——讀者係香港/台灣 marketer，但佢哋好多做緊大陸市場生意，所以 WeChat／小紅書／巨量引擎／中國 AI 監管呢啲 GC 內容線照跟，一啲都唔減——嗰個係內容 moat，唔係受眾問題
4. 將來如果分發渠道擴展（例如 WeChat 公眾號版），先重新檢視簡體需求

## 底部 section 改「問題」不「命令」（2026-07-22 Carrie feedback）

Carrie 指出原本「Don't curate news. Curate decisions.」下面三個 action（Build / Check / Write your…）**太強（命令句）＋唔關讀者事**（假設讀者係有客戶嘅 agency：top 3 clients／in a pitch／your team——但一半受眾係 in-house／細團隊）。

改法（永久生效）：
- 標題改「Three questions this week raises／本週值得思考的三個問題」
- 副題明講「Not a to-do list… whether you sit in an agency or on the brand side／無論你在 agency 還是品牌方」——修正受眾假設
- 三項由命令句改**問題句**（「Do you have…？」「How do…？」「Could your team…？」）＋一句中性 context——informational，唔說教，agency/品牌方都成立
- Label 由動詞（PREPARE/AUDIT/GOVERN）改名詞主題（AUDIENCE DATA／BRAND VISIBILITY／AI GOVERNANCE）；nav 由「Actions」改「Worth Asking／值得思考」

原則：呢個 section 係全站最後一個命令式殘留——同「網站唔用個人掛名觀點、informational 不說教」嘅定位對齊。以後底部永遠用問題形式。

## 中文避免翻譯腔（2026-07-22 Carrie feedback 後定立，永久生效）

Carrie 指出部分中文「唔夠 native」（例：「面對這些新廣告平台越來越倚重的 first-party 數據，你手上準備好了嗎？」）。根源係**照搬英文句構**。中文 editor 掃全站捉到 7 句，集中喺後加/重寫嘅段落。

寫中文時避開嘅翻譯腔 marker：
1. **長前置修飾語**（英文 relative clause 搬過嚟：「這些…越來越倚重的…數據」）→ 拆短，用 topic-comment，先講重點
2. **「面對…」「隨著…」「對於…而言」骨架** → 母語作者多數會刪
3. **被動 calque**（「正在被決定」）→ 改主動（「由這幾間公司拍板定案」）
4. **名詞化堆疊**（「…的準備」「…的提升」）→ 改動詞（「先把…準備好」）
5. **動賓搭配唔啱**（準備好+冇賓語、留下決策）→ 補返賓語或換講法
6. **英文詞直譯**（「一頁答案」= one-page answer）→ 「一份一頁紙的答覆」
**自測**：每句中文問「一個母語讀者會唔會咁講？」——起草後、以及任何後加/重寫段落，都要再過一次（翻譯腔最常喺趕住補寫嘅段落出現）。
