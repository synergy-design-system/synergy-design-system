# syn-file

## Summary

File controls allow selecting an arbitrary number of files for uploading.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-file--docs)

## Class Information

- **Module Path:** components/file/file.js
- **Tag Name:** syn-file

## Available Slots

| Name | Description |
|------|-------------|
| label | The file control's label. Alternatively, you can use the `label` attribute. |
| help-text | Text that describes how to use the file control. Alternatively, you can use the `help-text` attribute. |
| droparea-icon | Optional droparea icon to use instead of the default. Works best with `<syn-icon>`. |
| trigger | Optional content to be used as trigger instead of the default content. Opening the file dialog on click and as well as drag and drop will work for this content. Following attributes will no longer work: *label*, *droparea*, *help-text*, *size*, *hide-value*. Also if using the disabled attribute, the disabled styling will not be applied and must be taken care of yourself. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| files | - | - | The selected files as a FileList object containing a list of File objects. The FileList behaves like an array, so you can get the number of selected files via its length property. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files) | - |
| name | string | '' | The name of the file control, submitted as a name/value pair with form data. | - |
| value | - | - | The value of the file control contains a string that represents the path of the selected file. If multiple files are selected, the value represents the first file in the list. If no file is selected, the value is an empty string. Beware that the only valid value when setting a file control is an empty string! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value) | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The file control's size. | ✓ |
| label | string | '' | The file control's label. If you need to display HTML, use the `label` slot instead. | - |
| help-text | string | '' | The file control's help text. If you need to display HTML, use the `help-text` slot instead. | - |
| disabled | boolean | false | Disables the file control. | ✓ |
| readonly | boolean | false | Sets the file control to a readonly state. | ✓ |
| droparea | boolean | false | Draw the file control as a drop area | - |
| accept | string | '' | Comma separated list of supported file types [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) | - |
| capture | 'user' \| 'environment' | - | Specifies the types of files that the server accepts. Can be set either to user or environment. Works only when not using a droparea! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture) | - |
| multiple | boolean | false | Indicates whether the user can select more than one file. Has no effect if webkitdirectory is set. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple) | ✓ |
| webkitdirectory | boolean | false | Indicates that the file control should let the user select directories instead of files. When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items. Note: This is a non-standard attribute but is supported in the major browsers. [see MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) | ✓ |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | ✓ |
| required | boolean | false | Makes the input a required field. | ✓ |
| hide-value | boolean | false | Suppress the value from being displayed in the file control | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| files | - | - | The selected files as a FileList object containing a list of File objects. The FileList behaves like an array, so you can get the number of selected files via its length property. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files) | public |
| name | string | '' | The name of the file control, submitted as a name/value pair with form data. | public |
| value | - | - | The value of the file control contains a string that represents the path of the selected file. If multiple files are selected, the value represents the first file in the list. If no file is selected, the value is an empty string. Beware that the only valid value when setting a file control is an empty string! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value) | public |
| defaultValue | string | '' | The default value of the form control. Primarily used for resetting the form control. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The file control's size. | public |
| label | string | '' | The file control's label. If you need to display HTML, use the `label` slot instead. | public |
| helpText | string | '' | The file control's help text. If you need to display HTML, use the `help-text` slot instead. | public |
| disabled | boolean | false | Disables the file control. | public |
| readonly | boolean | false | Sets the file control to a readonly state. | public |
| droparea | boolean | false | Draw the file control as a drop area | public |
| accept | string | '' | Comma separated list of supported file types [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept) | public |
| capture | 'user' \| 'environment' | - | Specifies the types of files that the server accepts. Can be set either to user or environment. Works only when not using a droparea! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture) | public |
| multiple | boolean | false | Indicates whether the user can select more than one file. Has no effect if webkitdirectory is set. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple) | public |
| webkitdirectory | boolean | false | Indicates that the file control should let the user select directories instead of files. When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items. Note: This is a non-standard attribute but is supported in the major browsers. [see MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory) | public |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | public |
| required | boolean | false | Makes the input a required field. | public |
| hideValue | boolean | false | Suppress the value from being displayed in the file control | public |
| input | HTMLInputElement | - | - | public |
| button | SynButton | - | - | public |
| dropareaWrapper | HTMLDivElement | - | - | public |
| dropareaIcon | HTMLSpanElement | - | - | public |
| inputChosen | HTMLSpanElement | - | - | public |
| validity | - | - | Gets the validity state object | readonly |
| validationMessage | - | - | Gets the validation message | readonly |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| checkValidity | - | - | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm | - | - | Gets the associated form, if one exists. |
| reportValidity | - | - | Checks for validity and shows the browser's validation message if the control is invalid. |
| setCustomValidity | message: string | - | Sets a custom validation message. Pass an empty string to restore validity. |
| handleDisabledChange | - | - | - |
| handleValueChange | - | - | - |
| focus | options: FocusOptions | - | Sets focus on the button or droparea. |
| blur | - | - | Removes focus from the button or droparea. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| form-control | The form control that wraps the label, input, and help text. |
| form-control-label | The label's wrapper. |
| form-control-input | The input's wrapper. |
| form-control-help-text | The help text's wrapper. |
| button-wrapper | The wrapper around the button and text value. |
| button | The syn-button acting as a file input. |
| button__base | The syn-button's exported `base` part. |
| value | The chosen files or placeholder text for the file input. |
| droparea | The element wrapping the drop zone. |
| droparea-background | The background of the drop zone. |
| droparea-icon | The container that wraps the icon for the drop zone. |
| droparea-value | The text for the drop zone. |
| trigger | The container that wraps the trigger. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the control loses focus. |
| syn-change | SynChangeEvent | Emitted when an alteration to the control's value is committed by the user. |
| syn-error | SynErrorEvent | Emitted when multiple files are selected via drag and drop, without the `multiple` property being set. |
| syn-focus | SynFocusEvent | Emitted when the control gains focus. |
| syn-input | SynInputEvent | Emitted when the control receives input. |

## Dependencies

- **syn-button**
- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** unknown
