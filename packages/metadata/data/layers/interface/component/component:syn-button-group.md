# syn-button-group

## Summary

Button groups can be used to group related buttons into sections.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-button-group--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=45597-333063)

## Class Information

- **Tag Name:** `syn-button-group`
- **Import Example:** `import SynButtonGroup from '@synergy-design-system/components/components/button-group/button-group.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: One or more `<syn-button>` elements to display in the button group.

## Available Properties

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive devices when interacting with the control and is strongly recommended.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The button-groups size. This affects all buttons within the group.

### variant

attribute: `variant`
reflects: yes
type: `'filled' | 'outline'`
default: `'outline'`

The button-group's theme variant. This affects all buttons within the group.

## Available CSS Parts

- `base`: The component's base wrapper.
