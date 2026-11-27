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

### Spritesheet and Bundled Data URLs

- getIconDataURL from @synergy-design-system/components/utilities/icon-library.js supports registered spritesheet and bundled icon libraries in browser code, returning a base64 SVG data URL suitable for images or charts.
- For spritesheets, use an SVG file containing <symbol id="..."> elements and a resolver such as /sprite.svg#settings with spriteSheet: true. The helper extracts the selected symbol and applies the library mutator to an independent SVG. Symbol attributes and content are copied, but sheet attributes and content outside the symbol are not; references remain but their targets outside the symbol are not copied. Include the content and definitions the symbol needs for portable output. Missing fragments or symbols reject the promise. The sheet must be same-origin or CORS-enabled.
- For bundled libraries, register the resolver as usual and call getIconDataURL("warning", "bundled-default"). Explicitly importing the full defaultIcons map still increases bundle size; the helper does not tree-shake runtime map lookups.
- getIconDataURL runs the registered mutator on a fresh SVG clone for every call and reuses the most recent data URL for a resolved source only when the resulting SVG is unchanged.
- On failure getIconDataURL rejects its promise; use try/catch to handle the error. Network and retryable HTTP failures can be retried, while HTTP 410 and invalid SVG failures remain cached.

## Accessibility

- Provide a label when the icon conveys meaning or triggers an action.
- Use decorative icons without labels so assistive tech can ignore them.
- Do not rely on icon color alone to communicate state.

## Related Components

- syn-icon-button
- syn-button
