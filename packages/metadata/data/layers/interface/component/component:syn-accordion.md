# syn-accordion

## Summary

Accordions provide the ability to group a list of `<syn-details>`.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41094-279501)

## Class Information

- **Tag Name:** `syn-accordion`
- **Import Example:** `import SynAccordion from '@synergy-design-system/components/components/accordion/accordion.js';`

## Usage Information

- **Status:** stable
- **Since:** 1.23.0

## Available Slots

- `(default)`: The accordion's main content. Must be `<syn-details />` elements.

## Available Properties

### closeOthers

attribute: `close-others`
reflects: no
type: `boolean`
default: `false`

Indicates whether or not multiple `<syn-detail>` elements can be open at the same time.

### contained

attribute: `contained`
reflects: yes
type: `boolean`
default: `false`

Draws the accordion and the slotted `<syn-details>` as contained elements.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The size that should be applied to all slotted `<syn-details>` elements

## Available CSS Parts

- `base`: The component's base wrapper.
