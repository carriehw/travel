# Carrie AI Intelligence — Weekly Brief

> Helping marketers filter AI noise into business decisions.

每週 AI 簡報網頁（中英雙語），設計原則：

- **唔做 news，做 intelligence**：每則新聞有 Key Highlights（2–3 粒 bullet，事實＋重要性融埋）→ Industry Insight（中性行文，**冇個人掛名觀點**）→ 行動訊號（🟢 Act now / 🟡 Watch / 🔴 Wait）→ 部分附 Pattern Watch（有實據 pattern）
- **三分類 + 強烈 visual hierarchy**：🔥 MUST KNOW（紅）、⚡ PRODUCTIVITY（藍）、📈 MARKETING IMPACT（紫）
- **清晰來源**：每則新聞標題同 "Read original →" 按鈕都一 click 跳去原文
- **個人 IP**：hero 右邊 editor card + About 段，建立 trust
- **中英雙語**：右上角「中/EN」toggle，記住用戶選擇；hero 中文標題「看懂 AI，不必看盡 AI」係固定刊頭語

> 完整出刊 SOP 見 `WORKFLOW.md`；累積規則同教訓見 `LEARNINGS.md`。呢兩份係每期出刊嘅單一事實來源。

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | Weekly brief 頁面（single file，無 dependencies） |
| `linkedin-post.md` | 配套 LinkedIn post（英文＋書面中文）＋first comment＋每週模板＋出街應對小抄 |
| `WORKFLOW.md` / `LEARNINGS.md` | 出刊 SOP／累積規則（每期開工前必讀） |
| `assets/carrie.jpg` | Professional headshot（800×800） |
| `assets/covers/` | 當期 LinkedIn 頭圖（全英文）＋ `cover-template.html` ＋ newsletter logo |

## 每週更新流程

1. 改 hero 嘅 Issue 號同日期（搜尋 `Issue 001`）；hero 中英標題固定，唔使改
2. 改「This week's signal」嘅 quote 同一段解讀
3. 每個分類換 story card（全期 9–10 則）：複製現有 `<article class="story must/prod/mkt">` 結構，每張卡要齊：
   - Source badge + 日期（真實日期＋有來源，唔好老作）
   - 標題連結去**原文** URL（badge 要對得上 link 域名）
   - Key Highlights（`<ul class="kh">` 2–3 粒 bullet）/ Industry Insight（中性行文，冇「我」）——en + zh 兩個 span 都要改
   - 行動訊號：`signal act`（🟢）/ `signal watch`（🟡）/ `signal wait`（🔴），每期 🟢 唔超過 3 個
   - 有實據 pattern 就保留 `.predict` block（label「Pattern Watch／趨勢觀察」），冇就刪
4. 改底部「本週值得思考的三個問題」（問題形式，唔用命令句；對 agency 同品牌方都成立，主題每期轉）
5. 用 `cover-template.html` 生成當期全英文頭圖
6. 用 `linkedin-post.md` 嘅模板寫當週 LinkedIn post

## Headshot

已放咗喺 `assets/carrie.jpg`（800×800，以面部為中心裁切）。想換相就直接覆蓋呢個檔案。

## Follow / Subscribe 連結

Nav 同 About 嘅按鈕暫時叫「Follow for weekly issues / 追蹤每週更新」，指去 LinkedIn profile（未有 newsletter 前唔可以叫 Subscribe——訂閱唔到嘅 Subscribe 掣係信譽炸彈）。
開通 LinkedIn Newsletter 之後：search `Subscribe:` 註釋，兩個連結換成 newsletter URL，文字改返「Subscribe / 訂閱」。

## Deploy 去 GitHub Pages（已揀：新 repo）

網站已 push 去 `carriehw/carrie-ai-intelligence` repo。啟用 Pages 只需一步：

1. 去 https://github.com/carriehw/carrie-ai-intelligence/settings/pages
2. Source 揀 **Deploy from a branch** → Branch 揀 `main` / `(root)` → Save
3. 一兩分鐘後網址就會生效：`https://carriehw.github.io/carrie-ai-intelligence/`

之後每週更新：改完 `index.html` push 上 `main`，Pages 會自動重新 deploy。
