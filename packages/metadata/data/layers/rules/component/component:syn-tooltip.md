# syn-tooltip

## Summary

Tooltips display additional information based on a specific action.

## Common Use Cases

- Provide additional, useful, and non-essential information about form fields.
- Expand abbreviations or acronyms that might be unfamiliar to users.
- Offer detailed information about specific data points in charts or graphs.
- Provide more context for error messages or warnings and anticipate any questions that users may have.

## Usage Guidelines

### Background

- Use with light background options of white, neutral-100 and primary-100.

### Behavior and Placement

- Place the tooltip where the floating element does not obscure important content related to the subject.
- Ensure it disappears when the user interacts with other elements.
- Avoid tooltips being cropped by other elements of the interface; use appropriate placement for this purpose.

### Content

- Use short, descriptive text; if a longer explanation is required, consider non-interactive means to convey this information.
- Avoid jargon or highly technical language; aim to solve questions, not trigger more.
- Do not use for critical or unique information.
- Do not place links, buttons, or other interactive elements within the content.

### Styling

- Display a headline by bolding the text if it makes the content easier to understand.
- Emphasize key information by bolding parts of the text.

### Trigger Element

- Use any interactive element as a tooltip trigger by placing it in the provided slot. The tooltip will open when the user hovers over or focuses on the trigger element.

## Accessibility

- Avoid placing buttons, links, or other interactive controls inside a tooltip, as it's designed to be an ephemeral container for supplementary information.
- On desktop, tooltips open by default on hover over the trigger element, or optionally on click. They close by clicking the trigger again or by moving the pointer away.
- On touch devices, tooltips open when tapping on the trigger element and close by tapping on the trigger element again.
- For keyboard navigation, tooltips should open by focusing (Tab) on the trigger element and close by pressing Escape or by moving focus away.

## Related Templates

- tooltip
