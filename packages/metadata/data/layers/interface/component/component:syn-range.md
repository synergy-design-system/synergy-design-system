# syn-range

## Summary

Ranges allow the user to select values within a given range using one or two thumbs.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-323916)

## Class Information

- **Import Example:** `import SynRange from '@synergy-design-system/components/components/range/range.js';`
- **Tag Name:** `syn-range`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| label     | The range's label. Alternatively, you can use the `label` attribute.                            |
| prefix    | Used to prepend a presentational icon or similar element to the range.                          |
| suffix    | Used to append a presentational icon or similar element to the range.                           |
| help-text | Text that describes how to use the range. Alternatively, you can use the `help-text` attribute. |
| ticks     | Used to display tick marks at specific intervals along the range.                               |

## Available Properties

| Property         | Attribute           | Reflects | Type                             | Default    | Description                                                                                                                                                                                                                                                                            |
| ---------------- | ------------------- | :------: | -------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue     | -                   |    -     | `string`                         | `'0'`      | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                  |
| disabled         | `disabled`          |    ✓     | `boolean`                        | `false`    | Disables the range.                                                                                                                                                                                                                                                                    |
| form             | `form`              |    ✓     | `string`                         | `''`       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. |
| helpText         | `help-text`         |    -     | `string`                         | `''`       | The range's help text. If you need to display HTML, use the help-text slot instead.                                                                                                                                                                                                    |
| label            | `label`             |    -     | `string`                         | `''`       | The range's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                          |
| max              | `max`               |    -     | `number`                         | `100`      | The maximum acceptable value of the range.                                                                                                                                                                                                                                             |
| min              | `min`               |    -     | `number`                         | `0`        | The minimum acceptable value of the range.                                                                                                                                                                                                                                             |
| name             | `name`              |    -     | `string`                         | `''`       | The name of the range, submitted as a name/value pair with form data.                                                                                                                                                                                                                  |
| readonly         | `readonly`          |    ✓     | `boolean`                        | `false`    | Sets the range to a readonly state.                                                                                                                                                                                                                                                    |
| restrictMovement | `restrict-movement` |    -     | `boolean`                        | `false`    | Set to true to restrict the movement of a thumb to its next and previous thumb. This only affects multi range components                                                                                                                                                               |
| size             | `size`              |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The range's size.                                                                                                                                                                                                                                                                      |
| step             | `step`              |    -     | `number`                         | `1`        | The interval at which the range will increase and decrease.                                                                                                                                                                                                                            |
| tooltipFormatter | -                   |    -     | `(value: number) => string`      | -          | A function used to format the tooltip's value. The value of the thumb is passed as the only argument. The function should return a string to display in the tooltip.                                                                                                                   |
| tooltipPlacement | `tooltip-placement` |    -     | `'top' \| 'bottom' \| 'none'`    | `'top'`    | The preferred placement of the range's tooltip. Use "none" to disable the tooltip                                                                                                                                                                                                      |
| value            | `value`             |    -     | `-`                              | -          | The current values of the input (in ascending order) as a string of space separated values                                                                                                                                                                                             |
| valueAsArray     | -                   |    -     | `-`                              | -          | Gets or sets the current values of the range as an array of numbers                                                                                                                                                                                                                    |

## Available Methods

| Name                  | Parameters        | Return Type | Description                                                                                                     |
| --------------------- | ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `checkValidity()`     | -                 | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| `getForm()`           | -                 | -           | Gets the associated form, if one exists.                                                                        |
| `reportValidity()`    | -                 | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| `setCustomValidity()` | `message: string` | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |

## Available CSS Parts

| Name                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| active-track           | The active track.                                            |
| base                   | The component's base wrapper.                                |
| form-control           | The form control that wraps the label, input, and help text. |
| form-control-help-text | The help text's wrapper.                                     |
| form-control-label     | The label's wrapper.                                         |
| input-wrapper          | The container that wraps the input track and ticks.          |
| prefix                 | The container that wraps the prefix.                         |
| suffix                 | The container that wraps the suffix.                         |
| thumb                  | The thumb(s) that the user can drag to change the range.     |
| ticks                  | The container that wraps the tick marks.                     |
| tooltip\_\_arrow       | The arrow of the tooltip                                     |
| tooltip\_\_base        | The base of the tooltip                                      |
| tooltip\_\_body        | The body of the tooltip                                      |
| tooltip\_\_popup       | The popup of the tooltip                                     |
| track                  | The inactive track.                                          |
| track-wrapper          | The wrapper for the track.                                   |

## Available Events

| Name        | Event Type        | Description                                                                                                          |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| syn-blur    | `SynBlurEvent`    | Emitted when the control loses focus.                                                                                |
| syn-change  | `SynChangeEvent`  | Emitted when an alteration to the control's value is committed by the user.                                          |
| syn-focus   | `SynFocusEvent`   | Emitted when the control gains focus.                                                                                |
| syn-input   | `SynInputEvent`   | Emitted when the control receives input.                                                                             |
| syn-invalid | `SynInvalidEvent` | Emitted when the form control has been checked for validity and its constraints aren't satisfied.                    |
| syn-move    | `SynMoveEvent`    | Emitted when the user moves a thumb, either via touch or keyboard. Use `Event.preventDefault()` to prevent movement. |

## Dependencies

- `syn-tooltip`
