# syn-select

## Summary

Selects allow you to choose items from a menu of predefined options.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-select--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41325-310740)

## Class Information

- **Tag Name:** `syn-select`
- **Import Example:** `import SynSelect from '@synergy-design-system/components/components/select/select.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The listbox options. Must be `<syn-option>` elements. You can use `<syn-divider>` to group items visually.
- `label`: The input's label. Alternatively, you can use the `label` attribute.
- `prefix`: Used to prepend a presentational icon or similar element to the combobox.
- `suffix`: Used to append a presentational icon or similar element to the combobox.
- `clear-icon`: An icon to use in lieu of the default clear icon.
- `expand-icon`: The icon to show when the control is expanded and collapsed. Rotates on open and close.
- `help-text`: Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.

## Available Properties

### clearable

attribute: `clearable`
reflects: no
type: `boolean`
default: `false`

Adds a clear button when the select is not empty.

### defaultValue

attribute: -
reflects: -
type: `string | number | Array<string | number>`
default: `''`

The default value of the form control. Primarily used for resetting the form control.

### delimiter

attribute: `delimiter`
reflects: no
type: `string`
default: `' '`

The delimiter to use when setting the value when `multiple` is enabled. The default is a space, but you can set it to a comma or other character.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the select control.

### form

attribute: `form`
reflects: yes
type: `string`
default: `''`

By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.

### getTag

attribute: `getTag`
reflects: no
type: `(option: SynOption, index: number) => TemplateResult | string | HTMLElement`
default: none

A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second is the current tag's index. The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at the specified value.

### helpText

attribute: `help-text`
reflects: no
type: `string`
default: `''`

The select's help text. If you need to display HTML, use the `help-text` slot instead.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The select's label. If you need to display HTML, use the `label` slot instead.

### maxOptionsVisible

attribute: `max-options-visible`
reflects: no
type: `number`
default: `3`

The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the number of additional items that are selected. Set to 0 to remove the limit.

### multiple

attribute: `multiple`
reflects: yes
type: `boolean`
default: `false`

Allows more than one option to be selected.

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the select, submitted as a name/value pair with form data.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can use the `show()` and `hide()` methods and this attribute will reflect the select's open state.

### placeholder

attribute: `placeholder`
reflects: no
type: `string`
default: `''`

Placeholder text to show as a hint when the select is empty.

### placement

attribute: `placement`
reflects: yes
type: `'top' | 'bottom'`
default: `'bottom'`

The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox inside of the viewport.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the select to a readonly state.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

The select's required attribute.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The select's size.

### value

attribute: `value`
reflects: no
type: `undefined`
default: none

The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the value attribute will be a space-delimited list of values based on the options selected, and the value property will be an array. **For this reason, values must not contain spaces.**

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the control.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the control.

### getForm()

parameters: -
returns: `void`

Gets the associated form, if one exists.

### hide()

parameters: -
returns: `void`

Hides the listbox.

### reportValidity()

parameters: -
returns: `void`

Checks for validity and shows the browser's validation message if the control is invalid.

### setCustomValidity()

parameters: `message: string`
returns: `void`

Sets a custom validation message. Pass an empty string to restore validity.

### show()

parameters: -
returns: `void`

Shows the listbox.

## Available CSS Parts

- `clear-button`: The clear button.
- `combobox`: The container the wraps the prefix, suffix, combobox, clear icon, and expand button.
- `display-input`: The element that displays the selected option's label, an `<input>` element.
- `expand-icon`: The container that wraps the expand icon.
- `form-control`: The form control that wraps the label, input, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The select's wrapper.
- `form-control-label`: The label's wrapper.
- `listbox`: The listbox container where options are slotted.
- `popup`: The popup's exported `popup` part. Use this to target the tooltip's popup container.
- `prefix`: The container that wraps the prefix slot.
- `suffix`: The container that wraps the suffix slot.
- `tag`: The individual tags that represent each multiselect option.
- `tag__base`: The tag's base part.
- `tag__content`: The tag's content part.
- `tag__remove-button`: The tag's remove button.
- `tag__remove-button__base`: The tag's remove button base part.
- `tags`: The container that houses option tags when `multiselect` is used.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the select's menu closes and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the select's menu opens and all animations are complete.

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when the control's value changes.

### syn-clear

type: `SynClearEvent`

Emitted when the control's value is cleared.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

### syn-hide

type: `SynHideEvent`

Emitted when the select's menu closes.

### syn-input

type: `SynInputEvent`

Emitted when the control receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

### syn-show

type: `SynShowEvent`

Emitted when the select's menu opens.

## Dependencies

- `syn-icon`
- `syn-popup`
- `syn-tag`
