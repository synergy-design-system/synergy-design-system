# syn-radio-group

## Summary

Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio-group--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-253349)

## Class Information

- **Tag Name:** `syn-radio-group`
- **Import Example:** `import SynRadioGroup from '@synergy-design-system/components/components/radio-group/radio-group.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The default slot where `<syn-radio>` or `<syn-radio-button>` elements are placed.
- `label`: The radio group's label. Required for proper accessibility. Alternatively, you can use the `label` attribute.
- `help-text`: Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.

## Available Properties

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

The radio groups's help text. If you need to display HTML, use the `help-text` slot instead.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot instead.

### name

attribute: `name`
reflects: no
type: `string`
default: `'option'`

The name of the radio group, submitted as a name/value pair with form data.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

Ensures a child radio is checked before allowing the containing form to submit.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The radio group's size. This size will be applied to all child radios and radio buttons.

### value

attribute: `value`
reflects: yes
type: `string | number`
default: `''`

The current value of the radio group, submitted as a name/value pair with form data.

## Available Methods

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the radio-group.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if one exists.

### reportValidity()

parameters: -
returns: `void`

Checks for validity and shows the browser's validation message if the control is invalid.

### setCustomValidity()

parameters: `message`
returns: `void`

Sets a custom validation message. Pass an empty string to restore validity.

## Available CSS Parts

- `button-group`: The button group that wraps radio buttons.
- `button-group__base`: The button group's `base` part.
- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The input's wrapper.
- `form-control-label`: The label's wrapper.

## Available Events

### syn-change

type: `SynChangeEvent`

Emitted when the radio group's selected value changes.

### syn-input

type: `SynInputEvent`

Emitted when the radio group receives user input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

## Dependencies

- `syn-button-group`
