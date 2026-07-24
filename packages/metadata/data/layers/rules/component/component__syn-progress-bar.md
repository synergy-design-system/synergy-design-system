# syn-progress-bar

## Summary

Progress bars are used to show the status of an ongoing operation.

## Common Use Cases

- Show progress for uploads, downloads, or data processing.
- Indicate completion status in multi-step operations.
- Display background task progress in dashboards and forms.

## Usage Guidelines

### Determinate vs Indeterminate

- Use determinate mode for measurable tasks such as uploads or imports.
- Use indeterminate mode for short operations when duration cannot be estimated.
- Switch to determinate mode as soon as reliable progress information is available.

### Labels and Values

- Provide descriptive labels that state what process is progressing.
- Show values when users benefit from precise completion feedback.
- Keep labeling consistent across similar processes.

### Visual Styling

- Use custom heights carefully to preserve readability and visual balance.
- Maintain sufficient contrast between track and indicator.
- Avoid decorative overuse of animated progress indicators.

## Accessibility

- Provide accessible labels for progress context, especially when multiple bars are visible.
- Use determinate mode when actual progress is known and indeterminate only when unknown.
- Do not rely on color only to communicate progress status.

## Related Components

- syn-progress-ring
- syn-spinner
