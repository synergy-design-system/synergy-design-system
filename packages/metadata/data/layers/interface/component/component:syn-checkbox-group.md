# syn-checkbox-group

## Summary

Checkbox groups are used to group multiple checkboxes together.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox-group--docs)
- [Figma Examples](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=50279-43830)
- [Figma Component](https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=50279-41408)

## Class Information

- **Tag Name:** `syn-checkbox-group`
- **Import Example:** `import SynCheckboxGroup from '@synergy-design-system/components/components/checkbox-group/checkbox-group.js';`

## Usage Information

- **Status:** stable
- **Since:** 3.18.0

## Available Slots

- `(default)`: The default slot where `<syn-checkbox>` and `<syn-switch>` elements are placed.
- `label`: The checkbox group's label. Required for proper accessibility. Alternatively, you can use the `label` attribute.
- `help-text`: Text that describes how to use the checkbox group. Alternatively, you can use the `help-text` attribute.

## Available Properties

### form

attribute: `form`
reflects: yes
type: `string`
default: `''`

By default, form controls are associated with the nearest containing `<form>` element.
This property allows you to specify the `id` of a `<form>` element to associate all of the slotted checkboxes and radios with.

Please note that this property does not associate the checkbox group itself with a form, only the slotted checkboxes and radios.

### helpText

attribute: `help-text`
reflects: no
type: `string`
default: `''`

The checkbox groups's help text. If you need to display HTML, use the `help-text` slot instead.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The checkbox group's label. Required for proper accessibility.
If you need to display HTML, use the `label` slot instead.

### layout

attribute: `layout`
reflects: yes
type: `'horizontal' | 'vertical'`
default: `'vertical'`

The layout of the checkbox group. This determines how the checkboxes are displayed.

- `horizontal`: Checkboxes are displayed in a row.
- `vertical`: Checkboxes are displayed in a column.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The checkbox group's size. This size will be applied to all child checkboxes.

## Available Methods

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the checkbox-group.
Will automatically set focus on the first checkbox in the group that is not disabled.

## Available CSS Parts

- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The input's wrapper.
- `form-control-label`: The label's wrapper.
