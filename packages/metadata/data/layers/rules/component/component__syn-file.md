# syn-file

## Summary

File controls allow selecting an arbitrary number of files for uploading.

## Common Use Cases

- Upload one or more documents in forms.
- Attach files to support tickets or feedback forms.
- Collect folders or batches of assets for import workflows.

## Usage Guidelines

### File Selection

- Use single file mode for one required document and multiple mode only when truly needed.
- Use directory selection only for workflows where folder upload is expected.
- Use hide-value only when file names are presented elsewhere in the UI.

### Labels and Guidance

- Describe allowed file types and size limits near the control.
- Provide examples for naming or formatting if uploads must follow a convention.
- Keep helper text short and task specific.

### Validation and States

- Use invalid state and clear error copy when upload constraints are not met.
- Use readonly when users can inspect but not change the selected files.
- Avoid disabling file input unless there is a clear blocking condition.

## Accessibility

- Always provide a visible label and use help text to explain accepted files and limits.
- Ensure drag and drop interactions are complemented by a clickable file picker.
- Expose validation errors in text and not by color alone.

## Related Components

- syn-validate

## Related Templates

- Forms
