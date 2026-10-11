# 飛啦喂！v20 — Core Game Loop

## Product purpose
用一個似遊戲嘅方式，令一班人一齊決定下一個旅行目的地；核心價值係 **趣味性 + 參與感 + 驚喜感 + 真實可用嘅推薦結果**。

## Locked gameplay direction
採用以下核心組合：
1. **旅行特權卡**：Must-have / Veto / Wild Card
2. **神秘候選地淘汰賽**
3. **小天線隊長做 Game Master**

最終盲盒保留，但角色改為「高潮 / reveal」，唔再係整個遊戲唯一玩法。

---

## MVP Mode — Party Mode（單一裝置多人輪流）
### Why
最符合 cost / time effective 原則：
- 無需即時同步 backend
- 無需 room code / reconnect / live voting
- 可以先驗證玩法本身係咪真係好玩
- 之後先加 Room Mode

### Future Phase 2
Room Code 多人手機同步：
- 每人自己裝置揀卡 / 投票
- 即時同步候選地
- reconnect / leave / join
- host controls

---

# Core Loop

## Stage 0 — 開局
小天線隊長：
「今次邊班友仔一齊飛？🚀」

玩家輸入：
- 人數（2–6）
- 可選 nickname（可 skip）

目標：
建立「大家一齊玩」而唔係單人填問卷感。

---

## Stage 1 — 特權卡
每位玩家輪流獲得：

### 1. Must-have 卡
「今次旅行一定要有咩？」
例：
- 美食
- 自然景色
- Shopping
- 夜生活
- 溫泉
- 海灘
- 文化體驗
- Chill

### 2. Veto 卡
「今次最唔想要咩？」
例：
- 太凍
- 太熱
- 長途機
- 太貴
- 太多人
- 行程太趕
- 轉機
- 自駕

### 3. Wild Card
每局只出現 1–2 次，由小天線隊長隨機派：
例：
- 「想去一個你哋冇人去過嘅地方」
- 「今次要食到癲」
- 「接受多 2 個鐘機程，換更高驚喜度」
- 「Budget 可以鬆少少」

## 真實作用
- Must-have → recommendation score boost
- Veto → hard / strong penalty
- Wild Card → temporary modifier

不得出現「純裝飾卡」；每張卡都要真係改變推薦結果。

---

## Stage 2 — 小天線隊長配對
系統根據：
- travel type
- companion
- days
- distance
- budget
- region
- must-have
- veto
- visited
- excluded
- recent results
產生 6 個高匹配候選地。

小天線隊長唔直接講地名，只講：
「我搵到 6 個幾啱你哋嘅地方 👽」

---

## Stage 3 — 神秘候選地淘汰賽
顯示 6 個 Mystery Destinations，但隱藏地名。

每個候選只提供 3–4 條真實線索：
- 大約飛行時間
- 預算級別
- 天氣 / 氣候
- 代表體驗
- 一句小天線隊長提示

### Round 1
6 → 4
全隊淘汰 2 個。

### Round 2
揭多一條 clue。
4 → 3
再淘汰 1 個。

### Rule
被淘汰目的地唔再返生。
所有 clue 必須來自 destination metadata，唔可以 fake。

---

## Stage 4 — Final 3 Blind Boxes
最後 3 個候選轉化成 3 個盲盒。

玩家唔知道邊個盒對應邊個地方。

小天線隊長：
「剩返最後三個！今次真係睇你哋手氣啦 😏」

選中一個盒後鎖定，不可偷換 destination。

---

## Stage 5 — Reveal
3 → 2 → 1 countdown
盒子打開
顯示 destination

Reveal 需要：
- mascot reaction
- confetti
- destination image / postcard
- country / city
- result score optional

---

## Stage 6 — 點解係佢？
結果必須解釋：
「點解呢個地方啱你哋」

至少 3 個真實 reason：
- 幾多人揀咗某 Must-have
- 命中邊啲條件
- 冇觸犯邊啲 Veto
- Budget / days / distance match
- 未去過 / anti-repeat

小天線隊長 commentary 可以有 personality，但不可捏造玩家答案。

---

# Game Master Persona

小天線隊長唔再係裝飾 mascot，而係主持人。

## Responsibilities
- 開局
- 派 Wild Card
- 報告「有幾多人同意」
- 宣布候選地被淘汰
- 製造 suspense
- reveal
- result commentary

## Tone
香港廣東話、鬼馬、短句、唔幼稚、唔大陸腔、唔 AI 味。

---

# Anti-Fake-Game Principle
任何遊戲 mechanic 都必須影響真實推薦：
- 卡牌 → constraints / weights
- 淘汰 → candidate set
- clue → destination metadata
- 盲盒 → pre-assigned candidate
- result reason → actual answers

如果某 mechanic 只係動畫而唔改變結果，就唔屬於 core game mechanic。

---

# Cost / Time Guardrail
MVP 暫時唔做：
- real-time multiplayer
- accounts
- cloud save
- friend invite
- live chat
- leaderboard
- achievement system
- complex avatar system

優先把 Party Mode 做到「真係好玩 + 真係有用」。

