# syn-select

## Summary

Selects allow you to choose items from a menu of predefined options.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-select--docs)

## Class Information

- **Module Path:** components/select/select.js
- **Tag Name:** syn-select

## Available Slots

| Name        | Description                                                                                                |
| ----------- | ---------------------------------------------------------------------------------------------------------- |
| (default)   | The listbox options. Must be `<syn-option>` elements. You can use `<syn-divider>` to group items visually. |
| label       | The input's label. Alternatively, you can use the `label` attribute.                                       |
| prefix      | Used to prepend a presentational icon or similar element to the combobox.                                  |
| suffix      | Used to append a presentational icon or similar element to the combobox.                                   |
| clear-icon  | An icon to use in lieu of the default clear icon.                                                          |
| expand-icon | The icon to show when the control is expanded and collapsed. Rotates on open and close.                    |
| help-text   | Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.            |

## Available Attributes

| Name                | Type                                                                          | Default  | Description                                                                                                                                                                                                                                                                                           | Reflects |
| ------------------- | ----------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| delimiter           | string                                                                        | ' '      | The delimiter to use when setting the value when `multiple` is enabled. The default is a space, but you can set it to a comma or other character.                                                                                                                                                     | -        |
| name                | string                                                                        | ''       | The name of the select, submitted as a name/value pair with form data.                                                                                                                                                                                                                                | -        |
| size                | 'small' \| 'medium' \| 'large'                                                | 'medium' | The select's size.                                                                                                                                                                                                                                                                                    | ✓        |
| placeholder         | string                                                                        | ''       | Placeholder text to show as a hint when the select is empty.                                                                                                                                                                                                                                          | -        |
| multiple            | boolean                                                                       | false    | Allows more than one option to be selected.                                                                                                                                                                                                                                                           | ✓        |
| max-options-visible | number                                                                        | 3        | The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the number of additional items that are selected. Set to 0 to remove the limit.                                                                                             | -        |
| disabled            | boolean                                                                       | false    | Disables the select control.                                                                                                                                                                                                                                                                          | ✓        |
| readonly            | boolean                                                                       | false    | Sets the select to a readonly state.                                                                                                                                                                                                                                                                  | ✓        |
| clearable           | boolean                                                                       | false    | Adds a clear button when the select is not empty.                                                                                                                                                                                                                                                     | -        |
| open                | boolean                                                                       | false    | Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can use the `show()` and `hide()` methods and this attribute will reflect the select's open state.                                                                                       | ✓        |
| label               | string                                                                        | ''       | The select's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                                        | -        |
| placement           | 'top' \| 'bottom'                                                             | 'bottom' | The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox inside of the viewport.                                                                                                                                                           | ✓        |
| help-text           | string                                                                        | ''       | The select's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                                                | -        |
| form                | string                                                                        | ''       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.                | ✓        |
| required            | boolean                                                                       | false    | The select's required attribute.                                                                                                                                                                                                                                                                      | ✓        |
| getTag              | (option: SynOption, index: number) => TemplateResult \| string \| HTMLElement | -        | A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second is the current tag's index. The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at the specified value.            | -        |
| value               | string \| number \| Array<string \| number>                                   | ''       | The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the value attribute will be a space-delimited list of values based on the options selected, and the value property will be an array. **For this reason, values must not contain spaces.** | -        |

## Available Properties

