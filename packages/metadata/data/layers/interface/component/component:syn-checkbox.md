# syn-checkbox

## Summary

Checkboxes allow the user to toggle an option on or off.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-checkbox--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-257927)

## Class Information

- **Import Example:** `import SynCheckbox from '@synergy-design-system/components/components/checkbox/checkbox.js';`
- **Tag Name:** `syn-checkbox`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| (default) | The checkbox's label.                                                                              |
| help-text | Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute. |

## Available Properties

| Property       | Attribute       | Reflects | Type                             | Default    | Description                                                                                                                                                                                                                                                                            |
| -------------- | --------------- | :------: | -------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| checked        | `checked`       |    ✓     | `boolean`                        | `false`    | Draws the checkbox in a checked state.                                                                                                                                                                                                                                                 |
| defaultChecked | -               |    -     | `boolean`                        | `false`    | The default value of the form control. Primarily used for resetting the form control.                                                                                                                                                                                                  |
| disabled       | `disabled`      |    ✓     | `boolean`                        | `false`    | Disables the checkbox.                                                                                                                                                                                                                                                                 |
| form           | `form`          |    ✓     | `string`                         | `''`       | By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you to place the form control outside of a form and associate it with the form that has this `id`. The form must be in the same document or shadow root for this to work. |
| helpText       | `help-text`     |    -     | `string`                         | `''`       | The checkbox's help text. If you need to display HTML, use the `help-text` slot instead.                                                                                                                                                                                               |
| indeterminate  | `indeterminate` |    ✓     | `boolean`                        | `false`    | Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select all/none" behavior when associated checkboxes have a mix of checked and unchecked states.                                                                                |
| name           | `name`          |    -     | `string`                         | `''`       | The name of the checkbox, submitted as a name/value pair with form data.                                                                                                                                                                                                               |
| readonly       | `readonly`      |    ✓     | `boolean`                        | `false`    | Sets the checkbox to a readonly state.                                                                                                                                                                                                                                                 |
| required       | `required`      |    ✓     | `boolean`                        | `false`    | Makes the checkbox a required field.                                                                                                                                                                                                                                                   |
| size           | `size`          |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The checkbox's size.                                                                                                                                                                                                                                                                   |
| value          | `value`         |    -     | `string`                         | -          | The current value of the checkbox, submitted as a name/value pair with form data.                                                                                                                                                                                                      |

## Attribute-only Members

| Name  | Type     | Default | Description |
| ----- | -------- | ------- | ----------- |
| title | `string` | `''`    | -           |

## Available Methods

| Name                  | Parameters              | Return Type | Description                                                                                                                                                                               |
| --------------------- | ----------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `blur()`              | -                       | -           | Removes focus from the checkbox.                                                                                                                                                          |
| `checkValidity()`     | -                       | -           | Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid.                                                                           |
| `click()`             | -                       | -           | Simulates a click on the checkbox.                                                                                                                                                        |
| `focus()`             | `options: FocusOptions` | -           | Sets focus on the checkbox.                                                                                                                                                               |
| `getForm()`           | -                       | -           | Gets the associated form, if one exists.                                                                                                                                                  |
| `reportValidity()`    | -                       | -           | Checks for validity and shows the browser's validation message if the control is invalid.                                                                                                 |
| `setCustomValidity()` | `message: string`       | -           | Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear the custom validation message, call this method with an empty string. |

## Available CSS Parts

| Name                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| base                   | The component's base wrapper.                                 |
| checked-icon           | The checked icon, an `<syn-icon>` element.                    |
| control                | The square container that wraps the checkbox's checked state. |
| control--checked       | Matches the control part when the checkbox is checked.        |
| control--indeterminate | Matches the control part when the checkbox is indeterminate.  |
| form-control-help-text | The help text's wrapper.                                      |
| indeterminate-icon     | The indeterminate icon, an `<syn-icon>` element.              |
| label                  | The container that wraps the checkbox's label.                |

## Available Events

| Name        | Event Type        | Description                                                                                       |
| ----------- | ----------------- | ------------------------------------------------------------------------------------------------- |
| syn-blur    | `SynBlurEvent`    | Emitted when the checkbox loses focus.                                                            |
| syn-change  | `SynChangeEvent`  | Emitted when the checked state changes.                                                           |
| syn-focus   | `SynFocusEvent`   | Emitted when the checkbox gains focus.                                                            |
| syn-input   | `SynInputEvent`   | Emitted when the checkbox receives input.                                                         |
| syn-invalid | `SynInvalidEvent` | Emitted when the form control has been checked for validity and its constraints aren't satisfied. |

## Dependencies

- `syn-icon`
