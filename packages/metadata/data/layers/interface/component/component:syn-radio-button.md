# syn-radio-button

## Summary

Radios buttons allow the user to select a single option from a group using a button-like control.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio-button--docs)

## Class Information

- **Module Path:** components/radio-button/radio-button.js
- **Tag Name:** syn-radio-button

## Available Slots

| Name      | Description                                      |
| --------- | ------------------------------------------------ |
| (default) | The radio button's label.                        |
| prefix    | A presentational prefix icon or similar element. |
| suffix    | A presentational suffix icon or similar element. |

## Available Attributes

| Name     | Type                           | Default  | Description                                                                                                                                                | Reflects |
| -------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| value    | string \| number               | -        | The radio's value. When selected, the radio group will receive this value.                                                                                 | -        |
| disabled | boolean                        | false    | Disables the radio button.                                                                                                                                 | ✓        |
| size     | 'small' \| 'medium' \| 'large' | 'medium' | The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. | ✓        |
| pill     | boolean                        | false    | Draws a pill-style radio button with rounded edges.                                                                                                        | ✓        |

## Available Properties

| Name        | Type                           | Default  | Description                                                                                                                                                | Access |
| ----------- | ------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| input       | HTMLInputElement               | -        | -                                                                                                                                                          | public |
| hiddenInput | HTMLInputElement               | -        | -                                                                                                                                                          | public |
| hasFocus    | boolean                        | false    | -                                                                                                                                                          | public |
| value       | string \| number               | -        | The radio's value. When selected, the radio group will receive this value.                                                                                 | public |
| disabled    | boolean                        | false    | Disables the radio button.                                                                                                                                 | public |
| size        | 'small' \| 'medium' \| 'large' | 'medium' | The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. | public |
| pill        | boolean                        | false    | Draws a pill-style radio button with rounded edges.                                                                                                        | public |

## Available Methods

| Name                 | Parameters            | Return Type | Description                          |
| -------------------- | --------------------- | ----------- | ------------------------------------ |
| handleDisabledChange | -                     | -           | -                                    |
| focus                | options: FocusOptions | -           | Sets focus on the radio button.      |
| blur                 | -                     | -           | Removes focus from the radio button. |

## Available CSS Parts

| Name            | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| base            | The component's base wrapper.                                 |
| button          | The internal `<button>` element.                              |
| button--checked | The internal button element when the radio button is checked. |
| prefix          | The container that wraps the prefix.                          |
| label           | The container that wraps the radio button's label.            |
| suffix          | The container that wraps the suffix.                          |

## Available Events

| Name      | Event Type    | Description                          |
| --------- | ------------- | ------------------------------------ |
| syn-blur  | SynBlurEvent  | Emitted when the button loses focus. |
| syn-focus | SynFocusEvent | Emitted when the button gains focus. |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
