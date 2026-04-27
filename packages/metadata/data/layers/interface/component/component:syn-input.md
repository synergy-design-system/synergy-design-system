# syn-input

## Summary

Inputs collect data from the user.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-input--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41337-165221)

## Class Information

- **Tag Name:** `syn-input`
- **Import Example:** `import SynInput from '@synergy-design-system/components/components/input/input.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `label`: The input's label. Alternatively, you can use the `label` attribute.
- `prefix`: Used to prepend a presentational icon or similar element to the input.
- `suffix`: Used to append a presentational icon or similar element to the input.
- `clear-icon`: An icon to use in lieu of the default clear icon.
- `show-password-icon`: An icon to use in lieu of the default show password icon.
- `hide-password-icon`: An icon to use in lieu of the default hide password icon.
- `help-text`: Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
- `increment-number-stepper`: An icon to use in lieu of the default increment number stepper icon.
- `decrement-number-stepper`: An icon to use in lieu of the default decrement number stepper icon.

## Available Properties

### autocapitalize

attribute: `autocapitalize`
reflects: no
type: `'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters'`
default: none

Controls whether and how text input is automatically capitalized as it is entered by the user.

### autocomplete

attribute: `autocomplete`
reflects: no
type: `string`
default: none

Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.

### autocorrect

attribute: `autocorrect`
reflects: yes
type: `boolean`
default: none

Indicates whether the browser's autocorrect feature is on or off.

### autofocus

attribute: `autofocus`
reflects: no
type: `boolean`
default: none

Indicates that the input should receive focus on page load.

### clearable

attribute: `clearable`
reflects: no
type: `boolean`
default: `false`

Adds a clear button when the input is not empty.

### defaultValue

attribute: -
reflects: -
type: `string`
default: `''`

The default value of the form control. Primarily used for resetting the form control.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the input.

### enterkeyhint

attribute: `enterkeyhint`
reflects: no
type: `'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'`
default: none

Used to customize the label or icon of the Enter key on virtual keyboards.

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

The input's help text. If you need to display HTML, use the `help-text` slot instead.

### inputmode

attribute: `inputmode`
reflects: no
type: `'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'`
default: none

Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The input's label. If you need to display HTML, use the `label` slot instead.

### max

attribute: `max`
reflects: no
type: `number | string`
default: none

The input's maximum value. Only applies to date and number input types.

### maxFractionDigits

attribute: `max-fraction-digits`
reflects: no
type: `number`
default: none

The maximal amount of fraction digits to use for numeric values. Used to format the number when the input type is `number`.

### maxlength

attribute: `maxlength`
reflects: no
type: `number`
default: none

The maximum length of input that will be considered valid.

### min

attribute: `min`
reflects: no
type: `number | string`
default: none

The input's minimum value. Only applies to date and number input types.

### minFractionDigits

attribute: `min-fraction-digits`
reflects: no
type: `number`
default: none

The minimal amount of fraction digits to use for numeric values. Used to format the number when the input type is `number`.

### minlength

attribute: `minlength`
reflects: no
type: `number`
default: none

The minimum length of input that will be considered valid.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the input, submitted as a name/value pair with form data.

### noSpinButtons

attribute: `no-spin-buttons`
reflects: no
type: `boolean`
default: `false`

Hides the increment/decrement spin buttons for number inputs.

### numberFormatterOptions

attribute: -
reflects: -
type: `Intl.NumberFormatOptions`
default: none

Optional options that should be passed to the `NumberFormatter` when formatting the value. This is used to format the number when the input type is `number`. Note this can only be set via `property`, not as an `attribute`!

### numericStrategy

attribute: `numeric-strategy`
reflects: no
type: `'native' | 'modern' | Partial<NumericStrategy>`
default: `modernNumericStrategy`

Defines the strategy for handling numbers in the numeric input. This is used to determine how the input behaves when the user interacts with it. Includes the following configuration options: - **autoClamp**: If true, the input will clamp the value to the min and max attributes. - **noStepAlign**: If true, the input will not align the value to the step attribute. - **noStepValidation**: If true, the input will not validate the value against the step attribute. You may provide this as one of the following values: - 'native': Uses the native browser implementation. - 'modern': Uses a more intuitive implementation: - Values are clamped to the nearest min or max value. - Stepping is inclusive to the provided min and max values. - Provided stepping is no longer used in validation. - An object that matches the `NumericStrategy` type. Note this can only be set via `property`, not as an `attribute`!

### passwordToggle

attribute: `password-toggle`
reflects: no
type: `boolean`
default: `false`

Adds a button to toggle the password's visibility. Only applies to password types.

### passwordVisible

attribute: `password-visible`
reflects: no
type: `boolean`
default: `false`

Determines whether or not the password is currently visible. Only applies to password input types.

### pattern

attribute: `pattern`
reflects: no
type: `string`
default: none

A regular expression pattern to validate input against.

### placeholder

attribute: `placeholder`
reflects: no
type: `string`
default: `''`

Placeholder text to show as a hint when the input is empty.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Makes the input readonly.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

Makes the input a required field.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The input's size.

### spellcheck

attribute: `spellcheck`
reflects: no
type: `boolean`
default: `true`

Enables spell checking on the input.

### step

attribute: `step`
reflects: no
type: `number | 'any'`
default: none

Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is implied, allowing any numeric value. Only applies to date and number input types.

### type

attribute: `type`
reflects: yes
type: `| 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'`
default: `'text'`

