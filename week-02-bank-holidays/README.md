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

Fetching in an effect, effect cleanup, modelling loading/error/loaded state in TypeScript, typing API data, a controlled select, an uncontrolled form read with FormData, and validation, date handling in pure functions, deploying to Vercel.

## Decisions

- **State shape: two discriminated unions:** I modelled both the network request and date-checker outcome as TypeScript discriminated unions `BankHolidayState` and `DateState` rather than separate boolean flags like `isLoading`, `isError`, `isHoliday`. Using a single `status` follows the principle of Avoiding contradiction in state, which makes state more predictable. For instance, the UI can never show a holiday result while the fetch is still loading or displaying an `Enter a date` validation error alongside a valid match. 
- **Effect cleanup with AbortController:** Inside `useEffect()`, I created a new instance of the `AbortController` and passed its `signal` to fetch. If the component unmounts or the user clicks `Try again`, the cleanup function aborts the previous request, and guards the `setState` with `!signal.aborted`, preventing responses from overwriting newer state or triggering state updates after unmount. In development, StrictMode runs the effect twice, so the first request is aborted on every page reload.
- **Storing the submitted date rather than the result:** Instead of saving the evaluated `DateState` in `useState`, I stored only the raw `submittedDate (string | null)` and derive `DateState` during render from the `submittedDate` and `region`. This avoids redundant state. If the user checks a date for Scotland and then switches the region to England and Wales, the result automatically recalculates for the new region, rather than stale result for the previous region.
- **How dates are compared:** Both `<input type="date">` and the GOV.UK API use `YYYY-MM-DD` strings which is safe for comparison because they sort the same way as the dates they represnt. I compare dates lexicographically with ===, >, and >=. To get the years, I used the `.slice(0, 4)` method, rather than parsing into Date object. Dates are formatted in UTC, so British Summer Time can't shift a date by a day.
- **Sorting assumption:** Finding the next upcoming holiday with `.find()` assumes the region's events array is ordered chronologically from earliest to latest. Rather than relying on the API response always arriving pre-sorted, I sort a shallow copy of the region's events using `a.date.localeCompare(b.date)` before filtering or searching so the first match is guaranteed to be the nearest holiday.

## What I'd do next

- Make the region survive a page reload by keeping it in the URL query string.
- Add unit tests for `getDateState()`, which is pure function.
- Checking the API data at runtime, because the `response.json()` annotation is unchecked.

## AI use

Code written by me. Claude was used for code review, explanations and the HTML/CSS design that the page is built from.
