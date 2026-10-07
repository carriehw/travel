# Screen 1 UX + Motion Spec — v20

## Screen purpose
首頁只做三件事：
1. 建立「飛啦喂！」品牌性格
2. 用極短時間解釋玩法：揀條件 → 揀盲盒 → 揭曉下一站
3. 令用戶想撳「開始飛啦」

## Primary action
**開始飛啦 ✈︎ → Screen 2（旅行類型）**

No secondary CTA on Screen 1.

## Reading order
1. 飛啦喂！／外星旅人・地球導遊
2. 想去邊？抽咗先算。
3. 小天線隊長 + LET'S GO
4. 三步玩法
5. 開始飛啦
6. You only live once, 人生得一次，仲等咩？飛啦喂！

## Tap behaviour
- Entire CTA pill is tappable.
- Minimum touch target 56px high.
- Single tap only; prevent accidental double navigation.
- Touch feedback must appear within 100ms.

## Motion
### On enter
0–250ms:
- Screen fades in, max 6px upward settle.
- No large scale-in effect.

### Mascot idle
- Vertical float: 0 → -4px → 0
- Duration: 2800ms
- Ease-in-out
- No limb deformation / no redraw.

### Decorative sparkle
- 2–3 stars only.
- Opacity 0.65 → 1 → 0.65
- Duration 1800–2600ms, staggered.
- Do not animate all decorations.

### Route
- Dashed route may use subtle dash-offset movement.
- Plane icon remains aligned to approved position.
- Do not move plane across the screen on idle state.

### CTA press
- scale 1 → 0.985 → 1
- 120–160ms
- retain shadow and approved colour

### Transition to Screen 2
- Screen 1 moves/fades out by 8–12px
- Screen 2 enters from right by 12–18px
- total <= 380ms

## Reduced motion
When prefers-reduced-motion:
- no mascot float
- no route dash animation
- no sparkle pulse
- simple 150ms fade between screens

## Short viewport behaviour
For in-app browsers with tall toolbars:
- never squash the artboard vertically
- keep artboard aspect ratio
- allow vertical scroll
- CTA remains in artwork position; do not make it sticky unless later approved
