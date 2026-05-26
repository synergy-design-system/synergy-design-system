# syn-tab-panel

## Summary

Tab panels are used inside [tab groups](/components/tab-group) to display tabbed content.

## Common Use Cases

- Display section content for settings tabs such as General, Security, and Notifications.
- Show contextual content areas in dashboards without navigating away from the current page.
- Present product details split into overview, specifications, and documentation sections.
- Render user-managed views paired with closable tabs in workspace-like interfaces.

## Usage Guidelines

### Structure and Mapping

- Use tab panels for related content sections that belong to the same workflow or information scope.
- Keep one active panel visible at a time and ensure inactive panels are not presented as primary content areas.
- Pair each panel with a unique name and keep naming consistent with corresponding tab panel attributes.

### Content Design

- Keep panel content focused and scannable; split dense content into subsections or supporting components.
- Use consistent spacing and hierarchy across panels so context switches feel predictable.
- Avoid large layout shifts between panels that can disorient users during navigation.

### Dynamic Content

- Use lazy loading or deferred rendering for heavy panel content when performance is a concern.
- Show clear loading or empty states when panel data is not immediately available.
- Do not remove active panel content without immediately providing a meaningful replacement.

## Accessibility

- Use syn-tab-panel only inside syn-tab-group and ensure each panel name matches exactly one syn-tab panel reference.
- Ensure panel content starts with clear, descriptive structure (for example headings) so users can quickly understand context after switching tabs.
- Avoid placing essential instructions only in inactive panels when users must complete tasks in sequence.
- When panel content updates dynamically, preserve user context and avoid unexpected focus jumps.

## Related Components

- syn-tab
- syn-tab-group
