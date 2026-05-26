# syn-radio-group

## Summary

Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.

## Common Use Cases

- Present options in forms where only one selection is allowed (e.g., gender selection, payment methods).
- Provide clear and concise choices in settings or configuration panels.
- Enable users to make a selection in surveys or questionnaires.
- Offer options in filter panels where only one filter can be applied at a time.

## Usage Guidelines

### Background

- Use with light background options such as white, neutral-100, or primary-100.

### Grouping and Labels

- Group related options together using fieldsets and legends for better context and accessibility.
- Provide a group label that states the category or describes the actions to take.

### Selection Behavior

- Provide a default selected option; never display options without a default selection.
- Do not disable all choices in a group; if a selection is not applicable, consider hiding the group instead.
- Use only when users need to select one option; for multiple selections, use checkboxes instead.

## Accessibility

- Ensure that the group label is short and concise as it may be read out when users enter the group.
- Ensure radios are easily tappable on touch devices.

## Related Components

- syn-radio
- syn-radio-button

## Related Templates

- Forms
