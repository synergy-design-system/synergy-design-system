# syn-icon

## Summary

Icons are symbols that can be used to represent various options within an application.

## Common Use Cases

- Add visual cues to buttons, alerts, and status messages.
- Represent actions in compact toolbars.
- Support navigation and quick scanning in dense layouts.

## Usage Guidelines

### Semantics

- Use icons to support text, not replace it, unless the icon is universally understood.
- For icon only interactions, pair with syn-icon-button and an accessible label.
- Choose icons that match the user intent and context.

### Styling

- Use consistent icon sizes within the same interface area.
- Use design tokens for color and avoid ad hoc hex colors.
- Keep visual weight balanced when combining icons with text.

### Icon Sources

- Use bundled libraries for common icons whenever possible.
- Use custom libraries only when required by brand or domain specific assets.
- Validate fallback behavior when loading icons from CDN or sprite sheets.

## Accessibility

- Provide a label when the icon conveys meaning or triggers an action.
- Use decorative icons without labels so assistive tech can ignore them.
- Do not rely on icon color alone to communicate state.

## Related Components

- syn-icon-button
- syn-button
