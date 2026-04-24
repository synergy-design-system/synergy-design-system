# syn-range

## Summary

Ranges allow the user to select values within a given range using one or two thumbs.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-range--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-323916)

## Class Information

- **Tag Name:** `syn-range`
- **Import Example:** `import SynRange from '@synergy-design-system/components/components/range/range.js';`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

- `label`: The range's label. Alternatively, you can use the `label` attribute.
- `prefix`: Used to prepend a presentational icon or similar element to the range.
- `suffix`: Used to append a presentational icon or similar element to the range.
- `help-text`: Text that describes how to use the range. Alternatively, you can use the `help-text` attribute.
- `ticks`: Used to display tick marks at specific intervals along the range.

## Available Properties

### defaultValue

attribute: -
reflects: -
type: `string`
default: `'0'`

The default value of the form control. Primarily used for resetting the form control.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the range.

### form

attribute: `form`
reflects: yes
type: `string`
default: `''`

By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.

### helpText

attribute: `help-text`
reflects: no
type: `string`
default: `''`

The range's help text. If you need to display HTML, use the help-text slot instead.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The range's label. If you need to display HTML, use the `label` slot instead.

### max

attribute: `max`
reflects: no
type: `number`
default: `100`

The maximum acceptable value of the range.

### min

attribute: `min`
reflects: no
type: `number`
default: `0`

The minimum acceptable value of the range.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the range, submitted as a name/value pair with form data.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the range to a readonly state.

### restrictMovement

attribute: `restrict-movement`
reflects: no
type: `boolean`
default: `false`

Set to true to restrict the movement of a thumb to its next and previous thumb. This only affects multi range components

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The range's size.

### step

attribute: `step`
reflects: no
type: `number`
default: `1`

The interval at which the range will increase and decrease.

### tooltipFormatter

attribute: -
reflects: -
type: `(value: number) => string`
default: none

A function used to format the tooltip's value. The value of the thumb is passed as the only argument. The function should return a string to display in the tooltip.

### tooltipPlacement

attribute: `tooltip-placement`
reflects: no
type: `'top' | 'bottom' | 'none'`
default: `'top'`

The preferred placement of the range's tooltip. Use "none" to disable the tooltip

### value

attribute: `value`
reflects: no
type: `undefined`
default: none

The current values of the input (in ascending order) as a string of space separated values

### valueAsArray

attribute: -
reflects: -
type: `undefined`
default: none

Gets or sets the current values of the range as an array of numbers

## Available Methods

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message.
Returns `true` when valid and `false` when invalid.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if one exists.

### reportValidity()

parameters: -
returns: `void`

Checks for validity and shows the browser's validation message if the control is invalid.

### setCustomValidity()

parameters: `message: string`
returns: `void`

Sets a custom validation message. Pass an empty string to restore validity.

## Available CSS Parts

- `active-track`: The active track.
- `base`: The component's base wrapper.
- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-label`: The label's wrapper.
- `input-wrapper`: The container that wraps the input track and ticks.
- `prefix`: The container that wraps the prefix.
- `suffix`: The container that wraps the suffix.
- `thumb`: The thumb(s) that the user can drag to change the range.
- `ticks`: The container that wraps the tick marks.
- `tooltip__arrow`: The arrow of the tooltip
- `tooltip__base`: The base of the tooltip
- `tooltip__body`: The body of the tooltip
- `tooltip__popup`: The popup of the tooltip
- `track`: The inactive track.
- `track-wrapper`: The wrapper for the track.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when an alteration to the control's value is committed by the user.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

### syn-input

type: `SynInputEvent`

Emitted when the control receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

### syn-move

type: `SynMoveEvent`

Emitted when the user moves a thumb, either via touch or keyboard. Use `Event.preventDefault()` to prevent movement.

## Dependencies

- `syn-tooltip`
