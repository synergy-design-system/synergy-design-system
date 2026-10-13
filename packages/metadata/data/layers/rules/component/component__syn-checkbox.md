# syn-checkbox

## Summary

Checkboxes allow the user to toggle an option on or off.

## Common Use Cases

- Used for selections that don't immediately trigger an action.
- Selecting an option like "Agree to Terms and Conditions" before submitting a registration form.
- Opt-in/Opt-out of notifications or subscriptions.

## Usage Guidelines

### Content

- Provide a clear, descriptive label for each selection to avoid confusion.
- Frame labels positively, such as "Enable notifications" instead of "Disable notifications."

### Interaction and Usage

- Ensure each selection operates independently unless used for bulk actions.
- When multiple related checkbox options are shown together, prefer wrapping them in syn-checkbox-group for shared labeling and guidance.
- List selections in a logical order, such as alphabetical or numerical.
- Refrain from using a single checkbox when the action should take effect immediately - use syn-switch instead.

### Validation and States

- Use readonly when users need to see whether an existing choice is checked without being able to change it.
- Use disabled only when the choice is unavailable; explain why users cannot select it rather than leaving an unexplained inactive option.

## Accessibility

- Checkboxes should always look like checkboxes to meet user's expectations.
- Nesting other interactive elements like links inside labels should be avoided.
- An error-text with a warning icon should be placed underneath an invalid checkbox. Error messages should always provide hints for solutions.

## Related Components

- syn-checkbox-group

## Related Templates

- Forms
