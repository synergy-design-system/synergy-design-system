# syn-combobox

## Summary

A combobox component that combines the functionality of a text input with a dropdown listbox,
allowing users to either select from predefined options or enter custom values (when not restricted).

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-combobox--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=42207-352063)

## Class Information

- **Tag Name:** `syn-combobox`
- **Import Example:** `import SynCombobox from '@synergy-design-system/components/components/combobox/combobox.js';`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

- `(default)`: The listbox options. Must be `<syn-option>` elements. You can use `<syn-optgroup>`'s to group items visually.
- `label`: The combobox's label. Alternatively, you can use the `label` attribute.
- `prefix`: Used to prepend a presentational icon or similar element to the combobox.
- `suffix`: Used to append a presentational icon or similar element to the combobox.
- `clear-icon`: An icon to use in lieu of the default clear icon.
- `expand-icon`: The icon to show when the control is expanded and collapsed. Rotates on open and close.
- `help-text`: Text that describes how to use the combobox. Alternatively, you can use the `help-text` attribute.

## Available Properties

### clearable

attribute: `clearable`
reflects: no
type: `boolean`
default: `false`

Adds a clear button when the combobox is not empty.

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

The delimiter to use when setting the value when `multiple` is enabled. The default is a space ' ', but you can set it to a comma or other character(s).

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the combobox control.

### filter

attribute: `filter`
reflects: no
type: `(option: SynOption, queryString: string) => boolean`
default: none

A function used to filter options in the combobox component. The default filter method is a case- and diacritic-insensitive string comparison.

### form

attribute: `form`
reflects: yes
type: `string`
default: `''`

By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.

### getOption

attribute: `getOption`
reflects: no
type: `OptionRenderer`
default: `defaultOptionRenderer`

A function that customizes the rendered option. The first argument is the option, the second is the query string, which is typed into the combobox. The function should return either a Lit TemplateResult or a string containing trusted HTML to render in the shown list of filtered options. If the query string should be highlighted use the `highlightOptionRenderer` function.

### getTag

attribute: `getTag`
reflects: no
type: `(option: SynOption, index: number) => TemplateResult | string | HTMLElement`
default: none

A function that customizes the tags to be rendered when `multiple` is true. The first argument is the option, the second is the current tag's index. The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at the specified value.

### helpText

attribute: `help-text`
reflects: no
type: `string`
default: `''`

The combobox's help text. If you need to display HTML, use the `help-text` slot instead.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The combobox's label. If you need to display HTML, use the `label` slot instead.

### maxlength

attribute: `maxlength`
reflects: no
type: `number`
default: none

The maximum length of input that will be considered valid.

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

Allows more than one option to be selected. If `multiple` is set, the combobox will always be `restricted` to the available options

### name

attribute: `name`
reflects: no
type: `string`
default: `''`

The name of the combobox, submitted as a name/value pair with form data.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the combobox is open. You can toggle this attribute to show and hide the listbox, or you can use the `show()` and `hide()` methods and this attribute will reflect the combobox's open state.

### placeholder

attribute: `placeholder`
reflects: no
type: `string`
default: `''`

Placeholder text to show as a hint when the combobox is empty.

### placement

attribute: `placement`
reflects: yes
type: `'top' | 'bottom'`
default: `'bottom'`

The preferred placement of the combobox's menu. Note that the actual placement may vary as needed to keep the listbox inside of the viewport.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the combobox to a readonly state.

### required

attribute: `required`
reflects: yes
type: `boolean`
default: `false`

The combobox's required attribute.

### restricted

attribute: `restricted`
reflects: yes
type: `boolean`
default: `false`

When set to `true`, restricts the combobox to only allow selection from the available options. Users will not be able to enter custom values that are not present in the list. This will always be true, if `multiple` is active.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The combobox's size.

### value

attribute: `value`
reflects: no
type: `undefined`
default: none

The current value of the combobox, submitted as a name/value pair with form data. When `multiple` is enabled, the value attribute will be a list of values separated by the delimiter, based on the options selected, and the value property will be an array. **For this reason, values must not contain the delimiter character.**

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the control.

### checkValidity()

parameters: -
returns: `void`

Checks for validity but does not show a validation message.
Returns `true` when valid and `false` when invalid.

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

Shows the listbox. If it is not possible to open the listbox, because there are no
appropriate filtered options, a syn-error is emitted and the listbox stays closed.

## Available CSS Parts

- `clear-button`: The clear button.
- `combobox`: The container that wraps the prefix, combobox, clear icon, and expand button.
- `display-input`: The element that displays the selected option's label, an `<input>` element.
- `expand-icon`: The container that wraps the expand icon.
- `filtered-listbox`: The container that wraps the filtered options.
- `form-control`: The form control that wraps the label, combobox, and help text.
- `form-control-help-text`: The help text's wrapper.
- `form-control-input`: The combobox's wrapper.
- `form-control-label`: The label's wrapper.
- `listbox`: The listbox container where the options are slotted and the filtered options list exists.
- `no-results`: The container that wraps the "no results" message.
- `popup`: The popup's exported `popup` part. Use this to target the tooltip's popup container.
- `prefix`: The container that wraps the prefix slot.
- `suffix`: The container that wraps the suffix slot.
- `tag`: The individual tags that represent each selected option in `multiple`.
- `tag__base`: The tag's base part.
- `tag__content`: The tag's content part.
- `tag__remove-button`: The tag's remove button.
- `tag__remove-button__base`: The tag's remove button base part.
- `tags`: The container that houses option tags when `multiple` is used.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the combobox's menu closes and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the combobox's menu opens and all animations are complete.

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-change

type: `SynChangeEvent`

Emitted when the control's value changes.

### syn-clear

type: `SynClearEvent`

Emitted when the control's value is cleared.

### syn-error

type: `SynErrorEvent`

Emitted when the combobox menu fails to open.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

### syn-hide

type: `SynHideEvent`

Emitted when the combobox's menu closes.

### syn-input

type: `SynInputEvent`

Emitted when the control receives input.

### syn-invalid

type: `SynInvalidEvent`

Emitted when the form control has been checked for validity and its constraints aren't satisfied.

### syn-show

type: `SynShowEvent`

Emitted when the combobox's menu opens.

## Dependencies

- `syn-icon`
- `syn-popup`
- `syn-tag`