The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults to `text`.

### value

attribute: `value`
reflects: no
type: `string`
default: `''`

The current value of the input, submitted as a name/value pair with form data.

### valueAsDate

attribute: -
reflects: -
type: `undefined`
default: none

Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.

### valueAsNumber

attribute: -
reflects: -
type: `undefined`
default: none

Gets or sets the current value as a number. Returns `NaN` if the value can't be converted.

## Attribute-only Members

These attributes are reflected but not exposed as component properties.

### title

reflects: yes
type: `string`
default: `''`

-

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the input.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the input.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if one exists.

### reportValidity()

parameters: -
returns: `void`

Checks for validity and shows the browser's validation message if the control is invalid.

### select()

parameters: -
returns: `void`

Selects all the text in the input.

### setCustomValidity()

parameters: `message: string`
returns: `void`

Sets a custom validation message. Pass an empty string to restore validity.

### setRangeText()

parameters: `replacement: string`, `start: number`, `end: number`, `selectMode: 'select' | 'start' | 'end' | 'preserve'`
returns: `void`

Replaces a range of text with a new string.

### setSelectionRange()

parameters: `selectionStart: number`, `selectionEnd: number`, `selectionDirection: 'forward' | 'backward' | 'none'`
returns: `void`

Sets the start and end positions of the text selection (0-based).

### showPicker()

parameters: -
returns: `void`

Displays the browser picker for an input element (only works if the browser supports it for the input type).

### stepDown()

parameters: -
returns: `void`

Decrements the value of a numeric input type by the value of the step attribute.

### stepUp()

parameters: -
returns: `void`

Increments the value of a numeric input type by the value of the step attribute.

## Available CSS Parts

- `base`: The component's base wrapper.
- `clear-button`: The clear button.
- `decrement-number-stepper`: The decrement number stepper button.
- `divider`: The divider between the increment and decrement number stepper buttons.
- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The input's wrapper.
- `form-control-label`: The label's wrapper.
- `increment-number-stepper`: The increment number stepper button.
- `input`: The internal `<input>` control.
- `password-toggle-button`: The password toggle button.
- `prefix`: The container that wraps the prefix.
- `stepper`: The container that wraps the number stepper.
- `suffix`: The container that wraps the suffix.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when an alteration to the control's value is committed by the user.

### syn-clamp

type: `SynClampEvent`

Emitted if the numeric strategy allows autoClamp and the value is clamped to the min or max attribute.

### syn-clear

type: `SynClearEvent`

Emitted when the clear button is activated.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

### syn-input

type: `SynInputEvent`

Emitted when the control receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

## Dependencies

- `syn-divider`
- `syn-icon`
