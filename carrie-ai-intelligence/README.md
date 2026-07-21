# Carrie AI Intelligence — Weekly Brief

> Helping marketers filter AI noise into business decisions.

每週 AI 簡報網頁（中英雙語），回應咗以下設計原則：

- **唔做 news，做 intelligence**：每則新聞都有 Summary → Why it matters → Carrie's Take → 行動訊號（🟢 Act now / 🟡 Watch / 🔴 Wait）→ 部分附 My Prediction
- **三分類 + 強烈 visual hierarchy**：🔥 MUST KNOW（紅）、⚡ PRODUCTIVITY（藍）、📈 MARKETING IMPACT（紫）
- **清晰來源**：每則新聞標題同 "Read original →" 按鈕都一 click 跳去原文
- **個人 IP**：hero 右邊 editor card + About 段，建立 trust
- **中英雙語**：右上角「中/EN」toggle，記住用戶選擇

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | Weekly brief 頁面（single file，無 dependencies） |
| `linkedin-post.md` | 配套 LinkedIn post 草稿（英文＋廣東話）＋每週模板 |
| `assets/carrie.jpg` | 你嘅 professional headshot（見下面） |

## 每週更新流程

1. 改 hero 嘅 Issue 號同日期（搜尋 `Issue 001`）
2. 改「This week's signal」嘅 quote 同一段解讀
3. 每個分類換 3 張 story card：複製現有 `<article class="story must/prod/mkt">` 結構，每張卡要齊：
   - Source badge + 日期（真實日期，唔好老作）
   - 標題連結去**原文** URL
   - Summary（約 100 字）/ Why it matters / Carrie's Take（en + zh 兩個 span 都要改）
   - 行動訊號：`signal act`（🟢）/ `signal watch`（🟡）/ `signal wait`（🔴）
   - 想加 prediction 就保留 `.predict` block，唔想就刪
4. 改底部三個 action（TEST / AUDIT / GOVERN 可以每週轉主題）
5. 用 `linkedin-post.md` 嘅模板寫當週 LinkedIn post

## 放 headshot

將一張正方形 professional headshot 放喺 `assets/carrie.jpg`。
未放相之前，網頁會自動顯示 "CH" monogram，唔會爛圖。

## Deploy 去 GitHub Pages

呢個 folder 係 self-contained，最簡單做法：

1. 開一個新 repo（例如 `carrie-ai-intelligence`），將 folder 內容放喺 root
2. Repo Settings → Pages → Source 揀 `main` branch `/` root
3. 網址會係 `https://carriehw.github.io/carrie-ai-intelligence/`

或者直接放入你現有 `ai-marketing-daily` repo 嘅 `/weekly/` folder，網址就係 `.../ai-marketing-daily/weekly/`。
