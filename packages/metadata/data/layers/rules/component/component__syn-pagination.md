# syn-pagination

## Summary

<syn-pagination /> provides page navigation, direct page input, and page-size selection for large data sets.

## Common Use Cases

- Navigate through table records across pages.
- Paginate long result lists in search and catalog pages.
- Control page size in data heavy admin views.

## Usage Guidelines

### Navigation

- Use pagination for large datasets where loading all records at once is not practical.
- Keep page size options meaningful for the context, such as 10, 25, and 50.
- Show current page and total pages so users understand position.

### Compact and Size Variants

- Use compact mode when horizontal space is limited.
- Use size variants consistently with nearby form controls.
- Avoid changing pagination density between sibling views without reason.

### Behavior

- Preserve current page when filters and sorting stay compatible with the dataset.
- Reset to page one when filter changes invalidate the current page.
- Disable controls only when navigation is not possible, such as first or last page boundaries.

## Accessibility

- Provide clear labels for pagination controls and page size selectors.
- Ensure keyboard users can reach and operate next, previous, and direct page input.
- Announce page changes and invalid page input clearly.

## Related Components

- syn-select
- syn-input
