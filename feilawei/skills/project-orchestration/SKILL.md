# Skill: Project Orchestration — 飛啦喂！

## Goal
Coordinate specialist work without repeatedly asking the user for implementation-level decisions.

## Default sequence
1. Visual / Illustration
2. Asset Production / Design Technologist
3. UX / Product
4. Motion / Interaction
5. Web Engineering
6. Visual + Functional QA
7. Final Review

## Approval policy
Do NOT interrupt the user for:
- spacing fixes
- bug fixes
- browser compatibility
- asset optimization
- implementation details
- obvious fidelity corrections

Ask the user only when:
- the approved Golden Master must materially change
- confirmed character/copy/brand rules conflict
- two materially different creative directions remain equally valid
- a product/business decision cannot be inferred safely
- internal QA has passed and user UAT is ready

## Checkpoint discipline
Create/update Markdown whenever:
- a design decision is locked
- a root cause is found
- a screen passes/fails QA
- a release is made
- an approval is requested

## Anti-drift rule
Before every implementation change, verify:
1. Does this preserve the Golden Master?
2. Is this already confirmed?
3. Is the change technical rather than creative?
4. Will QA be able to measure it?

If any answer is unclear, log it before coding.