| Name              | Type                                                                          | Default  | Description                                                                                                                                                                                                                                                                                           | Access   |
| ----------------- | ----------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| popup             | SynPopup                                                                      | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| combobox          | HTMLSlotElement                                                               | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| displayInput      | HTMLInputElement                                                              | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| valueInput        | HTMLInputElement                                                              | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| listbox           | HTMLSlotElement                                                               | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| tagContainer      | HTMLDivElement                                                                | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| displayLabel      | string                                                                        | ''       | -                                                                                                                                                                                                                                                                                                     | public   |
| currentOption     | SynOption                                                                     | -        | -                                                                                                                                                                                                                                                                                                     | public   |
| selectedOptions   | SynOption[]                                                                   | []       | -                                                                                                                                                                                                                                                                                                     | public   |
| delimiter         | string                                                                        | ' '      | The delimiter to use when setting the value when `multiple` is enabled. The default is a space, but you can set it to a comma or other character.                                                                                                                                                     | public   |
| name              | string                                                                        | ''       | The name of the select, submitted as a name/value pair with form data.                                                                                                                                                                                                                                | public   |
| value             | -                                                                             | -        | The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the value attribute will be a space-delimited list of values based on the options selected, and the value property will be an array. **For this reason, values must not contain spaces.** | public   |
| defaultValue      | string \| number \| Array<string \| number>                                   | ''       | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                                 | public   |
| size              | 'small' \| 'medium' \| 'large'                                                | 'medium' | The select's size.                                                                                                                                                                                                                                                                                    | public   |
| placeholder       | string                                                                        | ''       | Placeholder text to show as a hint when the select is empty.                                                                                                                                                                                                                                          | public   |
| multiple          | boolean                                                                       | false    | Allows more than one option to be selected.                                                                                                                                                                                                                                                           | public   |
| maxOptionsVisible | number                                                                        | 3        | The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to indicate the number of additional items that are selected. Set to 0 to remove the limit.                                                                                             | public   |
| disabled          | boolean                                                                       | false    | Disables the select control.                                                                                                                                                                                                                                                                          | public   |
| readonly          | boolean                                                                       | false    | Sets the select to a readonly state.                                                                                                                                                                                                                                                                  | public   |
| clearable         | boolean                                                                       | false    | Adds a clear button when the select is not empty.                                                                                                                                                                                                                                                     | public   |
| open              | boolean                                                                       | false    | Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can use the `show()` and `hide()` methods and this attribute will reflect the select's open state.                                                                                       | public   |
| label             | string                                                                        | ''       | The select's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                                        | public   |
| placement         | 'top' \| 'bottom'                                                             | 'bottom' | The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox inside of the viewport.                                                                                                                                                           | public   |
| helpText          | string                                                                        | ''       | The select's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                                                | public   |
| form              | string                                                                        | ''       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.                | public   |
| required          | boolean                                                                       | false    | The select's required attribute.                                                                                                                                                                                                                                                                      | public   |
| getTag            | (option: SynOption, index: number) => TemplateResult \| string \| HTMLElement | -        | A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second is the current tag's index. The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at the specified value.            | public   |
| validity          | -                                                                             | -        | Gets the validity state object                                                                                                                                                                                                                                                                        | readonly |
| validationMessage | -                                                                             | -        | Gets the validation message                                                                                                                                                                                                                                                                           | readonly |
| tags              | -                                                                             | -        | -                                                                                                                                                                                                                                                                                                     | readonly |

## Available Methods

| Name                    | Parameters            | Return Type | Description                                                                                                     |
| ----------------------- | --------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| handleDefaultSlotChange | -                     | -           | -                                                                                                               |
| handleDelimiterChange   | -                     | -           | -                                                                                                               |
| handleDisabledChange    | -                     | -           | -                                                                                                               |
| handleValueChange       | -                     | -           | -                                                                                                               |
| handleOpenChange        | -                     | -           | -                                                                                                               |
| show                    | -                     | -           | Shows the listbox.                                                                                              |
| hide                    | -                     | -           | Hides the listbox.                                                                                              |
| checkValidity           | -                     | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm                 | -                     | -           | Gets the associated form, if one exists.                                                                        |
| reportValidity          | -                     | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| setCustomValidity       | message: string       | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |
| focus                   | options: FocusOptions | -           | Sets focus on the control.                                                                                      |
| blur                    | -                     | -           | Removes focus from the control.                                                                                 |

## Available CSS Parts

| Name                     | Description                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------ |
| form-control             | The form control that wraps the label, input, and help text.                         |
| form-control-label       | The label's wrapper.                                                                 |
| form-control-input       | The select's wrapper.                                                                |
| form-control-help-text   | The help text's wrapper.                                                             |
| combobox                 | The container the wraps the prefix, suffix, combobox, clear icon, and expand button. |
| prefix                   | The container that wraps the prefix slot.                                            |
| suffix                   | The container that wraps the suffix slot.                                            |
| display-input            | The element that displays the selected option's label, an `<input>` element.         |
| listbox                  | The listbox container where options are slotted.                                     |
| tags                     | The container that houses option tags when `multiselect` is used.                    |
| tag                      | The individual tags that represent each multiselect option.                          |
| tag\_\_base              | The tag's base part.                                                                 |
| tag\_\_content           | The tag's content part.                                                              |
| tag\_\_remove-button     | The tag's remove button.                                                             |
| tag**remove-button**base | The tag's remove button base part.                                                   |
| clear-button             | The clear button.                                                                    |
| expand-icon              | The container that wraps the expand icon.                                            |
| popup                    | The popup's exported `popup` part. Use this to target the tooltip's popup container. |

## Available Events

| Name           | Event Type        | Description                                                                                       |
| -------------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| syn-change     | SynChangeEvent    | Emitted when the control's value changes.                                                         |
| syn-clear      | SynClearEvent     | Emitted when the control's value is cleared.                                                      |
| syn-input      | SynInputEvent     | Emitted when the control receives input.                                                          |
| syn-focus      | SynFocusEvent     | Emitted when the control gains focus.                                                             |
| syn-blur       | SynBlurEvent      | Emitted when the control loses focus.                                                             |
| syn-show       | SynShowEvent      | Emitted when the select's menu opens.                                                             |
| syn-after-show | SynAfterShowEvent | Emitted after the select's menu opens and all animations are complete.                            |
| syn-hide       | SynHideEvent      | Emitted when the select's menu closes.                                                            |
| syn-after-hide | SynAfterHideEvent | Emitted after the select's menu closes and all animations are complete.                           |
| syn-invalid    | SynInvalidEvent   | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- **syn-icon**
- **syn-popup**
- **syn-tag**

## Usage Information

- **Status:** stable
- **Since:** 2.0
