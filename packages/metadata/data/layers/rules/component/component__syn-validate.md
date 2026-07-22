# syn-validate

## Summary

Validate provides form field validation messages in a unified way.
It does this by using [the native browser validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
and showing the validation message in a consistent, user defined way.

## Common Use Cases

- Display field validation for forms and wizards.
- Show custom validation messages for domain specific rules.
- Integrate consistent error handling across native and custom form controls.

## Usage Guidelines

### Validation Messages

- Write actionable messages that tell users what to fix and how.
- Prefer field specific messages over generic form level errors.
- Use consistent wording for recurring validation rules.

### Display Variants

- Use inline variant for persistent field level feedback.
- Use tooltip variant where space is constrained and interaction remains clear.
- Hide icons only when another strong error cue is present.

### Validation Timing

- Use eager validation for high risk fields that benefit from immediate feedback.
- Use submit time validation to reduce interruption in long forms.
- Support custom validation events when integrating non-standard controls.

## Accessibility

- Validation messages must be text based and clearly associated with the target field.
- Use live validation thoughtfully to avoid excessive announcement noise for screen readers.
- Provide specific corrective guidance instead of generic error statements.

## Related Components

- syn-input
- syn-select
- syn-textarea
- syn-file

## Related Templates

- Forms
