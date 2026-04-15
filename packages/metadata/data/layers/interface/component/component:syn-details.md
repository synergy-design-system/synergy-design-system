# syn-details

## Summary

Details show a brief summary and expand to show additional content.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-details--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41227-232486)

## Class Information

- **Tag Name:** `syn-details`
- **Import Example:** `import SynDetails from '@synergy-design-system/components/components/details/details.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The details' main content.
- `summary`: The details' summary. Alternatively, you can use the `summary` attribute.
- `expand-icon`: Optional expand icon to use instead of the default. Works best with `<syn-icon>`.
- `collapse-icon`: Optional collapse icon to use instead of the default. Works best with `<syn-icon>`.

## Available Properties

### contained

attribute: `contained`
reflects: yes
type: `boolean`
default: `false`

Draws the details as contained element.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the details so it can't be toggled.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you can use the `show()` and `hide()` methods and this attribute will reflect the details' open state.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The details's size.

### summary

attribute: `summary`
reflects: no
type: `string`
default: none

The summary to show in the header. If you need to display HTML, use the `summary` slot instead.

## Available Methods

### hide()

parameters: -
returns: `void`

Hides the details

### show()

parameters: -
returns: `void`

Shows the details.

## Available CSS Parts

- `base`: The component's base wrapper.
- `body`: The container that wraps the details content.
- `content`: The details content.
- `header`: The header that wraps both the summary and the expand/collapse icon.
- `summary`: The container that wraps the summary.
- `summary-icon`: The container that wraps the expand/collapse icons.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the details closes and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the details opens and all animations are complete.

### syn-hide

type: `SynHideEvent`

Emitted when the details closes.

### syn-show

type: `SynShowEvent`

Emitted when the details opens.

## Dependencies

- `syn-icon`
