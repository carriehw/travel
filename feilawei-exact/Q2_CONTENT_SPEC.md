# Q2 — Trip Length / Exact-Image Content Spec

Status: CONTENT LOCK FOR ART PRODUCTION
Source: Project Master + Destination Engine + latest 8-question flow.

## Role in logic
Q2 is a hard/practical filter. It must not affect Persona.

## Visible copy
Progress: 第 2 / 8 題
Kicker: 睇下今次有幾多時間
Headline: 今次大概有幾多日可以玩？
Support: 日數太短嘅話，我唔會亂叫你飛到好遠。
Helper: 唔使計得太精準，揀最接近就得。

## Options
1. 2–3 日 — 快閃小旅行
2. 3–5 日 — 最易安排
3. 6–8 日 — 可以去遠少少
4. 9 日以上 — 長假都得

## Logic values
- quick: 3
- short: 5
- medium: 8
- long: 14

## Interaction
- single select
- selection is stored only in state / matching logic
- visible selected state must be a separate approved full-screen artwork if the selection visibly changes
- Next goes to Q3 only after a valid selection
- Back goes to Q1

## Visual production constraints
- Match the approved Q1 visual family.
- Do not show a Persona character on question screens.
- Runtime must not draw any visible overlay.
- Traditional Chinese must be checked before approval.
- Final asset aspect ratio: 941×1672.
