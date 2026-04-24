# syn-pagination

## Summary

<syn-pagination /> provides page navigation, direct page input, and page-size selection for large data sets.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-pagination--docs)

## Class Information

- **Tag Name:** `syn-pagination`
- **Import Example:** `import SynPagination from '@synergy-design-system/components/components/pagination/pagination.js';`

## Usage Information

- **Status:** stable
- **Since:** 3.12.0

## Available Properties

### ariaLabel

attribute: `aria-label`
reflects: no
type: `string`
default: `'Pagination'`

An accessible label for the navigation landmark. Customize for multiple paginations on a page.

### currentPage

attribute: `current-page`
reflects: yes
type: `number`
default: `1`

The current page number. The default value is 1. The component will emit a `syn-pagination-page-changed` event whenever the page changes, allowing you to respond to page changes in your application.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

When true, the pagination controls are disabled and non-interactive.

### divider

attribute: `divider`
reflects: no
type: `boolean`
default: `false`

When true, a divider is displayed at the top of the pagination component.

### pageSize

attribute: `page-size`
reflects: yes
type: `number`
default: `25`

The number of items to display per page. The default value is 25. The component will emit a `syn-pagination-page-size-changed` event whenever the page size changes, allowing you to respond to page size changes in your application.

### pageSizeOptions

attribute: `page-size-options`
reflects: no
type: `number[]`
default: `[10, 25, 50, 100]`

An array of numbers representing the available options for the number of items to display per page. The default value is [10, 25, 50, 100]. The component will use this array to populate the rows-per-page selector, allowing users to choose from the specified options.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The size of the pagination controls.

### totalItems

attribute: `total-items`
reflects: yes
type: `number`
default: `0`

Total amount of items. The component will use this value to calculate the total number of pages based on the selected rows per page.

### variant

attribute: `variant`
reflects: yes
type: `'full' | 'compact'`
default: `'full'`

The pagination variant to use. The "full" variant includes comprehensive controls for navigating between pages and adjusting the number of displayed rows, while the "compact" variant offers a streamlined interface with essential navigation controls. The default value is "full".

## Available CSS Parts

- `base`: The component's base wrapper.
- `divider`: The divider element displayed at the top of the pagination component.
- `navigation`: The pagination navigation element.
- `navigation-action`: The individual navigation action buttons (first, previous, next, last).
- `page-input`: The page number input element.
- `page-input-section`: The section containing the page number input and total pages display.
- `page-item-summary`: The text element displaying the current page item range and total items.
- `page-size-select`: The page size select element.
- `page-size-select-wrapper`: The wrapper element containing the page size select and page item summary.

## Available Events

### syn-pagination-page-changed

type: `SynPaginationPageChangedEvent`

Emitted when the current page changes

### syn-pagination-page-size-changed

type: `SynPaginationPageSizeChangedEvent`

Emitted when the page size changes
