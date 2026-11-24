# Week 2: UK bank holidays

Shows upcoming UK bank holidays for a chosen region and checks whether a date is a bank holiday, using the GOV.UK bank holidays data. Built with React and TypeScript. Part of my 16-week return to frontend development; see the [exercise index](../README.md).

**Live:** (add the Vercel link in step 6)

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`.

## Stack

React 19 · TypeScript · Vite · ESLint · Vercel

## Data

[GOV.UK bank holidays JSON](https://www.gov.uk/bank-holidays.json): England and Wales, Scotland, Northern Ireland. No API key needed.

## Features

- Loading and error states, with a "Try again" button
- Region select
- Next bank holiday, with the number of days until it
- Upcoming bank holidays, with substitute days marked
- "Is it a bank holiday?" date check, with validation and three results: yes, no (with the next one), or outside the data's range
- Results announced to screen readers; works with the keyboard alone

## What it practises

Fetching in an effect, effect cleanup, modelling loading/error/loaded state in TypeScript, typing API data, controlled forms and validation, date handling in pure functions, deploying to Vercel.

## Decisions

- (write these at the end: how state is modelled, how the effect cleans up, how dates are compared, what is derived and what is state)

## What I'd do next

- (write at the end)

## AI use

Code written by me. Claude was used for code review, explanations and the HTML/CSS design that the page is built from.
