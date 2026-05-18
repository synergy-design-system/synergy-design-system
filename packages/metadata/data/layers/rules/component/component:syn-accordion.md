# syn-accordion

## Summary

Accordions provide the ability to group a list of `<syn-details>`.

## Common Use Cases

- Organise content into collapsible sections to save space.
- Display FAQs where each question can be expanded to reveal its answer.
- Structure lengthy content into manageable expandable sections.
- Create navigational menus where each section can be expanded to show sub-items, mainly for small viewports.

## Usage Guidelines

### Behavior

- Keep only one section open at a time to prevent information overload, unless multiple open sections are necessary.
- Avoid nesting collapsible sections within each other to prevent a confusing user experience.

### Content

- Ensure the content is relevant and necessary; avoid including unrelated information.
- Avoid using collapsible sections for content that needs to be always visible or is critical for immediate user attention.

## Accessibility

- Use only for non-critical information. Hiding content can become a potential barrier, making content more challenging to discover.
- Use “close-others” attribute to keep only one item from the group open at a time, reducing the amount of information displayed at once and therefore reducing the cognitive load on the user.

## Related Components

- syn-details
