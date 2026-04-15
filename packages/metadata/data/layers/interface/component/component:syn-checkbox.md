# syn-checkbox

## Summary

Checkboxes allow the user to toggle an option on or off.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-257927)

## Class Information

- **Tag Name:** `syn-checkbox`
- **Import Example:** `import SynCheckbox from '@synergy-design-system/components/components/checkbox/checkbox.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The checkbox's label.
- `help-text`: Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute.

## Available Properties

### checked

attribute: `checked`
reflects: yes
type: `boolean`
default: `false`

Draws the checkbox in a checked state.

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

Disables the checkbox.

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

The checkbox's help text. If you need to display HTML, use the `help-text` slot instead.

### indeterminate

attribute: `indeterminate`
reflects: yes
type: `boolean`
default: `false`

Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select all/none" behavior when associated checkboxes have a mix of checked and unchecked states.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the checkbox, submitted as a name/value pair with form data.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the checkbox to a readonly state.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

Makes the checkbox a required field.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The checkbox's size.

### value

attribute: `value`
reflects: no
type: `string`
default: none

The current value of the checkbox, submitted as a name/value pair with form data.

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

Removes focus from the checkbox.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### click()

parameters: -
returns: `void`

Simulates a click on the checkbox.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the checkbox.

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

Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
the custom validation message, call this method with an empty string.

## Available CSS Parts

- `base`: The component's base wrapper.
- `checked-icon`: The checked icon, an `<syn-icon>` element.
- `control`: The square container that wraps the checkbox's checked state.
- `control--checked`: Matches the control part when the checkbox is checked.
- `control--indeterminate`: Matches the control part when the checkbox is indeterminate.
- `form-control-help-text`: The help text's wrapper.
- `indeterminate-icon`: The indeterminate icon, an `<syn-icon>` element.
- `label`: The container that wraps the checkbox's label.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the checkbox loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when the checked state changes.

### syn-focus

type: `SynFocusEvent`

Emitted when the checkbox gains focus.

### syn-input

type: `SynInputEvent`

Emitted when the checkbox receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

## Dependencies

- `syn-icon`
