# syn-switch

## Summary

Switches allow the user to toggle an option on or off.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-switch--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-259132)

## Class Information

- **Import Example:** `import SynSwitch from '@synergy-design-system/components/components/switch/switch.js';`
- **Tag Name:** `syn-switch`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------ |
| (default) | The switch's label.                                                                              |
| help-text | Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute. |

## Available Properties

| Property       | Attribute   | Reflects | Type                             | Default    | Description                                                                                                                                                                                                                                                                            |
| -------------- | ----------- | :------: | -------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| checked        | `checked`   |    ✓     | `boolean`                        | `false`    | Draws the switch in a checked state.                                                                                                                                                                                                                                                   |
| defaultChecked | -           |    -     | `boolean`                        | `false`    | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                  |
| disabled       | `disabled`  |    ✓     | `boolean`                        | `false`    | Disables the switch.                                                                                                                                                                                                                                                                   |
| form           | `form`      |    ✓     | `string`                         | `''`       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. |
| helpText       | `help-text` |    -     | `string`                         | `''`       | The switch's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                                 |
| name           | `name`      |    -     | `string`                         | `''`       | The name of the switch, submitted as a name/value pair with form data.                                                                                                                                                                                                                 |
| readonly       | `readonly`  |    ✓     | `boolean`                        | `false`    | Sets the switch to a readonly state.                                                                                                                                                                                                                                                   |
| required       | `required`  |    ✓     | `boolean`                        | `false`    | Makes the switch a required field.                                                                                                                                                                                                                                                     |
| size           | `size`      |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The switch's size.                                                                                                                                                                                                                                                                     |
| value          | `value`     |    -     | `string`                         | -          | The current value of the switch, submitted as a name/value pair with form data.                                                                                                                                                                                                        |

## Attribute-only Members

| Name  | Type     | Default | Description |
| ----- | -------- | ------- | ----------- |
| title | `string` | `''`    | -           |

## Available Methods

| Name                  | Parameters              | Return Type | Description                                                                                                     |
| --------------------- | ----------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `blur()`              | -                       | -           | Removes focus from the switch.                                                                                  |
| `checkValidity()`     | -                       | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. |
| `click()`             | -                       | -           | Simulates a click on the switch.                                                                                |
| `focus()`             | `options: FocusOptions` | -           | Sets focus on the switch.                                                                                       |
| `getForm()`           | -                       | -           | Gets the associated form, if one exists.                                                                        |
| `reportValidity()`    | -                       | -           | Checks for validity and shows the browser's validation message if the control is invalid.                       |
| `setCustomValidity()` | `message: string`       | -           | Sets a custom validation message. Pass an empty string to restore validity.                                     |

## Available CSS Parts

| Name                   | Description                                 |
| ---------------------- | ------------------------------------------- |
| base                   | The component's base wrapper.               |
| control                | The control that houses the switch's thumb. |
| form-control-help-text | The help text's wrapper.                    |
| label                  | The switch's label.                         |
| thumb                  | The switch's thumb.                         |

## Available Events

| Name        | Event Type        | Description                                                                                       |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| syn-blur    | `SynBlurEvent`    | Emitted when the control loses focus.                                                             |
| syn-change  | `SynChangeEvent`  | Emitted when the control's checked state changes.                                                 |
| syn-focus   | `SynFocusEvent`   | Emitted when the control gains focus.                                                             |
| syn-input   | `SynInputEvent`   | Emitted when the control receives input.                                                          |
| syn-invalid | `SynInvalidEvent` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |
