# syn-radio-button

## Summary

Radios buttons allow the user to select a single option from a group using a button-like control.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-radio-button--docs)

## Class Information

- **Tag Name:** `syn-radio-button`
- **Import Example:** `import SynRadioButton from '@synergy-design-system/components/components/radio-button/radio-button.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The radio button's label.
- `prefix`: A presentational prefix icon or similar element.
- `suffix`: A presentational suffix icon or similar element.

## Available Properties

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the radio button.

### readonly

attribute: `readonly`
reflects: yes
type: `boolean`
default: `false`

Sets the radio button to a readonly state.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so this attribute can typically be omitted.

### value

attribute: `value`
reflects: no
type: `string | number`
default: none

The radio's value. When selected, the radio group will receive this value.

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the radio button.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the radio button.

## Available CSS Parts

- `base`: The component's base wrapper.
- `button`: The internal `<button>` element.
- `button--checked`: The internal button element when the radio button is checked.
- `label`: The container that wraps the radio button's label.
- `prefix`: The container that wraps the prefix.
- `suffix`: The container that wraps the suffix.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the button loses focus.

### syn-focus

type: `SynFocusEvent`

Emitted when the button gains focus.
