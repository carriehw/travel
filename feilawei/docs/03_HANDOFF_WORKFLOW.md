# Handoff Workflow

## A. Visual → UX
Visual 提供：
- approved screen
- asset manifest
- fixed / flexible zones
- 不可改元素

UX 只可改：
- interaction logic
- microcopy
- error state
不得改 art direction。

## B. UX → Motion
UX 提供：
- trigger
- expected feedback
- state transition

Motion 定義：
- duration
- easing
- movement
- reduced-motion behaviour

## C. Visual + UX + Motion → Engineer
Engineer 需要收到：
- reference image
- coordinate spec
- asset source
- state map
- animation spec
- acceptance criteria

資料不齊，不應自行猜。

## D. Engineer → QA
每一頁提交：
- commit SHA
- live URL + cache version
- tested viewport
- known limitations

## E. QA → Product Lead
QA 結果只可為：
- PASS
- PASS WITH MINOR
- FAIL

FAIL 必須寫 issue，不可口頭略過。

## F. Product Lead → Next Screen
只有 PASS 才進下一頁。

## Checkpoint cadence
每完成以下任一事件更新 Markdown checkpoint：
- 一頁 visual pass
- 一個 major bug root-cause fixed
- 一次 UX flow decision
- 一次 release
- asset spec 有改動
