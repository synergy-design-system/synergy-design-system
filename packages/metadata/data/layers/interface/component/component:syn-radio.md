# syn-radio

## Summary

Radios allow the user to select a single option from a group.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-252390)

## Class Information

- **Import Example:** `import SynRadio from '@synergy-design-system/components/components/radio/radio.js';`
- **Tag Name:** `syn-radio`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description        |
| --------- | ------------------ |
| (default) | The radio's label. |

## Available Properties

| Property | Attribute  | Reflects | Type                             | Default    | Description                                                                                                                                         |
| -------- | ---------- | :------: | -------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled | `disabled` |    ✓     | `boolean`                        | `false`    | Disables the radio.                                                                                                                                 |
| readonly | `readonly` |    ✓     | `boolean`                        | `false`    | Sets the radio to a readonly state.                                                                                                                 |
| size     | `size`     |    ✓     | `'small' \| 'medium' \| 'large'` | `'medium'` | The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted. |
| value    | `value`    |    -     | `string \| number`               | -          | The radio's value. When selected, the radio group will receive this value.                                                                          |

## Available CSS Parts

| Name             | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| base             | The component's base wrapper.                                |
| checked-icon     | The checked icon, an `<syn-icon>` element.                   |
| control          | The circular container that wraps the radio's checked state. |
| control--checked | The radio control when the radio is checked.                 |
| label            | The container that wraps the radio's label.                  |

## Available Events

| Name      | Event Type      | Description                           |
| --------- | --------------- | ------------------------------------- |
| syn-blur  | `SynBlurEvent`  | Emitted when the control loses focus. |
| syn-focus | `SynFocusEvent` | Emitted when the control gains focus. |

## Dependencies

- `syn-icon`
