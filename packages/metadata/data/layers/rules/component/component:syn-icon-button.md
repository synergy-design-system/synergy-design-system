# syn-icon-button

## Summary

Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.

## Common Use Cases

- Toolbar actions such as edit, delete, and settings.
- Compact controls in tables, cards, and dialogs.
- Navigation utility actions in headers and side panels.

## Usage Guidelines

### Labeling

- Use concise labels that describe the resulting action, such as "Edit" or "Close".
- Add a tooltip when extra context is helpful, especially in dense toolbars.
- Keep label wording consistent across the product.

### Interaction

- Use icon buttons for quick actions and compact controls.
- Prefer regular buttons when text improves clarity.
- Use disabled state sparingly and explain why an action is unavailable when possible.

### Size and Color

- Use size variants consistently within a control group.
- Use semantic colors only when state or priority must be emphasized.
- Do not overuse high contrast icon buttons in low priority contexts.

## Accessibility

- Always provide a meaningful label attribute for icon only buttons.
- Ensure focus styles remain visible in all variants and states.
- Avoid using icon buttons for destructive actions without clear context or confirmation.

## Related Components

- syn-icon
- syn-button
- syn-tooltip
