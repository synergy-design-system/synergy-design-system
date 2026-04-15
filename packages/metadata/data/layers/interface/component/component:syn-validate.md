# syn-validate

## Summary

Validate provides form field validation messages in a unified way.
It does this by using [the native browser validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
and showing the validation message in a consistent, user defined way.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-validate--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-284767)

## Class Information

- **Tag Name:** `syn-validate`
- **Import Example:** `import SynValidate from '@synergy-design-system/components/components/validate/validate.js';`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

- `(default)`: The form field that should be validated. Avoid slotting in more than one element, as subsequent ones will be ignored.

## Available Properties

### customValidationMessage

attribute: `custom-validation-message`
reflects: no
type: `string`
default: `''`

Custom validation message to be displayed when the input is invalid. Will override the default browser validation message. Set to an empty string to reset the validation message.

### eager

attribute: `eager`
reflects: no
type: `boolean`
default: `false`

Set this to true to validate the input immediately when it is rendered. Best used with a `variant` of `inline`. When setting eager, the input will not be focused automatically. When using a `variant` of `native` the browser will focus the last eager field as it is using a tooltip. In this case it is better to just provide one eager field.

### hideIcon

attribute: `hide-icon`
reflects: yes
type: `boolean`
default: `false`

Do not show the error icon when using the inline variant validation

### on

attribute: `on`
reflects: yes
type: `string`
default: `''`

Defines the events that trigger the validation. `invalid` will always automatically be included. You may also use the `live` keyword to validate on every input change. `live` will make sure to listen to the `invalid`, `input` and `blur` events. Please have a look at the [documentation for native form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) and [the use of form invalid events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) for further information.

### variant

attribute: `variant`
reflects: yes
type: `'native' | 'tooltip' | 'inline'`
default: `'native'`

The variant that should be used to show validation alerts. The following variants are supported: - **native** (default): Uses the native browser validation, usually a browser tooltip. - **tooltip**: Show the validation message as a tooltip using a `<syn-tooltip>`. - **inline**: Show the validation message underneath the element, using a `<syn-alert>`

## Available Methods

### getValidity()

parameters: -
returns: `void`

Returns the validity state of the input component.
`true` for valid and `false` for invalid.

## Available CSS Parts

- `alert`: The syn-alert that is shown when the variant is set to "inline".
- `alert__base`: The container that wraps the alert.
- `alert__icon`: The container that wraps the alert icon.
- `alert__message`: The container that wraps the alert message.
- `base`: The component's base wrapper.
- `input-wrapper`: The container that wraps the form field.
- `tooltip`: The syn-tooltip that is shown when the variant is set to "tooltip".
- `tooltip__arrow`: The container that wraps the tooltip arrow.
- `tooltip__base`: The container that wraps the tooltip.
- `tooltip__body`: The container that wraps the tooltip body.
- `tooltip__popup`: The container that wraps the tooltip popup.

## Dependencies

- `syn-alert`
- `syn-tooltip`
