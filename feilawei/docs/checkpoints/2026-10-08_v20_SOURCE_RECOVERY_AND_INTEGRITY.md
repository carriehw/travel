# Checkpoint — 2026-10-08 — Screen 1 source recovery + integrity

## Decision

**Screen 1 visual QA = FAIL; engineering QA = PASS.** Continue Screen 1 only.
No Screen 2 work, GitHub Pages promotion or Vercel deployment.

The missing-source investigation is substantially resolved: the user-provided
shared conversation supplied the approved originals. Actual production exports
remain blocked by native-resolution limits and a clipped reference footer.

## Revision and evidence

- Branch: `chatgpt/feilawei-v20-golden-master`.
- Starting commit: `e48bb607aeadab2a7389ef18b4555590f0dc3e5f`.
- Runtime/cache version: **20.2**.
- Tested file hashes: [implementation.json](../qa/2026-10-08_integrity/implementation.json).
- [Source recovery review](../12_SCREEN1_SOURCE_RECOVERY.md).
- [Reference / Live / 50% Overlay](../qa/2026-10-08_integrity/index.html).
- [Source crop and resolution review](../qa/2026-10-08_integrity/source-review.html).
- Coordination issues: #5, #8, #9, #11.

The handoff, referenced production docs and seven local skills were read before
changes. Source conversation content was treated as project evidence; it did not
override the current user rules or authorize any new design.

## Source recovery completed

Fetched all reachable `chatgpt/*` project branches and `gh-pages` and inspected
51 unique image blobs, including 17 non-QA legacy images. None supplied the
canonical source or native Retina layers. The legacy mascot and recovery JPEGs
remain corrupt; readable older home WebPs remain low resolution and cropped.
[Repository source search](../qa/2026-10-08_integrity/repository-source-search.json).

The supplied shared conversation yielded:

- unchanged approved six-screen master, 1024×1536;
- unchanged confirmed character-sheet revision, 1122×1402;
- the exact historical home crop recipe `(7,38,352,735)`.

Restored the 345×697 home crop without resampling or RGB pixel changes. The new
PNG encoding is explicitly recorded. All three sources are hashed; source and
approval message IDs are retained in the provenance file. Full source decoding
and crop pixel equality pass.

No mascot redraw, recolouring, alternative pose or production upscaling occurred.
The earlier pre-revision character sheet and private conversation transcript
were not committed.

## Engineering completed

The browser previously checked the asset contract and dimensions but did not
verify the supplied layer hashes. v20.2 now:

1. rejects missing layer SHA-256/provenance before requesting artwork;
2. hashes each fetched response and rejects changed bytes;
3. decodes that same verified response through a temporary Blob URL;
4. publishes the complete scene only after all layers pass.

There is no second image request between verification and rendering. Synthetic
fixtures confirm the image remains drawable after URL revocation. A changed
title with the same dimensions leaves the entire scene empty and CTA disabled.

The source validator also checks all recovered source hashes, dimensions and
the exact original-to-reference crop. Source verification is separate from
production readiness.

## QA results

Chromium and WebKit 26.0, Playwright 1.57.0, four widths in each engine, DPR 3:
**22 engineering checks passed; zero failures.** Geometry remains 390×788.4,
with no horizontal overflow and the bottom reachable on a 568px viewport.
The prior geometry, input, reduced-motion, refresh and atomic rollback checks
still pass. New changed-byte and metadata-rejection checks pass in both engines.

The earlier one-pixel SVG paint probe encountered edge antialiasing in Chromium.
The probe now reads an interior pixel and passes in both engines; no product
artwork was modified to accommodate the test.

The Reference slot now uses the **verified canonical source**, replacing the
older unverified diagnostic input for this evidence set. Eight Reference / Live /
50% Overlay sets were regenerated. Live is the real blocked scene; synthetic
fixtures are excluded. This remains a visual **FAIL**, not a 95% match claim.
Both evidence viewers load all images without page errors; the overlay starts
at 50% and its opacity control works. Source previews include the proposed
footer crop at 430px. [Viewer check](../qa/2026-10-08_integrity/viewer-check.json).

Asset validation exits 1 with twelve expected readiness findings: missing
technical sign-off and eleven absent production layers. Its recovered-source
subreport is verified, with pixel equality confirmed.

## Visual findings

| Finding | Severity | Status / action |
|---|---|---|
| S1-001: production artwork absent; home unusable | Critical | OPEN; complete exact production exports |
| S1-002: canonical reference absent | Major | RESOLVED; recovered, hashed and source crop verified |
| S1-003: old 824px geometry misplaced CTA | Major | FIXED; current locked geometry still passes |
| S1-004: legacy/full-page screenshot dependencies | Major | FIXED architecture; no such resources loaded |
| S1-005: recorded canonical crop cuts the bottom slogan | Major | OPEN; complete-footer proposal prepared, not integrated |
| S1-006: native hero/source regions below Retina minimum | Major | OPEN; higher-resolution approved source or explicit quality decision needed |

The 360×380 raw character region and older 324×330 candidate are below the
459×489 minimum at 430px. The prior 654×716 “@2x” export was enlarged from
327×358 and cannot count as native Retina detail.

The complete-footer proposal uses crop `(7,38,352,750)`, extending only the
bottom by 15px. It would change the reference to 345×712 and proportional base
height to 804.87px. It is review evidence only; reference and production geometry
remain locked to the existing spec pending resolution.

## Remaining work

Resolve source quality and footer reference, then export and integrate exact
layers. Validate character anatomy, pose, colour, lettering, alpha and sharpness,
and rerun actual overlay review at all four widths. Clear every Critical/Major
visual issue before staging.

Real iOS Safari and ChatGPT in-app UAT remain unrun. Desktop WebKit does not
replace device sign-off. GitHub Pages stays staging/UAT only; Vercel remains
reserved for final production after all screens and final UAT.
