# Deployment Strategy — GitHub Testing → Vercel Production

## Current stage
Use **GitHub Pages only for development/UAT testing** while the app is still being rebuilt and visually validated.

## Development flow
1. Work on `chatgpt/feilawei-v20-golden-master`
2. Internal QA
3. Promote approved checkpoints to `gh-pages`
4. User tests the GitHub Pages URL on real iPhone / in-app browser
5. Log issues and iterate

## Production release
Do **not** move to Vercel until:
- all 8 screens pass visual QA
- functional flow is complete
- visited / exclude / anti-repeat logic is stable
- mobile Safari / in-app browser QA passes
- no Critical / Major QA issues remain
- final user UAT is approved

## Vercel migration checklist
- production branch/tag frozen
- environment/config reviewed
- cache/versioning reviewed
- canonical URL decided
- analytics/privacy settings reviewed if added
- production smoke test
- GitHub Pages remains as test/staging unless deliberately retired

## Rule
GitHub Pages = staging/test.
Vercel = final public production release.
