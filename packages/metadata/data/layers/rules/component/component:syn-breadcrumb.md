# syn-breadcrumb

## Summary

Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.

## Common Use Cases

- Clarify user location within the website or app hierarchy, improving orientation.
- Allow easy navigation back to previous pages or higher-level sections.
- Enhance discoverability by displaying category paths or product hierarchy levels.
- Simplify backtracking from filtered or search result pages to broader content areas.

## Usage Guidelines

### Background

- Use light background options like white, neutral-100 or primary-100.

### Content and Labeling

- Use clear and descriptive labels that accurately represent each page or section in the navigation path.
- Keep breadcrumb trails short and easy to read to avoid overwhelming users.
- The final breadcrumb item should be non-clickable, as it represents the current page or location.

### Placement and Consistency

- Ensure breadcrumbs are placed consistently across pages to align with user expectations.
- Use breadcrumbs primarily in structured, multi-level navigation contexts. Avoid implementing them for non-hierarchical or dynamically generated paths, where they may confuse rather than assist users.

### Responsiveness

- On mobile devices breadcrumb must be shortened to only provide a link to the higher-level page.

## Accessibility

- Dynamically update breadcrumbs and announce changes with aria-live for screen readers.
- Provide clear labels for breadcrumb items to ensure screen readers convey the navigation path effectively.

## Related Components

- syn-breadcrumb-item

## Related Templates

- AppShell
- Breadcrumb
