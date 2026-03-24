# syn-progress-bar

## Summary

Progress bars are used to show the status of an ongoing operation.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-progress-bar--docs)

## Class Information

- **Module Path:** components/progress-bar/progress-bar.js
- **Tag Name:** syn-progress-bar

## Available Slots

| Name      | Description                                    |
| --------- | ---------------------------------------------- |
| (default) | A label to show inside the progress indicator. |

## Available Attributes

| Name          | Type    | Default | Description                                                                                                     | Reflects |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| value         | number  | 0       | The current progress as a percentage, 0 to 100.                                                                 | ✓        |
| indeterminate | boolean | false   | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. | ✓        |
| label         | string  | ''      | A custom label for assistive devices.                                                                           | -        |

## Available Properties

| Name          | Type    | Default | Description                                                                                                     | Access |
| ------------- | ------- | ------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| value         | number  | 0       | The current progress as a percentage, 0 to 100.                                                                 | public |
| indeterminate | boolean | false   | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. | public |
| label         | string  | ''      | A custom label for assistive devices.                                                                           | public |

## Available Methods

| Name | Parameters | Return Type | Description |
| ---- | ---------- | ----------- | ----------- |
| -    | -          | -           | -           |

## Available CSS Parts

| Name      | Description                   |
| --------- | ----------------------------- |
| base      | The component's base wrapper. |
| indicator | The progress bar's indicator. |
| label     | The progress bar's label.     |

## Available Events

| Name | Event Type | Description |
| ---- | ---------- | ----------- |
| -    | -          | -           |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
