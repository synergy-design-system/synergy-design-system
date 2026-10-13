# syn-combobox

## Summary

A combobox component that combines the functionality of a text input with a dropdown listbox,
allowing users to either select from predefined options or enter custom values (when not restricted).

## Common Use Cases

- Allow users to select one or more options from a potentially large list by typing a search string and filtering suggestions.
- Provide an autocomplete feature in forms where specific or complex entries benefit from quick lookup.
- Implement in search fields or filter panels when users may not recall the exact option name but can approximate it.
- Long or descriptive labels, helper text, or units are needed.
- Forms with many fields that users must scan quickly.
- Compact layouts and simple fields.

## Usage Guidelines

### Content and Labels

- Keep option labels concise so that suggestions are easy to scan and select.
- Provide a clear, descriptive placeholder (e.g., "Search or select an option...") to help users understand they can type and choose from suggestions.
- Avoid repeating the same initial word in multiple suggestions to reduce scanning difficulty.

### Searching Behavior

- Filter available options in real time as the user types; highlight or bold matching text to indicate relevance.
- Consider limiting the maximum number of displayed suggestions to avoid overwhelming users. We recommend displaying 6-8 (with scrolling for additional results).
- When showing all options regardless of user input (filter="none"), always combine it with the built-in getOption="highlight" renderer, or a custom renderer that provides equivalent visual feedback, so users can still tell which option matches their input.

### Paging Data

- For very large option sets, load options in pages as the user scrolls rather than rendering the full dataset up front. Listen for the syn-end-reached event, fetch the next page, and append its options to the component.
- Provide clear loading feedback, such as a loading indicator, while each page is being fetched.

### Validation and States

- Use readonly when users can inspect but not change the selected option(s).
- Avoid disabling comboboxes unless there is a clear blocking condition.

## Accessibility

- A visible label may be omitted for search input fields within a combobox if an associated button-complete with a clear search icon and an appropriate accessible name (e.g., aria-label="Search")-is provided.
- Be aware that group labels will be neglected by most assistive devices.

## Related Components

- syn-option
- syn-optgroup

## Related Templates

- Forms
