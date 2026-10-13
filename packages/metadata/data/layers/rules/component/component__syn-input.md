# syn-input

## Summary

Inputs collect data from the user.

## Common Use Cases

- Collect user data in forms, including names, emails, dates, and passwords.
- Allow users to enter numerical values like quantities or prices.
- Long or descriptive labels, helper text, or units are needed.
- Forms with many fields that users must scan quickly.
- Complex fields with adornments, counters, or tooltips.
- Compact layouts and simple fields.

## Usage Guidelines

### Input Types

- Use appropriate field types for the given purpose (e.g., "email", "password", "number"). For custom autocomplete functionalities (e.g., search fields) use syn-combobox.
- Use for brief text input only. For longer inputs, such as comments or user feedback, use syn-textarea instead.

### Labels and Placeholders

- Use descriptive and concise labels.
- Avoid using placeholder text as a substitute for labels.

### User Guidance

- Provide instructions within helper text for completing the field, such as password or character count (e.g., "maxlength" and "minlength"...).
- Offer additional guidance with tooltips or help text to guide users on the expected input format and prevent unclear or ambiguous interpretation.

### Validation and Formatting

- Use dynamic formatting to automatically format user input as they type.
- Validate user entries in real-time to provide immediate feedback whenever possible.
- Avoid using fields for actions that require immediate feedback; use buttons instead.

### Validation and States

- Use readonly for a prefilled value users should be able to review or copy but not edit.
- Use disabled only when the input is unavailable, and explain what users must do to make it available.

## Accessibility

- Ensure that focus moves in sequential order between input fields and other form elements. When an input field is focused, it should be clearly indicated.
- Avoid disabling inputs when users still need to inspect their values. Native disabled inputs leave the tab order and are not submitted with the form; aria-disabled alone does not prevent editing.
- Ensure input fields are usable on all screen sizes. On smaller screens, consider using larger touch targets for input fields.
- Placeholder text should offer a hint of what the user should write and must always go together with a label.
- Prefer keeping the input enabled by default by relying on default values or by validating on submit.
- Use "autocomplete" attribute to enable automated browser assistance when filling out forms.

## Related Templates

- Forms
