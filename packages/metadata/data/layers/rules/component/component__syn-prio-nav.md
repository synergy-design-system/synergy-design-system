# syn-prio-nav

## Summary

The `<syn-prio-nav />` element provides a generic navigation bar
that can be used to group multiple navigation items (usually horizontal `<syn-nav-item />`s)
together. It will automatically group all items not visible in the viewport into a custom
priority menu.

## Common Use Cases

- Primary horizontal navigation with overflow handling.
- App headers that must adapt to changing viewport widths.
- Section navigation where top destinations should stay visible.

## Usage Guidelines

### Priority Handling

- Place the most important destinations first so they stay visible longer.
- Move lower priority items into overflow menus when space is limited.
- Review priority order regularly as product usage evolves.

### Labels and Structure

- Keep labels short and distinct to prevent truncation and ambiguity.
- Avoid deep nesting in top level priority navigation.
- Use predictable ordering patterns such as task or category order.

### Responsive Behavior

- Test behavior at common breakpoints to ensure overflow remains usable.
- Ensure menu fallback remains discoverable on narrow viewports.
- Keep interaction patterns consistent between desktop and mobile.

## Accessibility

- Ensure navigation items are keyboard reachable and ordered logically.
- Use clear labels that reflect destination and not internal naming.
- Communicate current location with proper active state semantics.

## Related Components

- syn-nav-item
- syn-menu
- syn-menu-item
- syn-header
