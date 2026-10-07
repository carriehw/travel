# Product State Model — MVP

## Core session state
```js
{
  travelType: null,
  companion: null,
  days: null,
  distance: null,
  budget: null,
  regionPreferences: [],
  concerns: [],
  visited: [],
  excluded: [],
  candidateDestinations: [],
  blindBoxes: [],
  selectedBoxId: null,
  revealedDestination: null,
  savedResults: [],
  recentResults: []
}
```

## Flow state
```
HOME
  ↓
TRAVEL_TYPE
  ↓
COMPANION
  ↓
TRIP_CONDITIONS
  ↓
CONCERNS
  ↓
VISITED_EXCLUDED
  ↓
MATCHING
  ↓
BLIND_BOXES
  ↓
REVEAL
  ↓
RESULT
```

## Back behaviour
- Back returns to previous question without clearing later answers immediately.
- If user changes an upstream answer, derived candidate destinations are invalidated and regenerated before blind boxes.
- Returning from blind boxes to filters preserves answers.

## Visited vs Excluded
### Visited
Places the user has already been.
Default behaviour:
- lower ranking heavily
- normally remove from the 12 boxes
- may be allowed again only via explicit future setting, not MVP

### Excluded
Places the user actively does not want to see.
Behaviour:
- hard exclude from candidate set

## Anti-repeat logic
Goal: avoid “same inputs → same 12 boxes every time”.

Rules:
1. Hard remove all `excluded`.
2. Remove `visited` from MVP recommendations.
3. Score destinations by fit.
4. Build a top-fit pool wider than 12.
5. Penalize destinations shown in recent sessions.
6. Penalize the most recently revealed destination strongly.
7. Randomize within close score bands.
8. Ensure category/region diversity where possible.
9. Only repeat a destination when the eligible pool is too small.
10. If repetition is unavoidable, prefer the least recently shown destination.

## Suggested repeat memory
- recentResults: last 10 revealed destinations
- recentlyShownBoxes: last 24 unique box destinations
- stored locally in localStorage for MVP

## Blind box rule
The user chooses the box; the destination should already be assigned before tapping.
Do not secretly change the destination after tap to manipulate result.

## Result explanation
Always explain at least 3 concrete match reasons using answers actually supplied by the user.
Never invent a preference.

Example reason dimensions:
- travel type
- flight distance
- budget
- travel days
- region preference
- companion
- concern / pace

## No-match state
If fewer than 6 credible destinations remain:
- do not fabricate destinations
- explain which constraints are too tight
- offer “放寬一個條件再抽”
- preserve the user's current answers
