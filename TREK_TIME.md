# Trek time estimate

Written by Sameeksha @sameeksha0002-sys. My part in OFFGRID: back-end development and features addition.

## The idea

Planning a trek starts with one question: how long will it take? Walking time depends on distance and also on how much you climb. A well-known rule of thumb, Naismith's rule, allows 1 hour for every 5 km walked, plus 1 extra hour for every 600 m of climbing. This feature does that sum so the app can show a sensible walking time and check it against daylight.

## How it works

- The walking time in hours is distance divided by 5, plus total climb in metres divided by 600, rounded to the nearest quarter of an hour. For example, 10 km with 600 m of climbing takes 3 hours, and 6 km with 300 m of climbing takes 1.75 hours.
- A second function turns hours into text people can read. For example, 1.75 hours becomes "1 h 45 min" and 3 hours becomes "3 h".
- A third says whether the walk fits in the daylight with a safety buffer (1 hour by default). A 9-hour walk fits in 10 hours of daylight with the 1-hour buffer, and a 9.5-hour walk does not.

Bad inputs, such as a negative distance, give a clear error.

## Where the code lives

- `packages/core/src/trekTime.ts`: the functions (pure maths, works offline).
- `packages/core/test/trekTime.test.ts`: automated tests that check the examples above.

## Limits

This is a tested building block. It does not appear on a screen yet; the team can connect it later, for example next to the itinerary. Naismith's rule is a general rule of thumb for a fit walker on a normal path. Rest stops, heavy packs, snow, altitude and slow groups all add time, so treat the result as a starting point, not a promise.
