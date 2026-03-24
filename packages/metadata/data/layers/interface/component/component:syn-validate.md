# syn-validate

## Summary

Validate provides form field validation messages in a unified way.
It does this by using [the native browser validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
and showing the validation message in a consistent, user defined way.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-validate--docs)

## Class Information

- **Module Path:** components/validate/validate.js
- **Tag Name:** syn-validate

## Available Slots

| Name      | Description                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------- |
| (default) | The form field that should be validated. Avoid slotting in more than one element, as subsequent ones will be ignored. |

## Available Attributes

| Name                      | Type                              | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Reflects |
| ------------------------- | --------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| variant                   | 'native' \| 'tooltip' \| 'inline' | 'native' | The variant that should be used to show validation alerts. The following variants are supported: - **native** (default): Uses the native browser validation, usually a browser tooltip. - **tooltip**: Show the validation message as a tooltip using a `<syn-tooltip>`. - **inline**: Show the validation message underneath the element, using a `<syn-alert>`                                                                                                                                                                               | ✓        |
| hide-icon                 | boolean                           | false    | Do not show the error icon when using the inline variant validation                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ✓        |
| on                        | string                            | ''       | Defines the events that trigger the validation. `invalid` will always automatically be included. You may also use the `live` keyword to validate on every input change. `live` will make sure to listen to the `invalid`, `input` and `blur` events. Please have a look at the [documentation for native form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) and [the use of form invalid events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) for further information. | ✓        |
| custom-validation-message | string                            | ''       | Custom validation message to be displayed when the input is invalid. Will override the default browser validation message. Set to an empty string to reset the validation message.                                                                                                                                                                                                                                                                                                                                                             | -        |
| eager                     | boolean                           | false    | Set this to true to validate the input immediately when it is rendered. Best used with a `variant` of `inline`. When setting eager, the input will not be focused automatically. When using a `variant` of `native` the browser will focus the last eager field as it is using a tooltip. In this case it is better to just provide one eager field.                                                                                                                                                                                           | -        |

## Available Properties

| Name                       | Type                              | Default               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Access |
| -------------------------- | --------------------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| controller                 | -                                 | new AbortController() | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| observer                   | MutationObserver                  | -                     | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| sizeObserver               | MutationObserver                  | -                     | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| validationMessage          | string                            | ''                    | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| eagerFirstMount            | boolean                           | true                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| isInternalTriggeredInvalid | boolean                           | false                 | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| isValid                    | boolean                           | true                  | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| alertSize                  | SynInput['size'] \| undefined     | -                     | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| hasFocus                   | boolean                           | false                 | -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | public |
| variant                    | 'native' \| 'tooltip' \| 'inline' | 'native'              | The variant that should be used to show validation alerts. The following variants are supported: - **native** (default): Uses the native browser validation, usually a browser tooltip. - **tooltip**: Show the validation message as a tooltip using a `<syn-tooltip>`. - **inline**: Show the validation message underneath the element, using a `<syn-alert>`                                                                                                                                                                               | public |
| hideIcon                   | boolean                           | false                 | Do not show the error icon when using the inline variant validation                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | public |
| on                         | string                            | ''                    | Defines the events that trigger the validation. `invalid` will always automatically be included. You may also use the `live` keyword to validate on every input change. `live` will make sure to listen to the `invalid`, `input` and `blur` events. Please have a look at the [documentation for native form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) and [the use of form invalid events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event) for further information. | public |
| customValidationMessage    | string                            | ''                    | Custom validation message to be displayed when the input is invalid. Will override the default browser validation message. Set to an empty string to reset the validation message.                                                                                                                                                                                                                                                                                                                                                             | public |
| eager                      | boolean                           | false                 | Set this to true to validate the input immediately when it is rendered. Best used with a `variant` of `inline`. When setting eager, the input will not be focused automatically. When using a `variant` of `native` the browser will focus the last eager field as it is using a tooltip. In this case it is better to just provide one eager field.                                                                                                                                                                                           | public |

## Available Methods

| Name                                | Parameters | Return Type | Description                                                                                  |
| ----------------------------------- | ---------- | ----------- | -------------------------------------------------------------------------------------------- |
| handleListenerChange                | -          | -           | -                                                                                            |
| handleEagerChange                   | -          | -           | -                                                                                            |
| handleCustomValidationMessageChange | -          | -           | -                                                                                            |
| getValidity                         | -          | -           | Returns the validity state of the input component. `true` for valid and `false` for invalid. |

## Available CSS Parts

| Name             | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| base             | The component's base wrapper.                                       |
| input-wrapper    | The container that wraps the form field.                            |
| alert            | The syn-alert that is shown when the variant is set to "inline".    |
| alert\_\_base    | The container that wraps the alert.                                 |
| alert\_\_message | The container that wraps the alert message.                         |
| alert\_\_icon    | The container that wraps the alert icon.                            |
| tooltip          | The syn-tooltip that is shown when the variant is set to "tooltip". |
| tooltip\_\_base  | The container that wraps the tooltip.                               |
| tooltip\_\_popup | The container that wraps the tooltip popup.                         |
| tooltip\_\_arrow | The container that wraps the tooltip arrow.                         |
| tooltip\_\_body  | The container that wraps the tooltip body.                          |

## Available Events

| Name | Event Type | Description |
| ---- | ---------- | ----------- |
| -    | -          | -           |

## Dependencies

- **syn-alert**
- **syn-tooltip**

## Usage Information

- **Status:** stable
- **Since:** unknown
