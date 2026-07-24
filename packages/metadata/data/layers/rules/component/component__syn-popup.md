# syn-popup

## Summary

Popup is a utility that lets you declaratively anchor "popup" containers to another element.

## Common Use Cases

- Anchor floating menus to trigger controls.
- Display contextual information near data points.
- Implement custom positioned overlays in advanced layouts.

## Usage Guidelines

### Placement

- Choose placements that keep popup content near the trigger and inside the viewport.
- Use distance and skidding to fine tune alignment in complex layouts.
- Use arrows when they help users relate popup content to its anchor.

### Activation and Lifecycle

- Use explicit activation logic for interactive popups and dismiss on outside interaction.
- Handle flip and shift options to avoid clipping in constrained containers.
- Prefer stable anchor elements and verify behavior when anchors resize.

### Content and Scope

- Keep popup content focused and short for quick understanding.
- Avoid placing long workflows inside simple popup containers.
- Use dialog or drawer for complex multi-step interactions.

## Accessibility

- Ensure popup content remains reachable by keyboard when interactive elements are present.
- Do not hide critical information in popups that are hard to trigger on touch devices.
- Use clear trigger affordances so users understand where popup content comes from.

## Related Components

- syn-dropdown
- syn-tooltip
