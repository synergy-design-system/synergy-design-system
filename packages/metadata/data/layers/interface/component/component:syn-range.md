# syn-range

## Summary

Ranges allow the user to select values within a given range using one or two thumbs.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs)

## Class Information

- **Module Path:** components/range/range.js
- **Tag Name:** syn-range

## Available Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| label     | The range's label. Alternatively, you can use the `label` attribute.                            |
| prefix    | Used to prepend a presentational icon or similar element to the range.                          |
| suffix    | Used to append a presentational icon or similar element to the range.                           |
| help-text | Text that describes how to use the range. Alternatively, you can use the `help-text` attribute. |
| ticks     | Used to display tick marks at specific intervals along the range.                               |

## Available Attributes

| Name              | Type                           | Default  | Description                                                                                                                                                                                                                                                                            | Reflects |
| ----------------- | ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name              | string                         | ''       | The name of the range, submitted as a name/value pair with form data.                                                                                                                                                                                                                  | -        |
| label             | string                         | ''       | The range's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                          | -        |
| help-text         | string                         | ''       | The range's help text. If you need to display HTML, use the help-text slot instead.                                                                                                                                                                                                    | -        |
| disabled          | boolean                        | false    | Disables the range.                                                                                                                                                                                                                                                                    | ✓        |
| readonly          | boolean                        | false    | Sets the range to a readonly state.                                                                                                                                                                                                                                                    | ✓        |
| min               | number                         | 0        | The minimum acceptable value of the range.                                                                                                                                                                                                                                             | -        |
| max               | number                         | 100      | The maximum acceptable value of the range.                                                                                                                                                                                                                                             | -        |
| step              | number                         | 1        | The interval at which the range will increase and decrease.                                                                                                                                                                                                                            | -        |
| size              | 'small' \| 'medium' \| 'large' | 'medium' | The range's size.                                                                                                                                                                                                                                                                      | ✓        |
| tooltip-placement | 'top' \| 'bottom' \| 'none'    | 'top'    | The preferred placement of the range's tooltip. Use "none" to disable the tooltip                                                                                                                                                                                                      | -        |
| value             | -                              | -        | The current values of the input (in ascending order) as a string of space separated values                                                                                                                                                                                             | -        |
| restrict-movement | boolean                        | false    | Set to true to restrict the movement of a thumb to its next and previous thumb. This only affects multi range components                                                                                                                                                               | -        |
| form              | string                         | ''       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | ✓        |

## Available Properties

| Name              | Type                           | Default  | Description                                                                                                                                                                                                                                                                            | Access   |
| ----------------- | ------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| name              | string                         | ''       | The name of the range, submitted as a name/value pair with form data.                                                                                                                                                                                                                  | public   |
| label             | string                         | ''       | The range's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                          | public   |
| helpText          | string                         | ''       | The range's help text. If you need to display HTML, use the help-text slot instead.                                                                                                                                                                                                    | public   |
| disabled          | boolean                        | false    | Disables the range.                                                                                                                                                                                                                                                                    | public   |
| readonly          | boolean                        | false    | Sets the range to a readonly state.                                                                                                                                                                                                                                                    | public   |
| min               | number                         | 0        | The minimum acceptable value of the range.                                                                                                                                                                                                                                             | public   |
| max               | number                         | 100      | The maximum acceptable value of the range.                                                                                                                                                                                                                                             | public   |
| step              | number                         | 1        | The interval at which the range will increase and decrease.                                                                                                                                                                                                                            | public   |
| size              | 'small' \| 'medium' \| 'large' | 'medium' | The range's size.                                                                                                                                                                                                                                                                      | public   |
| tooltipPlacement  | 'top' \| 'bottom' \| 'none'    | 'top'    | The preferred placement of the range's tooltip. Use "none" to disable the tooltip                                                                                                                                                                                                      | public   |
| value             | -                              | -        | The current values of the input (in ascending order) as a string of space separated values                                                                                                                                                                                             | public   |
| restrictMovement  | boolean                        | false    | Set to true to restrict the movement of a thumb to its next and previous thumb. This only affects multi range components                                                                                                                                                               | public   |
| valueAsArray      | -                              | -        | Gets or sets the current values of the range as an array of numbers                                                                                                                                                                                                                    | public   |
| defaultValue      | string                         | '0'      | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                  | public   |
| form              | string                         | ''       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | public   |
| tooltipFormatter  | (value: number) => string      | -        | A function used to format the tooltip's value. The value of the thumb is passed as the only argument. The function should return a string to display in the tooltip.                                                                                                                   | public   |
| baseDiv           | HTMLDivElement                 | -        | -                                                                                                                                                                                                                                                                                      | public   |
| baseControl       | HTMLDivElement                 | -        | -                                                                                                                                                                                                                                                                                      | public   |
| activeTrack       | HTMLDivElement                 | -        | -                                                                                                                                                                                                                                                                                      | public   |
| ticks             | HTMLDivElement                 | -        | -                                                                                                                                                                                                                                                                                      | public   |
| thumbs            | NodeListOf<HTMLDivElement>     | -        | -                                                                                                                                                                                                                                                                                      | public   |
| validationInput   | HTMLInputElement               | -        | -                                                                                                                                                                                                                                                                                      | public   |
| validity          | ValidityState                  | -        | Gets the validity state object                                                                                                                                                                                                                                                         | readonly |
| validationMessage | -                              | -        | Gets the validation message                                                                                                                                                                                                                                                            | readonly |

## Available Methods

| Name              | Parameters            | Return Type | Description                                                                                                     |
| ----------------- | --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| focus             | options: FocusOptions | -           | -                                                                                                               |
| checkValidity     | -                     | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| reportValidity    | -                     | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| setCustomValidity | message: string       | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |
| getForm           | -                     | -           | Gets the associated form, if one exists.                                                                        |

## Available CSS Parts

| Name                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| form-control           | The form control that wraps the label, input, and help text. |
| form-control-label     | The label's wrapper.                                         |
| form-control-help-text | The help text's wrapper.                                     |
| base                   | The component's base wrapper.                                |
| input-wrapper          | The container that wraps the input track and ticks.          |
| track-wrapper          | The wrapper for the track.                                   |
| track                  | The inactive track.                                          |
| active-track           | The active track.                                            |
| prefix                 | The container that wraps the prefix.                         |
| suffix                 | The container that wraps the suffix.                         |
| ticks                  | The container that wraps the tick marks.                     |
| thumb                  | The thumb(s) that the user can drag to change the range.     |
| tooltip\_\_base        | The base of the tooltip                                      |
| tooltip\_\_arrow       | The arrow of the tooltip                                     |
| tooltip\_\_popup       | The popup of the tooltip                                     |
| tooltip\_\_body        | The body of the tooltip                                      |

## Available Events

| Name        | Event Type      | Description                                                                                                          |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| syn-blur    | SynBlurEvent    | Emitted when the control loses focus.                                                                                |
| syn-change  | SynChangeEvent  | Emitted when an alteration to the control's value is committed by the user.                                          |
| syn-focus   | SynFocusEvent   | Emitted when the control gains focus.                                                                                |
| syn-input   | SynInputEvent   | Emitted when the control receives input.                                                                             |
| syn-invalid | SynInvalidEvent | Emitted when the form control has been checked for validity and its constraints aren't satisfied.                    |
| syn-move    | SynMoveEvent    | Emitted when the user moves a thumb, either via touch or keyboard. Use `Event.preventDefault()` to prevent movement. |

## Dependencies

- **syn-tooltip**

## Usage Information

- **Status:** stable
- **Since:** unknown
