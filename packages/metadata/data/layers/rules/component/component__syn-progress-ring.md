# syn-progress-ring

## Summary

Progress rings are used to show the progress of a determinate operation in a circular fashion.

## Common Use Cases

- Compact progress indication in cards or widgets.
- Show operation progress in dashboards and modal dialogs.
- Indicate completion state in space constrained UI areas.

## Usage Guidelines

### Progress Semantics

- Use progress rings when a compact circular indicator fits the layout better than a bar.
- Use determinate mode when the progress value is known.
- Avoid using rings for long verbose progress explanations.

### Size and Stroke

- Adjust size based on container density and reading distance.
- Use track and indicator width values that keep the ring legible at small sizes.
- Keep sizing consistent across similar components in one view.

### Labels and Values

- Include labels or nearby text describing the operation.
- Show percentage values when users need exact feedback.
- Use concise text to avoid crowding around the ring.

## Accessibility

- Provide clear labels for ring progress when meaning is not obvious from context.
- Use determinate values for measurable tasks and avoid ambiguous visual states.
- Ensure color choices meet contrast requirements against the background.

## Related Components

- syn-progress-bar
- syn-spinner
