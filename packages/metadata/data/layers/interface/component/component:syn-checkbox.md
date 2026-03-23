# syn-checkbox

## Summary

Checkboxes allow the user to toggle an option on or off.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox--docs)

## Class Information

- **Module Path:** components/checkbox/checkbox.js
- **Tag Name:** syn-checkbox

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The checkbox's label. |
| help-text | Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| title | string | '' | - | ✓ |
| name | string | '' | The name of the checkbox, submitted as a name/value pair with form data. | - |
| value | string | - | The current value of the checkbox, submitted as a name/value pair with form data. | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The checkbox's size. | ✓ |
| disabled | boolean | false | Disables the checkbox. | ✓ |
| readonly | boolean | false | Sets the checkbox to a readonly state. | ✓ |
| checked | boolean | false | Draws the checkbox in a checked state. | ✓ |
| indeterminate | boolean | false | Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select all/none" behavior when associated checkboxes have a mix of checked and unchecked states. | ✓ |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | ✓ |
| required | boolean | false | Makes the checkbox a required field. | ✓ |
| help-text | string | '' | The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| input | HTMLInputElement | - | - | public |
| title | string | '' | - | public |
| name | string | '' | The name of the checkbox, submitted as a name/value pair with form data. | public |
| value | string | - | The current value of the checkbox, submitted as a name/value pair with form data. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The checkbox's size. | public |
| disabled | boolean | false | Disables the checkbox. | public |
| readonly | boolean | false | Sets the checkbox to a readonly state. | public |
| checked | boolean | false | Draws the checkbox in a checked state. | public |
| indeterminate | boolean | false | Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select all/none" behavior when associated checkboxes have a mix of checked and unchecked states. | public |
| defaultChecked | boolean | false | The default value of the form control. Primarily used for resetting the form control. | public |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | public |
| required | boolean | false | Makes the checkbox a required field. | public |
| helpText | string | '' | The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. | public |
| validity | - | - | Gets the validity state object | readonly |
| validationMessage | - | - | Gets the validation message | readonly |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleDisabledChange | - | - | - |
| handleStateChange | - | - | - |
| click | - | - | Simulates a click on the checkbox. |
| focus | options: FocusOptions | - | Sets focus on the checkbox. |
| blur | - | - | Removes focus from the checkbox. |
| checkValidity | - | - | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm | - | - | Gets the associated form, if one exists. |
| reportValidity | - | - | Checks for validity and shows the browser's validation message if the control is invalid. |
| setCustomValidity | message: string | - | Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear the custom validation message, call this method with an empty string. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| control | The square container that wraps the checkbox's checked state. |
| control--checked | Matches the control part when the checkbox is checked. |
| control--indeterminate | Matches the control part when the checkbox is indeterminate. |
| checked-icon | The checked icon, an `<syn-icon>` element. |
| indeterminate-icon | The indeterminate icon, an `<syn-icon>` element. |
| label | The container that wraps the checkbox's label. |
| form-control-help-text | The help text's wrapper. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the checkbox loses focus. |
| syn-change | SynChangeEvent | Emitted when the checked state changes. |
| syn-focus | SynFocusEvent | Emitted when the checkbox gains focus. |
| syn-input | SynInputEvent | Emitted when the checkbox receives input. |
| syn-invalid | SynInvalidEvent | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 2.0
