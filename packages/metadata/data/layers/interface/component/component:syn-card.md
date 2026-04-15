# syn-card

## Summary

Cards can be used to group related subjects in a container.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-card--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=42207-351610)

## Class Information

- **Tag Name:** `syn-card`
- **Import Example:** `import SynCard from '@synergy-design-system/components/components/card/card.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The card's main content.
- `header`: An optional header for the card.
- `footer`: An optional footer for the card.
- `image`: An optional image to render at the start of the card.

## Available Properties

### shadow

attribute: `shadow`
reflects: yes
type: `boolean`
default: `false`

Draws the card with a shadow. Can be used when the card has to stand out visually, for example in dashboards.

### sharp

attribute: `sharp`
reflects: yes
type: `boolean`
default: `false`

Draws the card with sharp edges. Can be used e.g. when nesting multiple syn-cards to create hierarchy.

## Available CSS Parts

- `base`: The component's base wrapper.
- `body`: The container that wraps the card's main content.
- `footer`: The container that wraps the card's footer.
- `header`: The container that wraps the card's header.
- `image`: The container that wraps the card's image.
