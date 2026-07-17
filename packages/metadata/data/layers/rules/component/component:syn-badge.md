# syn-badge

## Summary

Badges are used to draw attention and display statuses or counts.

## Common Use Cases

- Show the count of newly added items
- Display the number of messages received or tasks still pending
- Present the quantity of items collected, like those in a shopping cart

## Usage Guidelines

### Variants & When to Use Them

- **Primary** variant: Use for general status indicators, counts, or default emphasis.
- **Success** variant: Use for positive states such as completed, confirmed, or available.
- **Warning** variant: Use for cautionary states or information that needs attention.
- **Critical** variant: Use for urgent, high-severity states that require immediate awareness.
- **Error** variant: Use for failed, blocked, or problematic states.
- ~~**Danger** variant~~: Do not use. This variant is deprecated and will be removed in a future major release. Use the error variant instead.
- **Neutral** variant: Use for low-emphasis informational statuses that should remain visible but not draw strong attention.
- Use one variant consistently per badge so the color matches the status meaning.

### Content

- Use "+" for overflow values set by the application
- Use an empty badge when you only need a compact visual status indicator without a numeric count or text label.
- Reserve the dot-only badge for states that are already clear from the surrounding context, such as an anchored indicator on an icon or navigation item.
- Do not rely on the dot-only badge as the only way to communicate critical meaning. Provide nearby text or another accessible cue when the status matters.

### Placement

- Place where it preserves relation to the assigned element
- Do not obscure any informative element or text
- Do not alter the number formatting

## Accessibility

- Avoid using badges for purely decorative purposes
- Ensure badge is sized and placed so it does not obscure other content or controls
- If the badge conveys critical information, provide it in text elsewhere too
- Use aria-live when badge content updates dynamically

## Known Issues

- **Safari**: Badge with role='status' inside syn-button does not announce updates
- **Firefox**: Only announces content of the element that has updates when multiple elements are inside the badge
