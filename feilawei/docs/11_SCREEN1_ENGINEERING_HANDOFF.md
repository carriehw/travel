# Screen 1 engineering handoff — v20.2

Scope: Screen 1 only. No Screen 2 implementation or deployment.
Authority remains the Golden Master, production docs and local skills.

## Production entry

`index.html` loads only `screen1.css`, `screen1.js` and
`assets/v20/screen01_manifest.json`. It no longer imports v19 styling, matching
logic or later-screen screenshot UI.

`prototype-v19.html` is an exact archival copy of the pre-continuation HTML,
including its unfinished v20 home scaffold and the v19 later-screen prototype.
`app.js`, `style.css` and legacy artwork remain unchanged for technical reference.
Do not present this archive as a production design candidate.

## Geometry correction

The old scaffold used 390×824 although the coordinate spec states 390×788.4.
At 390px, its resting CTA top was approximately 680.6px rather than 651.1px,
about **29.5px too low**; entry animation could add another few pixels.

The new artboard uses 390×788.4 and scales as one coordinate system. The CTA
uses the measured 33.9 / 651.1 / 333.5 / 83.7 box. It scales to 430px maximum,
centres on wider viewports, and scrolls vertically on short viewports.
Safe-area padding is outside the artboard. No height-based stretching.

See [asset contract](../assets/v20/assets_manifest.md) for the documented
0.487px reference/engineering rounding difference.

## Artwork loading

- Validate complete layer set and exact artboard before issuing image requests.
- Reject unapproved/missing layers, full-page raster, corrupt image decoding and
  insufficient Retina resolution.
- Require every supplied layer's source provenance and SHA-256 before requests.
- Hash the fetched bytes, then decode that exact response through a temporary
  Blob URL. Changed bytes fail before any artwork or active CTA is published.
- Decode all layers off-DOM, then publish together; one failed layer rolls back
  the complete artwork.
- Missing production artwork leaves `data-asset-status="blocked"` and CTA disabled.
- Diagnostics are exposed through `window.feilaweiScreen1.getStatus()` for QA.
  They are not product copy or an alternative visual design.
- The initial blocked view is intentionally **not releaseable**. It must never
  be promoted as a functioning homepage.

Asset source review also requires per-file SHA-256, provenance, matching
viewBox/aspect, transparency, no SVG font dependency, and exact visual identity.
Passing asset validation is only readiness for visual QA.

## Accessibility and motion

Reading order: brand/subtitle → hero → three steps → CTA → locked slogan.
Artwork is decorative to assistive technology; the button supplies its semantic
label and a keyboard focus ring. No browser font is used as display artwork.

Approved motion is prepared for real layers: 250ms/6px entry, 2800ms/4px mascot
float, 140ms/.985 CTA press, 350ms double-activation guard. Reduced motion removes
float and press scaling and uses a 150ms fade.

Sparkles and route-dash animation remain pending separate approved vector paths.
Their positions cannot be guessed from a missing reference.

## Start interaction contract

An asset-ready CTA emits one cancellable, bubbling `feilawei:start` event:

```js
{ nextScreen: "travelType" }
```

A future flow controller consumes it with `preventDefault()`, which starts the
approved 300ms/10px exit motion. The event is covered by synthetic engineering
fixtures. No travel-type screen or replacement product flow is implemented here.
Actual navigation is pending the later flow controller after the Screen 1 gate.

## Quality gate

Use [internal QA tools](../qa/README.md). Engineering checks and visual verdict
are separate. Synthetic rectangles never count as visual evidence.

The canonical reference and confirmed character sheet are recovered and hashed;
see [source recovery](12_SCREEN1_SOURCE_RECOVERY.md). All eleven production
layers remain absent. Native source resolution and footer clipping remain open.
Visual QA remains **FAIL**. No user UAT request, no `gh-pages` promotion and no
Vercel deployment until the required gate passes.
