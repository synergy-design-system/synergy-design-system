# syn-prio-nav

## Summary

The `<syn-prio-nav />` element provides a generic navigation bar
that can be used to group multiple navigation items (usually horizontal `<syn-nav-item />`s)
together. It will automatically group all items not visible in the viewport into a custom
priority menu.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-prio-nav--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41227-206412)

## Class Information

- **Tag Name:** `syn-prio-nav`
- **Import Example:** `import SynPrioNav from '@synergy-design-system/components/components/prio-nav/prio-nav.js';`

## Usage Information

- **Status:** stable
- **Since:** 1.14.0

## Available Slots

- `(default)`: The given navigation items. Must be horizontal `<syn-nav-item>`s or have a role of "menuitem"

## Available CSS Parts

- `base`: The component's base wrapper.
- `priority-menu`: The wrapper around the priority menu
- `priority-menu-container`: The container for the shifted navigation items, if there is not enough space.
- `priority-menu-icon`: The icon for the priority menu
- `priority-menu-label`: The label for the priority menu
- `priority-menu-nav-item`: The navigation item for the priority menu

## Dependencies

- `syn-dropdown`
- `syn-icon`
- `syn-menu`
- `syn-nav-item`
