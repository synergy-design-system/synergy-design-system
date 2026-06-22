# syn-select

## Summary

Selects allow you to choose items from a menu of predefined options.

## Common Use Cases

- Enable users to select one or more options from a list of predefined choices in forms.
- Implement in filter panels to allow users to refine search results or data views.
- Provide options in settings pages where users need to choose preferences from a list.

## Usage Guidelines

### Content and Labels

- Keep each option to a single line of text for readability.
- Ensure all options have consistent line lengths for easier scanning.
- Avoid using the same word or phrase at the beginning of options.
- Provide a meaningful placeholder option to guide users.

### Selection Behavior

- Use for lists with more than five options; for fewer options, consider using syn-radio for single selection or syn-checkbox for multiple selection.
- Apply the "multiple" attribute when multiple selections are allowed.
- By default, the number of selected options is displayed after the text.
- Display selected options as tags within the field to help users track their selections.
- Consider limiting the maximum number of displayed selectable options to avoid overwhelming users. We recommend displaying 6-8 (with scrolling for additional results).

## Accessibility

- If multiple options can be selected, clearly announce this capability to screenreader users and offer a way to view all chosen items.
- Be aware that group labels in select components will be neglected by most assistive devices.

## Related Components

- syn-option
- syn-optgroup

## Related Templates

- Forms
