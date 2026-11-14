# Wind chill

Written by Gyandeep (@gyandeeprajpv-pixel). My part in OFFGRID: I added the wind chill functions and their tests to the project and wrote this document to explain them.

## The idea

On a high ridge or pass, wind makes the air feel much colder than the thermometer says. That "feels like" temperature is what matters for frostbite and for choosing what to wear. This feature calculates it.

## How it works

The code uses the standard wind chill formula from Environment Canada and the US National Weather Service. Examples:

- Air at −10 °C with a 20 km/h wind feels like about −18 °C.
- Air at 0 °C with a 10 km/h wind feels like about −3 °C.
- Air at −20 °C with a 40 km/h wind feels like about −34 °C.

The formula only applies when the air is 10 °C or colder and the wind is at least 4.8 km/h. Outside that range the wind does not change how cold it feels, so the code returns the plain air temperature. A second function says how many degrees colder the wind makes it feel.

## Where the code lives

- `packages/core/src/windChill.ts`: the functions (pure maths, works offline).
- `packages/core/test/windChill.test.ts`: automated tests that check the examples above.

## Limits

This is a tested building block. It does not appear on a screen yet; the team can connect it later, for example next to the weather forecast. It is for bare skin in an average person, so it is only a guide. Real conditions, clothing and wet weather change how cold you feel.

## What I worked on

I read through this document and the code files to understand what the feature does.

_Drafted with an AI assistant from the project's code, then checked and edited by Gyandeep._
