# syn-tag-group

## Summary

A tag group is used to display multiple tags that belong together, often representing selected filters, categories, or user‑generated labels.
It arranges tags in flexible rows and supports different sizes and layouts.
Tags can be removable, icon‑based, or purely textual.

## Common Use Cases

- Show currently active filters in search and table views.
- Display selected categories or labels in forms.
- Manage multi-select states with removable tag chips.

## Usage Guidelines

### Grouping Strategy

- Use tag groups for sets of related tags such as active filters or selected labels.
- Keep tags short and consistent to avoid visual noise.
- Use label alignment and group labels to clarify the meaning of the collection.

### Interaction

- Use removable tags when users can directly edit a selection.
- Provide clear feedback when a tag is removed from the group.
- Avoid mixing non-removable and removable semantics without clear distinction.

### Sizing and Layout

- Use group size variants consistently with nearby controls.
- Wrap tags cleanly and preserve readable spacing in narrow layouts.
- Avoid excessive tag counts without offering collapse or summary behavior.

## Accessibility

- Ensure each tag has clear readable text and a meaningful remove action when removable.
- Expose group labeling context when tags represent selected filters or categories.

## Related Components

- syn-tag

## Related Templates

- Tag-Group
