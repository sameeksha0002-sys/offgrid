# Walking time estimate

Written by SHRISTI (@[ranjanshristi021-bot]). My part in OFFGRID: Frontend developer(UI and UX).

## The idea

When a traveller looks at a trek in OFFGRID, they can see the distance and the climb, but not how long it will take. The plan page now shows a rough walking time, so people can choose a start time and aim to finish before dark.

## How the time is worked out

We use Naismith's rule, a classic hill-walking formula:

- 5 km an hour on the flat.
- Plus 1 hour for every 600 m climbed.

For example, Triund is 18 km with 1,100 m of climbing. That is 3.6 hours for the distance plus about 1.8 hours for the climb, so the card shows about 5 h 25 min. Times are rounded to the nearest 5 minutes so they do not look falsely exact.

## What the traveller sees

A "Walking time" card on the plan page with two numbers: the whole trek, and the average per trekking day. The card is hidden for places with no walking, such as Bir-Billing. It also says that breaks, altitude, snow and heavy packs will slow you down.

## Where the code lives

- `packages/core/src/trekTime.ts`: the calculation (pure functions, no network needed, so it works offline).
- `packages/core/test/trekTime.test.ts`: automated tests for the calculation.
- `apps/web/src/features/planner/TrekTimeCard.tsx`: the card on the screen.
- `apps/web/src/features/planner/PlanView.tsx`: shows the card on the plan page.

## Limits

This is a rough guide, not a promise. It uses the whole trek's distance and climb from our data, and it assumes an average walker. It is not safety advice, and people should always check the weather and local conditions.

## What I worked on

_Drafted with an AI assistant from the project's code, then checked and edited by Shristi._
