# syn-fieldset

## Summary

Fieldsets are used to group related elements in a form.

## Common Use Cases

- Group related personal information fields such as name, email, and phone into a single form section.
- Separate billing and shipping sections in checkout flows while keeping each section semantically connected.
- Group preference controls such as notification channels or consent options under a shared legend.
- Structure longer forms into meaningful sections so users can scan and complete them with less cognitive load.

## Usage Guidelines

### Grouping and Scope

- Use fieldsets to group controls that belong to the same question, task, or domain (for example shipping address, billing details, or communication preferences).
- Avoid using a fieldset for single standalone controls with no meaningful group context.

### Legend and Description

- Write concise, descriptive legends that describe the intent of the group and avoid generic titles such as "Details" or "Options".
- Use the description for optional context or constraints, not as a replacement for clear field labels and helper text.

### Disabled Behavior

- When disabling a fieldset, ensure users still understand why input is blocked and what action is needed to re-enable it.
- Do not use disabled groups to hide required steps in a form flow; prefer progressive disclosure patterns with clear triggers.

### Layout

- Use one-column layout for longer inputs and mixed controls to preserve scanability and reduce visual noise.
- Use two-column layout only when controls have similar weight and labels remain easy to read on all supported viewport sizes.
- Keep in mind that two-column layouts will automatically switch to a single column on smaller viewports, so ensure the reading order remains logical and accessible.
- Nested grouped controls (for example syn-radio-group) are automatically aligned with the fieldset's effective layout: horizontal in effective two-column mode and vertical when collapsed to one-column.
- Set `disable-auto-group-layout` when nested grouped controls must keep their own explicit layout and should not be changed by the fieldset.

## Accessibility

- Always provide a clear legend so assistive technologies can announce the group context before users interact with controls inside it.
- Use a short description only for supporting information and keep critical instructions in labels, helper text, or validation messages of the contained fields.
- Keep grouped fields in a logical reading and tab order so keyboard and screen reader users can complete the section predictably.
- Use the disabled state sparingly and only when the entire group is unavailable; explain why the section is disabled whenever possible.

## Related Components

- syn-button
- syn-checkbox
- syn-checkbox-group
- syn-combobox
- syn-dropdown
- syn-file
- syn-input
- syn-radio
- syn-radio-group
- syn-range
- syn-select
- syn-switch
- syn-textarea

## Related Templates

- Forms
