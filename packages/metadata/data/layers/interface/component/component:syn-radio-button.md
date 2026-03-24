# syn-radio-button

## Summary

Radios buttons allow the user to select a single option from a group using a button-like control.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio-button--docs)

## Class Information

- **Import Example:** `import SynRadioButton from '@synergy-design-system/components/components/radio-button/radio-button.js';`
- **Module Path:** components/radio-button/radio-button.js
- **Tag Name:** `syn-radio-button`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| (default) | The radio button's label.                        |
| prefix    | A presentational prefix icon or similar element. |
| suffix    | A presentational suffix icon or similar element. |

## Available Properties

| Property | Attribute  | Reflects | Type                             | Default    | Description                                                                                                                                                |
| -------- | ---------- | :------: | -------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled | `disabled` |    ✓     | `boolean`                        | `false`    | Disables the radio button.                                                                                                                                 |
| pill     | `pill`     |    ✓     | `boolean`                        | `false`    | Draws a pill-style radio button with rounded edges.                                                                                                        |
| size     | `size`     |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. |
| value    | `value`    |    -     | `string \| number`               | -          | The radio's value. When selected, the radio group will receive this value.                                                                                 |

## Available Methods

| Name      | Parameters              | Return Type | Description                          |
| --------- | ----------------------- | ----------- | ------------------------------------ |
| `blur()`  | -                       | -           | Removes focus from the radio button. |
| `focus()` | `options: FocusOptions` | -           | Sets focus on the radio button.      |

## Available CSS Parts

| Name            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| base            | The component's base wrapper.                                 |
| button          | The internal `<button>` element.                              |
| button--checked | The internal button element when the radio button is checked. |
| label           | The container that wraps the radio button's label.            |
| prefix          | The container that wraps the prefix.                          |
| suffix          | The container that wraps the suffix.                          |

## Available Events

| Name      | Event Type      | Description                          |
| --------- | --------------- | ------------------------------------ |
| syn-blur  | `SynBlurEvent`  | Emitted when the button loses focus. |
| syn-focus | `SynFocusEvent` | Emitted when the button gains focus. |
