# Week 3: UK bank holidays with routing and tests

The Week 2 bank holidays app, changed after a (fictional) client request: a short home page per region, a full list grouped by year, links that open a region directly, and automated tests with a CI check. Built with React and TypeScript. Part of my 16-week return to frontend development; see the [exercise index](../README.md).

**Live:** (add the Vercel link in step 8)

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`.

## Stack

React 19 · TypeScript · Vite · React Router · Vitest · React Testing Library · GitHub Actions · Vercel

## Routes

- `/` → `/england-and-wales`
- `/:region`: next holiday, the next three, date check
- `/:region/all`: all upcoming holidays, grouped by year
- anything else: not found

## Tests

- Unit: date state, relative days, grouping by year
- Component: date-check validation, full list by year, region select
- CI: lint, test and build run on every pull request that changes this folder

## What it practises

Custom hooks, lifting state, nested and layout routes, URL parameters as state, type predicates, unit and component testing, continuous integration, SPA deep links on Vercel.

## Decisions

- (write these at the end: what the hook owns, where the data lives and how pages get it, why region is in the URL, how invalid regions are handled, what is unit tested and what is component tested)

## What I'd do next

- (write at the end)

## AI use

Code written by me. Claude was used for code review, explanations and the HTML/CSS design that the page is built from.
