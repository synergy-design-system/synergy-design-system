# syn-textarea

## Summary

Textareas collect data from the user and allow multiple lines of text.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-textarea--docs)

## Class Information

- **Import Example:** `import SynTextarea from '@synergy-design-system/components/components/textarea/textarea.js';`
- **Module Path:** components/textarea/textarea.js
- **Tag Name:** `syn-textarea`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------- |
| label     | The textarea's label. Alternatively, you can use the `label` attribute.                         |
| help-text | Text that describes how to use the input. Alternatively, you can use the `help-text` attribute. |

## Available Properties

| Property       | Attribute        | Reflects | Type                                                                                  | Default      | Description                                                                                                                                                                                                                                                                            |
| -------------- | ---------------- | :------: | ------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autocapitalize | `autocapitalize` |    -     | `'off' \| 'none' \| 'on' \| 'sentences' \| 'words' \| 'characters'`                   | -            | Controls whether and how text input is automatically capitalized as it is entered by the user.                                                                                                                                                                                         |
| autocomplete   | `autocomplete`   |    -     | `string`                                                                              | -            | Specifies what permission the browser has to provide assistance in filling out form field values. Refer to [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.                                                         |
| autocorrect    | `autocorrect`    |    ✓     | `boolean`                                                                             | -            | Indicates whether the browser's autocorrect feature is on or off.                                                                                                                                                                                                                      |
| autofocus      | `autofocus`      |    -     | `boolean`                                                                             | -            | Indicates that the input should receive focus on page load.                                                                                                                                                                                                                            |
| defaultValue   | -                |    -     | `string`                                                                              | `''`         | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                  |
| disabled       | `disabled`       |    ✓     | `boolean`                                                                             | `false`      | Disables the textarea.                                                                                                                                                                                                                                                                 |
| enterkeyhint   | `enterkeyhint`   |    -     | `'enter' \| 'done' \| 'go' \| 'next' \| 'previous' \| 'search' \| 'send'`             | -            | Used to customize the label or icon of the Enter key on virtual keyboards.                                                                                                                                                                                                             |
| form           | `form`           |    ✓     | `string`                                                                              | `''`         | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. |
| helpText       | `help-text`      |    -     | `string`                                                                              | `''`         | The textarea's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                               |
| inputmode      | `inputmode`      |    -     | `'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'` | -            | Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual keyboard on supportive devices.                                                                                                                                        |
| label          | `label`          |    -     | `string`                                                                              | `''`         | The textarea's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                       |
| maxlength      | `maxlength`      |    -     | `number`                                                                              | -            | The maximum length of input that will be considered valid.                                                                                                                                                                                                                             |
| minlength      | `minlength`      |    -     | `number`                                                                              | -            | The minimum length of input that will be considered valid.                                                                                                                                                                                                                             |
| name           | `name`           |    -     | `string`                                                                              | `''`         | The name of the textarea, submitted as a name/value pair with form data.                                                                                                                                                                                                               |
| placeholder    | `placeholder`    |    -     | `string`                                                                              | `''`         | Placeholder text to show as a hint when the input is empty.                                                                                                                                                                                                                            |
| readonly       | `readonly`       |    ✓     | `boolean`                                                                             | `false`      | Makes the textarea readonly.                                                                                                                                                                                                                                                           |
| required       | `required`       |    ✓     | `boolean`                                                                             | `false`      | Makes the textarea a required field.                                                                                                                                                                                                                                                   |
| resize         | `resize`         |    -     | `'none' \| 'vertical' \| 'auto'`                                                      | `'vertical'` | Controls how the textarea can be resized.                                                                                                                                                                                                                                              |
| rows           | `rows`           |    -     | `number`                                                                              | `4`          | The number of rows to display by default.                                                                                                                                                                                                                                              |
| size           | `size`           |    ✓     | `'small' \| 'medium' \| 'large'`                                                      | `'medium'`   | The textarea's size.                                                                                                                                                                                                                                                                   |
| spellcheck     | `spellcheck`     |    -     | `boolean`                                                                             | `true`       | Enables spell checking on the textarea.                                                                                                                                                                                                                                                |
| value          | `value`          |    -     | `string`                                                                              | `''`         | The current value of the textarea, submitted as a name/value pair with form data.                                                                                                                                                                                                      |

## Attribute-only Members

| Name  | Type     | Default | Description |
| ----- | -------- | ------- | ----------- |
| title | `string` | `''`    | -           |

## Available Methods

| Name                  | Parameters                                                                                                      | Return Type | Description                                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `blur()`              | -                                                                                                               | -           | Removes focus from the textarea.                                                                                |
| `checkValidity()`     | -                                                                                                               | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| `focus()`             | `options: FocusOptions`                                                                                         | -           | Sets focus on the textarea.                                                                                     |
| `getForm()`           | -                                                                                                               | -           | Gets the associated form, if one exists.                                                                        |
| `reportValidity()`    | -                                                                                                               | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| `scrollPosition()`    | `position: { top?: number; left?: number }`                                                                     | -           | Gets or sets the textarea's scroll position.                                                                    |
| `select()`            | -                                                                                                               | -           | Selects all the text in the textarea.                                                                           |
| `setCustomValidity()` | `message: string`                                                                                               | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |
| `setRangeText()`      | `replacement: string`, `start: number`, `end: number`, `selectMode: 'select' \| 'start' \| 'end' \| 'preserve'` | -           | Replaces a range of text with a new string.                                                                     |
| `setSelectionRange()` | `selectionStart: number`, `selectionEnd: number`, `selectionDirection: 'forward' \| 'backward' \| 'none'`       | -           | Sets the start and end positions of the text selection (0-based).                                               |

## Available CSS Parts

| Name                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| base                   | The component's base wrapper.                                |
| form-control           | The form control that wraps the label, input, and help text. |
| form-control-help-text | The help text's wrapper.                                     |
| form-control-input     | The input's wrapper.                                         |
| form-control-label     | The label's wrapper.                                         |
| textarea               | The internal `<textarea>` control.                           |

## Available Events

| Name        | Event Type        | Description                                                                                       |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| syn-blur    | `SynBlurEvent`    | Emitted when the control loses focus.                                                             |
| syn-change  | `SynChangeEvent`  | Emitted when an alteration to the control's value is committed by the user.                       |
| syn-focus   | `SynFocusEvent`   | Emitted when the control gains focus.                                                             |
| syn-input   | `SynInputEvent`   | Emitted when the control receives input.                                                          |
| syn-invalid | `SynInvalidEvent` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |
