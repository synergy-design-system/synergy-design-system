# syn-radio

## Summary

Radios allow the user to select a single option from a group.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio--docs)

## Class Information

- **Module Path:** components/radio/radio.js
- **Tag Name:** syn-radio

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The radio's label. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| value | string \| number | - | The radio's value. When selected, the radio group will receive this value. | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. | ✓ |
| disabled | boolean | false | Disables the radio. | ✓ |
| readonly | boolean | false | Sets the radio to a readonly state. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| checked | boolean | false | - | public |
| hasFocus | boolean | false | - | public |
| value | string \| number | - | The radio's value. When selected, the radio group will receive this value. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. | public |
| disabled | boolean | false | Disables the radio. | public |
| readonly | boolean | false | Sets the radio to a readonly state. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleCheckedChange | - | - | - |
| handleDisabledChange | - | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| control | The circular container that wraps the radio's checked state. |
| control--checked | The radio control when the radio is checked. |
| checked-icon | The checked icon, an `<syn-icon>` element. |
| label | The container that wraps the radio's label. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-blur | SynBlurEvent | Emitted when the control loses focus. |
| syn-focus | SynFocusEvent | Emitted when the control gains focus. |

## Dependencies

- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 2.0
