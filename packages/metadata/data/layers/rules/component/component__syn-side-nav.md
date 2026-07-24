# syn-side-nav

## Summary

The <syn-side-nav /> element contains secondary navigation and fits below the header.
It can be used to group multiple navigation items (<syn-nav-item />s) together.

## Common Use Cases

- Secondary navigation beneath a primary header.
- Section navigation in management and admin applications.
- Persistent workspace navigation for desktop oriented layouts.

## Usage Guidelines

### Navigation Structure

- Use side navigation for secondary or section level navigation.
- Organize items into clear groups with consistent naming patterns.
- Avoid deeply nested structures that are hard to scan and maintain.

### Layout Variants

- Use sticky mode when navigation should remain visible during page scroll.
- Use fixed mode only when it does not block core page content.
- Use rail mode for compact icon first navigation with strong icon semantics.

### Interaction

- Use indentation consistently to reflect hierarchy.
- Provide footer actions only for secondary utilities and account controls.
- Ensure collapse and expand behavior is predictable across breakpoints.

## Accessibility

- Provide clear navigation labels and preserve logical focus order.
- Ensure current location is communicated for active items and sections.
- Keep rail and collapsed states keyboard operable and understandable.

## Related Components

- syn-nav-item
- syn-header

## Related Templates

- AppShell
