# Golden Master Acceptance Criteria

## Visual Fidelity Checklist
每頁逐項打勾：

- [ ] 背景底色一致
- [ ] 主要標題位置 / 比例一致
- [ ] 品牌字位置一致
- [ ] 小天線隊長造型完全一致
- [ ] 角色顏色完全一致
- [ ] 手數 / 腳數 / 天線數正確
- [ ] 所有 icon 與定稿一致
- [ ] 裝飾圖形與虛線位置一致
- [ ] CTA 尺寸 / 圓角 / shadow 一致
- [ ] 留白節奏一致
- [ ] 無 generic app-card 感
- [ ] 無低清放大
- [ ] 無 stretch / squeeze
- [ ] 無被 browser toolbar 意外 cut off

## Overlay Review
同一 viewport 產出：
1. Golden Master
2. Live Screenshot
3. 50% opacity overlay

### Pass
肉眼無明顯位移；主要物件偏差 <= 約 4px（390px 基準）或 <= 1% viewport width。

### Fail
以下任何一項即 Fail：
- 角色不同樣
- 標題換字型造成明顯差異
- artwork 被拉扯
- CTA / 選項撞位
- 大片異常留白
- 內容被 viewport 截走
- 素材壓縮至肉眼模糊

## Device Matrix
- 375px
- 390px
- 393px
- 430px

## Browser Matrix
- iOS Safari
- ChatGPT in-app browser
- Chrome mobile（secondary）

## Functional Gate
- [ ] 所有主要 CTA 可點
- [ ] 返回正常
- [ ] 選擇狀態清晰
- [ ] refresh 後不進入壞 state
- [ ] 無 console-breaking JS
- [ ] 盲盒可選
- [ ] reveal 完成會到 result
- [ ] save / reroll 可用
