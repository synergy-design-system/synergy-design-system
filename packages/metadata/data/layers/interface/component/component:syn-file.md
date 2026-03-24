# syn-file

## Summary

File controls allow selecting an arbitrary number of files for uploading.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-file--docs)

## Class Information

- **Import Example:** `import SynFile from '@synergy-design-system/components/components/file/file.js';`
- **Module Path:** components/file/file.js
- **Tag Name:** `syn-file`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

| Name          | Description                                                                                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label         | The file control's label. Alternatively, you can use the `label` attribute.                                                                                                                                                                                                                                                                                                           |
| help-text     | Text that describes how to use the file control. Alternatively, you can use the `help-text` attribute.                                                                                                                                                                                                                                                                                |
| droparea-icon | Optional droparea icon to use instead of the default. Works best with `<syn-icon>`.                                                                                                                                                                                                                                                                                                   |
| trigger       | Optional content to be used as trigger instead of the default content. Opening the file dialog on click and as well as drag and drop will work for this content. Following attributes will no longer work: _label_, _droparea_, _help-text_, _size_, _hide-value_. Also if using the disabled attribute, the disabled styling will not be applied and must be taken care of yourself. |

## Available Properties

| Property        | Attribute         | Reflects | Type                             | Default    | Description                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ----------------- | :------: | -------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accept          | `accept`          |    -     | `string`                         | `''`       | Comma separated list of supported file types [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)                                                                                                                                                                                                                                                                                  |
| capture         | `capture`         |    -     | `'user' \| 'environment'`        | -          | Specifies the types of files that the server accepts. Can be set either to user or environment. Works only when not using a droparea! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture)                                                                                                                                                                                        |
| defaultValue    | -                 |    -     | `string`                         | `''`       | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                                                                                                                                        |
| disabled        | `disabled`        |    ✓     | `boolean`                        | `false`    | Disables the file control.                                                                                                                                                                                                                                                                                                                                                                                   |
| droparea        | `droparea`        |    -     | `boolean`                        | `false`    | Draw the file control as a drop area                                                                                                                                                                                                                                                                                                                                                                         |
| files           | `files`           |    -     | `-`                              | -          | The selected files as a FileList object containing a list of File objects. The FileList behaves like an array, so you can get the number of selected files via its length property. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#getting_information_on_selected_files)                                                                                                    |
| form            | `form`            |    ✓     | `string`                         | `''`       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work.                                                                                                                       |
| helpText        | `help-text`       |    -     | `string`                         | `''`       | The file control's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                                                                                                                                                 |
| hideValue       | `hide-value`      |    -     | `boolean`                        | `false`    | Suppress the value from being displayed in the file control                                                                                                                                                                                                                                                                                                                                                  |
| label           | `label`           |    -     | `string`                         | `''`       | The file control's label. If you need to display HTML, use the `label` slot instead.                                                                                                                                                                                                                                                                                                                         |
| multiple        | `multiple`        |    ✓     | `boolean`                        | `false`    | Indicates whether the user can select more than one file. Has no effect if webkitdirectory is set. [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple)                                                                                                                                                                                                                  |
| name            | `name`            |    -     | `string`                         | `''`       | The name of the file control, submitted as a name/value pair with form data.                                                                                                                                                                                                                                                                                                                                 |
| readonly        | `readonly`        |    ✓     | `boolean`                        | `false`    | Sets the file control to a readonly state.                                                                                                                                                                                                                                                                                                                                                                   |
| required        | `required`        |    ✓     | `boolean`                        | `false`    | Makes the input a required field.                                                                                                                                                                                                                                                                                                                                                                            |
| size            | `size`            |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The file control's size.                                                                                                                                                                                                                                                                                                                                                                                     |
| value           | `value`           |    -     | `-`                              | -          | The value of the file control contains a string that represents the path of the selected file. If multiple files are selected, the value represents the first file in the list. If no file is selected, the value is an empty string. Beware that the only valid value when setting a file control is an empty string! [see MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#value) |
| webkitdirectory | `webkitdirectory` |    ✓     | `boolean`                        | `false`    | Indicates that the file control should let the user select directories instead of files. When a directory is selected, the directory and its entire hierarchy of contents are included in the set of selected items. Note: This is a non-standard attribute but is supported in the major browsers. [see MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory)             |

## Available Methods

| Name                  | Parameters              | Return Type | Description                                                                                                     |
| --------------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `blur()`              | -                       | -           | Removes focus from the button or droparea.                                                                      |
| `checkValidity()`     | -                       | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| `focus()`             | `options: FocusOptions` | -           | Sets focus on the button or droparea.                                                                           |
| `getForm()`           | -                       | -           | Gets the associated form, if one exists.                                                                        |
| `reportValidity()`    | -                       | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| `setCustomValidity()` | `message: string`       | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |

## Available CSS Parts

| Name                   | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| button                 | The syn-button acting as a file input.                       |
| button\_\_base         | The syn-button's exported `base` part.                       |
| button-wrapper         | The wrapper around the button and text value.                |
| droparea               | The element wrapping the drop zone.                          |
| droparea-background    | The background of the drop zone.                             |
| droparea-icon          | The container that wraps the icon for the drop zone.         |
| droparea-value         | The text for the drop zone.                                  |
| form-control           | The form control that wraps the label, input, and help text. |
| form-control-help-text | The help text's wrapper.                                     |
| form-control-input     | The input's wrapper.                                         |
| form-control-label     | The label's wrapper.                                         |
| trigger                | The container that wraps the trigger.                        |
| value                  | The chosen files or placeholder text for the file input.     |

## Available Events

| Name       | Event Type       | Description                                                                                            |
| ---------- | ---------------- | ------------------------------------------------------------------------------------------------------ |
| syn-blur   | `SynBlurEvent`   | Emitted when the control loses focus.                                                                  |
| syn-change | `SynChangeEvent` | Emitted when an alteration to the control's value is committed by the user.                            |
| syn-error  | `SynErrorEvent`  | Emitted when multiple files are selected via drag and drop, without the `multiple` property being set. |
| syn-focus  | `SynFocusEvent`  | Emitted when the control gains focus.                                                                  |
| syn-input  | `SynInputEvent`  | Emitted when the control receives input.                                                               |

## Dependencies

- `syn-button`
- `syn-icon`
