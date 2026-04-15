# syn-switch

## Summary

Switches allow the user to toggle an option on or off.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-259132)

## Class Information

- **Tag Name:** `syn-switch`
- **Import Example:** `import SynSwitch from '@synergy-design-system/components/components/switch/switch.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The switch's label.
- `help-text`: Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute.

## Available Properties

### checked

attribute: `checked`
reflects: yes
type: `boolean`
default: `false`

Draws the switch in a checked state.

### defaultChecked

attribute: -
reflects: -
type: `boolean`
default: `false`

The default value of the form control. Primarily used for resetting the form control.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the switch.

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

The switch's help text. If you need to display HTML, use the `help-text` slot instead.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the switch, submitted as a name/value pair with form data.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the switch to a readonly state.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

Makes the switch a required field.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The switch's size.

### value

attribute: `value`
reflects: no
type: `string`
default: none

The current value of the switch, submitted as a name/value pair with form data.

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

Removes focus from the switch.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### click()

parameters: -
returns: `void`

Simulates a click on the switch.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the switch.

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

- `base`: The component's base wrapper.
- `control`: The control that houses the switch's thumb.
- `form-control-help-text`: The help text's wrapper.
- `label`: The switch's label.
- `thumb`: The switch's thumb.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when the control's checked state changes.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

### syn-input

type: `SynInputEvent`

Emitted when the control receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.
