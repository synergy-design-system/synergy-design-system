# syn-progress-bar

## Summary

Progress bars are used to show the status of an ongoing operation.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-progress-bar--docs)

## Class Information

- **Import Example:** `import SynProgressBar from '@synergy-design-system/components/components/progress-bar/progress-bar.js';`
- **Module Path:** components/progress-bar/progress-bar.js
- **Tag Name:** `syn-progress-bar`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                    |
| --------- | ---------------------------------------------- |
| (default) | A label to show inside the progress indicator. |

## Available Properties

| Property      | Attribute       | Reflects | Type      | Default | Description                                                                                                     |
| ------------- | --------------- | :------: | --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| indeterminate | `indeterminate` |    ✓     | `boolean` | `false` | When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. |
| label         | `label`         |    -     | `string`  | `''`    | A custom label for assistive devices.                                                                           |
| value         | `value`         |    ✓     | `number`  | `0`     | The current progress as a percentage, 0 to 100.                                                                 |

## Available CSS Parts

| Name      | Description                   |
| --------- | ----------------------------- |
| base      | The component's base wrapper. |
| indicator | The progress bar's indicator. |
| label     | The progress bar's label.     |
