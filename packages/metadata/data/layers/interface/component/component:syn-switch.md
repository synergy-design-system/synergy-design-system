# syn-switch

## Summary

Switches allow the user to toggle an option on or off.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs)

## Class Information

- **Module Path:** components/switch/switch.js
- **Tag Name:** syn-switch

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The switch's label. |
| help-text | Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| title | string | '' | - | ✓ |
| name | string | '' | The name of the switch, submitted as a name/value pair with form data. | - |
| value | string | - | The current value of the switch, submitted as a name/value pair with form data. | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The switch's size. | ✓ |
| disabled | boolean | false | Disables the switch. | ✓ |
| readonly | boolean | false | Sets the switch to a readonly state. | ✓ |
| checked | boolean | false | Draws the switch in a checked state. | ✓ |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | ✓ |
| required | boolean | false | Makes the switch a required field. | ✓ |
| help-text | string | '' | The switch's help text. If you need to display HTML, use the `help-text` slot instead. | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| input | HTMLInputElement | - | - | public |
| title | string | '' | - | public |
| name | string | '' | The name of the switch, submitted as a name/value pair with form data. | public |
| value | string | - | The current value of the switch, submitted as a name/value pair with form data. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The switch's size. | public |
| disabled | boolean | false | Disables the switch. | public |
| readonly | boolean | false | Sets the switch to a readonly state. | public |
| checked | boolean | false | Draws the switch in a checked state. | public |
| defaultChecked | boolean | false | The default value of the form control. Primarily used for resetting the form control. | public |
| form | string | '' | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. | public |
| required | boolean | false | Makes the switch a required field. | public |
| helpText | string | '' | The switch's help text. If you need to display HTML, use the `help-text` slot instead. | public |
| validity | - | - | Gets the validity state object | readonly |
| validationMessage | - | - | Gets the validation message | readonly |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleCheckedChange | - | - | - |
| handleDisabledChange | - | - | - |
| click | - | - | Simulates a click on the switch. |
| focus | options: FocusOptions | - | Sets focus on the switch. |
| blur | - | - | Removes focus from the switch. |
| checkValidity | - | - | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| getForm | - | - | Gets the associated form, if one exists. |
| reportValidity | - | - | Checks for validity and shows the browser's validation message if the control is invalid. |
| setCustomValidity | message: string | - | Sets a custom validation message. Pass an empty string to restore validity. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| control | The control that houses the switch's thumb. |
| thumb | The switch's thumb. |
| label | The switch's label. |
| form-control-help-text | The help text's wrapper. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the control loses focus. |
| syn-change | SynChangeEvent | Emitted when the control's checked state changes. |
| syn-input | SynInputEvent | Emitted when the control receives input. |
| syn-focus | SynFocusEvent | Emitted when the control gains focus. |
| syn-invalid | SynInvalidEvent | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
