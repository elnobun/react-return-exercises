# Week 1: Product list

A searchable, filterable and sortable list of products built with React and TypeScript. Part of my 16-week return to frontend development; see the [exercise index](../README.md).

## Run it

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`.

## Stack

React 19 · TypeScript · Vite 8 · ESLint

## Features

- Search by product title (case-insensitive, ignores spaces before and after)
- Filter by category; the category list is built from the data
- "In stock only" filter
- Sort by price, low to high or high to low
- Search, filters and sort all work together
- Results count ("Showing X of Y products"), announced to screen readers when it changes
- Message when no products match
- "Out of stock" badge on products with no stock
- Prices shown in GBP
- Every control has a visible label; everything works with the keyboard alone

## What it practises

Splitting a UI into components, typed props, lifting state to a parent, passing changes up through callback props, controlled form inputs, deriving data during render, list keys.

## Decisions

- **Only the inputs are state.** The search text, category, sort option and in-stock checkbox are the only state. The filtered and sorted lists are worked out during render from those values and the products, so they always match the inputs and there is no second copy to keep in sync.
- **One component owns the state.** `ProductsPage` holds the state and does the filtering and sorting. `Search` shows the controls and reports changes through callback props. `ProductList` and `ProductCard` only display what they receive.
- **Sorting works on a copy.** `Array.prototype.sort()` changes the array it is called on, so the filtered list is copied before sorting.
- **`string` for categories, a union for the sort option.** Categories come from the data, and in Week 2 from an API, so a fixed list of values in the type could go out of date without any error. The sort options are defined in my own code, so a union type lets TypeScript catch typos.
- **One rule for stock.** `isInStock()` is used by both the filter and the badge, so "in stock" is defined in one place.
- **The count line is always on the page.** Only its text changes. A live region that is removed and added again is not announced reliably by screen readers.
- **Static data in the shape of the API.** The products are copied from DummyJSON into a local file, keeping the API's field names (`title`, not `name`), so the type still fits when the data is fetched in Week 2.

## What I'd do next

- Move the filter and sort logic into a function of its own and add unit tests for it.
- Fetch the products from the API, with loading and error states.
- Keep the search, filter and sort values in the URL, so a filtered view can be shared or bookmarked.

## AI use

Code written by me. Claude was used for code review, explanations, the HTML/CSS design that the page is built from.
