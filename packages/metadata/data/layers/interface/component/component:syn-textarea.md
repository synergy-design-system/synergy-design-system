# syn-textarea

## Summary

Textareas collect data from the user and allow multiple lines of text.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-textarea--docs)

## Class Information

- **Module Path:** components/textarea/textarea.js
- **Tag Name:** syn-textarea

## Available Slots

| Name | Description |
|------|-------------|
| label | The textarea's label. Alternatively, you can use the `label` attribute. |
| help-text | Text that describes how to use the input. Alternatively, you can use the `help-text` attribute. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| title | string | '' | - | ✓ |
| name | string | '' | The name of the textarea, submitted as a name/value pair with form data. | - |
| value | string | '' | The current value of the textarea, submitted as a name/value pair with form data. | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The textarea's size. | ✓ |
| label | string | '' | The textarea's label. If you need to display HTML, use the `label` slot instead. | - |
| help-text | string | '' | The textarea's help text. If you need to display HTML, use the `help-text` slot instead. | - |
| placeholder | string | '' | Placeholder text to show as a hint when the input is empty. | - |
| rows | number | 4 | The number of rows to display by default. | - |
| resize | 'none' \| 'vertical' \| 'auto' | 'vertical' | Controls how the textarea can be resized. | - |
| disabled | boolean | false | Disables the textarea. | ✓ |
| readonly | boolean | false | Makes the textarea readonly. | ✓ |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | ✓ |
| required | boolean | false | Makes the textarea a required field. | ✓ |
| minlength | number | - | The minimum length of input that will be considered valid. | - |
| maxlength | number | - | The maximum length of input that will be considered valid. | - |
| autocapitalize | 'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters' | - | Controls whether and how text input is automatically capitalized as it is entered by the user. | - |
| autocorrect | boolean | - | Indicates whether the browser's autocorrect feature is on or off. | ✓ |
| autocomplete | string | - | Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values. | - |
| autofocus | boolean | - | Indicates that the input should receive focus on page load. | - |
| enterkeyhint | 'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send' | - | Used to customize the label or icon of the Enter key on virtual keyboards. | - |
| spellcheck | boolean | true | Enables spell checking on the textarea. | - |
| inputmode | 'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url' | - | Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices. | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| input | HTMLTextAreaElement | - | - | public |
| sizeAdjuster | HTMLTextAreaElement | - | - | public |
| title | string | '' | - | public |
| name | string | '' | The name of the textarea, submitted as a name/value pair with form data. | public |
| value | string | '' | The current value of the textarea, submitted as a name/value pair with form data. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The textarea's size. | public |
| label | string | '' | The textarea's label. If you need to display HTML, use the `label` slot instead. | public |
| helpText | string | '' | The textarea's help text. If you need to display HTML, use the `help-text` slot instead. | public |
| placeholder | string | '' | Placeholder text to show as a hint when the input is empty. | public |
| rows | number | 4 | The number of rows to display by default. | public |
| resize | 'none' \| 'vertical' \| 'auto' | 'vertical' | Controls how the textarea can be resized. | public |
| disabled | boolean | false | Disables the textarea. | public |
| readonly | boolean | false | Makes the textarea readonly. | public |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | public |
| required | boolean | false | Makes the textarea a required field. | public |
| minlength | number | - | The minimum length of input that will be considered valid. | public |
| maxlength | number | - | The maximum length of input that will be considered valid. | public |
| autocapitalize | 'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters' | - | Controls whether and how text input is automatically capitalized as it is entered by the user. | public |
| autocorrect | boolean | - | Indicates whether the browser's autocorrect feature is on or off. | public |
| autocomplete | string | - | Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values. | public |
| autofocus | boolean | - | Indicates that the input should receive focus on page load. | public |
| enterkeyhint | 'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send' | - | Used to customize the label or icon of the Enter key on virtual keyboards. | public |
| spellcheck | boolean | true | Enables spell checking on the textarea. | public |
| inputmode | 'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url' | - | Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices. | public |
| defaultValue | string | '' | The default value of the form control. Primarily used for resetting the form control. | public |
| validity | - | - | Gets the validity state object | readonly |
| validationMessage | - | - | Gets the validation message | readonly |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleDisabledChange | - | - | - |
| handleRowsChange | - | - | - |
| handleValueChange | - | - | - |
| focus | options: FocusOptions | - | Sets focus on the textarea. |
| blur | - | - | Removes focus from the textarea. |
| select | - | - | Selects all the text in the textarea. |
| scrollPosition | position: { top?: number; left?: number } | - | Gets or sets the textarea's scroll position. |
| setSelectionRange | selectionStart: number, selectionEnd: number, selectionDirection: 'forward' \| 'backward' \| 'none' | - | Sets the start and end positions of the text selection (0-based). |
| setRangeText | replacement: string, start: number, end: number, selectMode: 'select' \| 'start' \| 'end' \| 'preserve' | - | Replaces a range of text with a new string. |
| checkValidity | - | - | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm | - | - | Gets the associated form, if one exists. |
| reportValidity | - | - | Checks for validity and shows the browser's validation message if the control is invalid. |
| setCustomValidity | message: string | - | Sets a custom validation message. Pass an empty string to restore validity. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| form-control | The form control that wraps the label, input, and help text. |
| form-control-label | The label's wrapper. |
| form-control-input | The input's wrapper. |
| form-control-help-text | The help text's wrapper. |
| base | The component's base wrapper. |
| textarea | The internal `<textarea>` control. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the control loses focus. |
| syn-change | SynChangeEvent | Emitted when an alteration to the control's value is committed by the user. |
| syn-focus | SynFocusEvent | Emitted when the control gains focus. |
| syn-input | SynInputEvent | Emitted when the control receives input. |
| syn-invalid | SynInvalidEvent | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
