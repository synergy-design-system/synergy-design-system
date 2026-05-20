# syn-radio

## Summary

Radios allow the user to select a single option from a group.

## Common Use Cases

- Choose one delivery method from a short list.
- Select one billing frequency such as monthly or yearly.
- Pick one preference in settings where only a single active mode is allowed.
- Answer single-choice questions in forms and surveys.

## Usage Guidelines

### Option Structure

- Use radios when users must select exactly one option from a small, predefined list.
- Keep options mutually exclusive and avoid overlapping meanings between choices.
- Present options in a stable order and keep wording parallel to make comparison easier.

### Labels and Guidance

- Always provide a meaningful group label on the parent syn-radio-group.
- Use concise option labels and add help text when options need extra explanation.
- Prefer sentence case and domain terms users already know.

### Selection Behavior

- Set a sensible default when one option is expected in most cases, but avoid preselecting high-risk choices.
- If no safe default exists, require explicit user selection before submit.
- Do not mix radios and checkboxes for the same decision set.

## Accessibility

- Use syn-radio inside syn-radio-group so assistive technologies can interpret options as one exclusive choice set.
- Ensure each radio has a clear, unique visible label; avoid ambiguous labels such as "Option 1" without context.
- Use disabled or readonly states only when users can still understand why an option is unavailable.

## Related Components

- syn-radio-group

## Related Templates

- Forms
