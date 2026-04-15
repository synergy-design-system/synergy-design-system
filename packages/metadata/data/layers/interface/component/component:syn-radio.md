# syn-radio

## Summary

Radios allow the user to select a single option from a group.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41310-252390)

## Class Information

- **Tag Name:** `syn-radio`
- **Import Example:** `import SynRadio from '@synergy-design-system/components/components/radio/radio.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The radio's label.

## Available Properties

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the radio.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the radio to a readonly state.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted.

### value

attribute: `value`
reflects: no
type: `string | number`
default: none

The radio's value. When selected, the radio group will receive this value.

## Available CSS Parts

- `base`: The component's base wrapper.
- `checked-icon`: The checked icon, an `<syn-icon>` element.
- `control`: The circular container that wraps the radio's checked state.
- `control--checked`: The radio control when the radio is checked.
- `label`: The container that wraps the radio's label.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the control loses focus.

### syn-focus

type: `SynFocusEvent`

Emitted when the control gains focus.

## Dependencies

- `syn-icon`
