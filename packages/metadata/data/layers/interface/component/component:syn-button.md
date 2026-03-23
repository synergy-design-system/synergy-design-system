# syn-button

## Summary

Buttons represent actions that are available to the user.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button--docs)

## Class Information

- **Module Path:** components/button/button.js
- **Tag Name:** syn-button

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The button's label. |
| prefix | A presentational prefix icon or similar element. |
| suffix | A presentational suffix icon or similar element. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| title | string | '' | - | ✓ |
| variant | 'filled' \| 'outline' \| 'text' | 'outline' | The button's theme variant. | ✓ |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The button's size. | ✓ |
| caret | boolean | false | Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. | ✓ |
| disabled | boolean | false | Disables the button. | ✓ |
| loading | boolean | false | Draws the button in a loading state. | ✓ |
| type | 'button' \| 'submit' \| 'reset' | 'button' | The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form. | - |
| name | string | '' | The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter. This attribute is ignored when `href` is present. | - |
| value | string | '' | The value of the button, submitted as a pair with the button's name as part of the form data, but only when this button is the submitter. This attribute is ignored when `href` is present. | - |
| href | string | '' | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. | - |
| target | '_blank' \| '_parent' \| '_self' \| '_top' | - | Tells the browser where to open the link. Only used when `href` is present. | - |
| rel | string | 'noreferrer noopener' | When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. | - |
| download | string \| undefined | - | Tells the browser to download the linked file as this filename. Only used when `href` is present. | - |
| form | string | - | The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The value of this attribute must be an id of a form in the same document or shadow root as the button. | - |
| formaction | string | - | Used to override the form owner's `action` attribute. | - |
| formenctype | 'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain' | - | Used to override the form owner's `enctype` attribute. | - |
| formmethod | 'post' \| 'get' | - | Used to override the form owner's `method` attribute. | - |
| formnovalidate | boolean | - | Used to override the form owner's `novalidate` attribute. | - |
| formtarget | '_self' \| '_blank' \| '_parent' \| '_top' \| string | - | Used to override the form owner's `target` attribute. | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| button | HTMLButtonElement \| HTMLLinkElement | - | - | public |
| defaultSlot | HTMLSlotElement | - | - | public |
| invalid | boolean | false | - | public |
| title | string | '' | - | public |
| variant | 'filled' \| 'outline' \| 'text' | 'outline' | The button's theme variant. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The button's size. | public |
| caret | boolean | false | Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. | public |
| disabled | boolean | false | Disables the button. | public |
| loading | boolean | false | Draws the button in a loading state. | public |
| type | 'button' \| 'submit' \| 'reset' | 'button' | The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form. | public |
| name | string | '' | The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter. This attribute is ignored when `href` is present. | public |
| value | string | '' | The value of the button, submitted as a pair with the button's name as part of the form data, but only when this button is the submitter. This attribute is ignored when `href` is present. | public |
| href | string | '' | When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. | public |
| target | '_blank' \| '_parent' \| '_self' \| '_top' | - | Tells the browser where to open the link. Only used when `href` is present. | public |
| rel | string | 'noreferrer noopener' | When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. | public |
| download | string \| undefined | - | Tells the browser to download the linked file as this filename. Only used when `href` is present. | public |
| form | string | - | The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The value of this attribute must be an id of a form in the same document or shadow root as the button. | public |
| formAction | string | - | Used to override the form owner's `action` attribute. | public |
| formEnctype | 'application/x-www-form-urlencoded' \| 'multipart/form-data' \| 'text/plain' | - | Used to override the form owner's `enctype` attribute. | public |
| formMethod | 'post' \| 'get' | - | Used to override the form owner's `method` attribute. | public |
| formNoValidate | boolean | - | Used to override the form owner's `novalidate` attribute. | public |
| formTarget | '_self' \| '_blank' \| '_parent' \| '_top' \| string | - | Used to override the form owner's `target` attribute. | public |
| validity | - | - | Gets the validity state object | readonly |
| validationMessage | - | - | Gets the validation message | readonly |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleDisabledChange | - | - | - |
| click | - | - | Simulates a click on the button. |
| focus | options: FocusOptions | - | Sets focus on the button. |
| blur | - | - | Removes focus from the button. |
| checkValidity | - | - | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm | - | - | Gets the associated form, if one exists. |
| reportValidity | - | - | Checks for validity and shows the browser's validation message if the control is invalid. |
| setCustomValidity | message: string | - | Sets a custom validation message. Pass an empty string to restore validity. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| prefix | The container that wraps the prefix. |
| label | The button's label. |
| suffix | The container that wraps the suffix. |
| caret | The button's caret icon, an `<syn-icon>` element. |
| spinner | The spinner that shows when the button is in the loading state. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the button loses focus. |
| syn-focus | SynFocusEvent | Emitted when the button gains focus. |
| syn-invalid | SynInvalidEvent | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- **syn-icon**
- **syn-spinner**

## Usage Information

- **Status:** stable
- **Since:** 2.0
