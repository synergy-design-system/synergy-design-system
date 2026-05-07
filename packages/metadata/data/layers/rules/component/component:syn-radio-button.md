# syn-radio-button

## Summary

Radios buttons allow the user to select a single option from a group using a button-like control.

## Common Use Cases

- Select one option from a group where one is already preselected.
- Switch between groups of settings.
- Filter views by a parent category.

## Usage Guidelines

### Background

- Use with light background options such as white, neutral-100, or primary-100.

### Behavior

- Don't use as input method in forms, for they are not form elements. Use syn-radio instead.
- Slot inside of an syn-radio-group.
- Use only in groups, as they are designed to allow the user to activate one of several options. To work with a single option, use syn-checkbox instead.
- Pre-select always a "default" value; there is no invalid state.
- Limit the number of options in the group. Users should be able to retain all options available and not be overwhelmed by them.

### Content

- Include icons to support each option visually if possible.
- Label each choice clearly.

### Styling

- All radio buttons in the group must be styled similarly, e.g., each one is labelled with both text and icon.
- Avoid styling options only with icons if they are not common symbols, to prevent ambiguous interpretations.

## Accessibility

- Provide meaningful alternative text for icon-only radio buttons.
- Communicate the group's function-such as filtering or view switching-through clear context or labels.

## Related Components

- syn-radio
- syn-radio-group

## Related Templates

- Forms
