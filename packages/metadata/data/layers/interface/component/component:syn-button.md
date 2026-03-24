# syn-button

## Summary

Buttons represent actions that are available to the user.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs)

## Class Information

- **Import Example:** `import SynButton from '@synergy-design-system/components/components/button/button.js';`
- **Module Path:** components/button/button.js
- **Tag Name:** `syn-button`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| (default) | The button's label.                              |
| prefix    | A presentational prefix icon or similar element. |
| suffix    | A presentational suffix icon or similar element. |

## Available Properties

| Property       | Attribute        | Reflects | Type                                                                           | Default                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------- | ---------------- | :------: | ------------------------------------------------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| caret          | `caret`          |    ✓     | `boolean`                                                                      | `false`                 | Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior.                                                                                                                                                                                                                                                                                                                     |
| disabled       | `disabled`       |    ✓     | `boolean`                                                                      | `false`                 | Disables the button.                                                                                                                                                                                                                                                                                                                                                                                                              |
| download       | `download`       |    -     | `string \| undefined`                                                          | -                       | Tells the browser to download the linked file as this filename. Only used when `href` is present.                                                                                                                                                                                                                                                                                                                                 |
| form           | `form`           |    -     | `string`                                                                       | -                       | The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The value of this attribute must be an id of a form in the same document or shadow root as the button.                                                                                                                                                                                                               |
| formAction     | `formaction`     |    -     | `string`                                                                       | -                       | Used to override the form owner's `action` attribute.                                                                                                                                                                                                                                                                                                                                                                             |
| formEnctype    | `formenctype`    |    -     | `'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain'` | -                       | Used to override the form owner's `enctype` attribute.                                                                                                                                                                                                                                                                                                                                                                            |
| formMethod     | `formmethod`     |    -     | `'post' \| 'get'`                                                              | -                       | Used to override the form owner's `method` attribute.                                                                                                                                                                                                                                                                                                                                                                             |
| formNoValidate | `formnovalidate` |    -     | `boolean`                                                                      | -                       | Used to override the form owner's `novalidate` attribute.                                                                                                                                                                                                                                                                                                                                                                         |
| formTarget     | `formtarget`     |    -     | `'_self' \| '_blank' \| '_parent' \| '_top' \| string`                         | -                       | Used to override the form owner's `target` attribute.                                                                                                                                                                                                                                                                                                                                                                             |
| href           | `href`           |    -     | `string`                                                                       | `''`                    | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`.                                                                                                                                                                                                                                                                                                                            |
| loading        | `loading`        |    ✓     | `boolean`                                                                      | `false`                 | Draws the button in a loading state.                                                                                                                                                                                                                                                                                                                                                                                              |
| name           | `name`           |    -     | `string`                                                                       | `''`                    | The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter. This attribute is ignored when `href` is present.                                                                                                                                                                                                                                                              |
| rel            | `rel`            |    -     | `string`                                                                       | `'noreferrer noopener'` | When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. |
| size           | `size`           |    ✓     | `'small' \| 'medium' \| 'large'`                                               | `'medium'`              | The button's size.                                                                                                                                                                                                                                                                                                                                                                                                                |
| target         | `target`         |    -     | `'_blank' \| '_parent' \| '_self' \| '_top'`                                   | -                       | Tells the browser where to open the link. Only used when `href` is present.                                                                                                                                                                                                                                                                                                                                                       |
| type           | `type`           |    -     | `'button' \| 'submit' \| 'reset'`                                              | `'button'`              | The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.                                                                                                                                                                                                              |
| value          | `value`          |    -     | `string`                                                                       | `''`                    | The value of the button, submitted as a pair with the button's name as part of the form data, but only when this button is the submitter. This attribute is ignored when `href` is present.                                                                                                                                                                                                                                       |
| variant        | `variant`        |    ✓     | `'filled' \| 'outline' \| 'text'`                                              | `'outline'`             | The button's theme variant.                                                                                                                                                                                                                                                                                                                                                                                                       |

## Attribute-only Members

| Name  | Type     | Default | Description |
| ----- | -------- | ------- | ----------- |
| title | `string` | `''`    | -           |

## Available Methods

| Name                  | Parameters              | Return Type | Description                                                                                                     |
| --------------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `blur()`              | -                       | -           | Removes focus from the button.                                                                                  |
| `checkValidity()`     | -                       | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| `click()`             | -                       | -           | Simulates a click on the button.                                                                                |
| `focus()`             | `options: FocusOptions` | -           | Sets focus on the button.                                                                                       |
| `getForm()`           | -                       | -           | Gets the associated form, if one exists.                                                                        |
| `reportValidity()`    | -                       | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| `setCustomValidity()` | `message: string`       | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |

## Available CSS Parts

| Name    | Description                                                     |
| ------- | --------------------------------------------------------------- |
| base    | The component's base wrapper.                                   |
| caret   | The button's caret icon, an `<syn-icon>` element.               |
| label   | The button's label.                                             |
| prefix  | The container that wraps the prefix.                            |
| spinner | The spinner that shows when the button is in the loading state. |
| suffix  | The container that wraps the suffix.                            |

## Available Events

| Name        | Event Type        | Description                                                                                       |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| syn-blur    | `SynBlurEvent`    | Emitted when the button loses focus.                                                              |
| syn-focus   | `SynFocusEvent`   | Emitted when the button gains focus.                                                              |
| syn-invalid | `SynInvalidEvent` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- `syn-icon`
- `syn-spinner`
