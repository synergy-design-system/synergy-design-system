# syn-button-group

## Summary

Button groups can be used to group related buttons into sections.

## Common Use Cases

- Group related buttons that serve a common purpose or function together.
- Use for actions that are logically connected (e.g., text formatting: bold, italic, underline).
- Group buttons that control related settings or options within the same UI context.
- Avoid grouping buttons that are unrelated or have conflicting purposes.
- Use for toolbars with icon buttons and tooltip hints.
- Use for segmented controls with radio buttons in a group.
- Use for text formatting controls (bold, italic, underline, etc.).
- Use for pagination or navigation controls with multiple related actions.
- Use for filter or view controls with related options.

## Usage Guidelines

### Variants

- Use outline variant (default) for secondary or neutral button groups.
- Use filled variant for primary actions or emphasized button groups.
- Keep variant consistent within a single button group for visual cohesion.
- Choose variant based on the importance and prominence needed in the layout.

### Composition & Related Elements

- Combine with syn-icon for icon-only toolbar-style button groups.
- Wrap buttons in syn-tooltip for additional context without cluttering the UI.
- Use with syn-dropdown for split-button or menu patterns within groups.
- Place all related interactive elements inside the button group slot.

### Visual Consistency

- Ensure adequate spacing between button groups and other UI elements.
- Keep the number of buttons in a group manageable (typically 2-5 buttons).

### Component Behavior

- Each button in the group retains its individual click handlers and states.
- Button states (focus, hover, active) are automatically managed by the component.
- The component handles size and variant propagation to all child buttons.

## Accessibility

- Always provide a label property for accessibility and screen readers.
- Label should describe the purpose of the button group (e.g., "Text formatting", "Page navigation").
- Use clear, descriptive labels that help users understand the grouped buttons' relationship.
- Labels are not displayed visually but are announced by assistive technologies.

## Related Components

- syn-button
