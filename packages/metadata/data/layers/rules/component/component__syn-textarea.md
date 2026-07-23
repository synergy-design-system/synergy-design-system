# syn-textarea

## Summary

Textareas collect data from the user and allow multiple lines of text.

## Common Use Cases

- Collect detailed user feedback or comments.
- Enable users to write comprehensive reviews of products or services.
- Gather extensive information about issues or requests.
- Capture detailed responses in surveys or questionnaires.

## Usage Guidelines

### Behavior and Interaction

- Provide real-time validation to help users correct errors as they type.
- Provide a visible scrollbar when text overflows.
- Adapt the size of the field to the expected length of user input.
- Avoid including a "clear" button to prevent unwanted loss of user input.

### Content and Guidance

- Inform users whenever minimum or maximum lengths are set; use the field's help text for this.
- Use placeholder text as an addition to label as it should not include essential information required to complete the field correctly.
- Use help text to provide hints or examples of expected inputs.

## Accessibility

- Ensure textarea fields are part of a logical tab order and provide a clearly visible focus state when focused.
- Always provide a descriptive label. Placeholder text may support the label but must not replace it.
- Ensure textarea fields remain usable across all screen sizes, including touch devices with sufficiently large touch targets.
- Inform users about input constraints such as minimum or maximum character limits, and expose validation feedback clearly.
- Use helper and error text that can be announced by assistive technologies (e.g., by linking descriptions and errors to the field).
- Prefer keeping the field enabled by default and validate on submit or during input instead of blocking input unnecessarily.

## Related Templates

- Forms
