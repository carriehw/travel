# v20 Screen Flow + Golden Master Mapping

## Goal
保留已確認 Golden Master 的視覺，新增玩法時不重畫、不破壞既有定稿。

## Locked principle
- 已有 Golden Master screen = 100% 視覺定稿
- 新增 gameplay screen = 只能沿用同一 design system，不可改寫原有 Golden Master
- 能用現有 screen 就不新增；真的需要新 interaction 才新增

---

## Existing Golden Master screens

### GM-01 Home
用途：
- 品牌建立
- 三步玩法
- CTA 開始飛啦

狀態：
- 視覺完全鎖定
- 功能：Start

---

### GM-02 Travel Type
用途：
- 快速揀旅行 vibe

改善方式：
- 保留原畫面
- interaction 改為更 game-like tap feedback
- 可由小天線隊長用一句短語主持

---

### GM-03 Companion
用途：
- 同邊個一齊去

改善方式：
- 保留原畫面
- 如果選「朋友 / 家庭」，後續進入 Party Mode setup
- 如果選「自己一個 / 情侶」，仍可用同一玩法，但 player count 簡化

---

### GM-04 Trip Conditions
用途：
- 日數 / 距離 / budget / region

改善方式：
- 視覺不改
- 只優化 state / selection logic
- 不新增問卷感

---

### NEW-01 Party Setup
只在多人情境出現。

內容：
- 幾多人玩
- 可選 nickname
- 一部手機輪流

設計：
- 沿用 cream background / pastel blobs / mascot / handwritten headline
- 不可用 generic cards
- 只做一個主要 action

---

### NEW-02 Player Privilege Cards
每位玩家輪流：
- 1 Must-have
- 1 Veto
- Wild Card 由小天線隊長控制

設計：
- 真正「卡牌」感
- 一次只聚焦一位玩家
- 卡面內容大、簡單、好撳
- 小天線隊長主持

---

### GM-05 Visited / Excluded
用途：
- 已去過
- 唔想要

視覺：
- 保留 Golden Master

邏輯：
- visited = MVP 排除
- excluded = hard exclude

---

### NEW-03 Mystery Match
小天線隊長：
「我搵到 6 個幾啱你哋嘅地方 👽」

作用：
- loading / suspense
- 產生 6 個真實候選

---

### NEW-04 Mystery Elimination — Round 1
6 個神秘候選
每個只顯示：
- 飛行時間
- budget band
- 一個體驗 clue

玩家淘汰 2 個：
6 → 4

---

### NEW-05 Mystery Elimination — Round 2
剩低 4 個
每個再揭多一條 clue

玩家淘汰 1 個：
4 → 3

---

### GM-06 12 Blind Boxes
**保留 12-box Golden Master，完全不改成 3 boxes。**

玩法：
- final 3 destinations 已鎖定
- 12 boxes 預先映射到 3 destinations
- 每個 destination 對應 4 boxes
- mapping 在玩家 tap 之前完成
- tap 後不可更改

目的：
同時保留 Golden Master + blind-box luck + final 3 logic。

---

### GM-07 Reveal
用途：
- countdown
- mascot
- confetti
- reveal

視覺：
- 100% 跟 Golden Master

---

### GM-08 Result
用途：
- destination
- 3+ 真實 match reasons
- save / replay

小天線隊長 commentary：
可有 personality，但一定以玩家真實答案為基礎。

---

# Cost-effective MVP boundary

## Phase 1
- 單一裝置 Party Mode
- local state
- localStorage
- no login
- no backend
- no room code
- no real-time sync

## Phase 2
多人手機 Room Mode：
- host
- room code
- live vote
- reconnect
- shared state

Phase 2 只在 Phase 1 gameplay 驗證好玩之後先做。

---

# Workflow consequence
由今日起，工程不再直接從「Golden Master screenshot → code」。

正確順序：
1. Product mechanic spec
2. Screen mapping
3. Visual spec
4. Asset production
5. Engineer implementation
6. Overlay QA
7. Functional QA
8. User UAT

任何 screen 未有前 3 項，不可開 code。
