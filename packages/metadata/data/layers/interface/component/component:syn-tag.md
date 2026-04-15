# syn-tag

## Summary

Tags are used as labels to organize things or to indicate a selection.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tag--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41163-156701)

## Class Information

- **Tag Name:** `syn-tag`
- **Import Example:** `import SynTag from '@synergy-design-system/components/components/tag/tag.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The tag's content.

## Available Properties

### removable

attribute: `removable`
reflects: no
type: `boolean`
default: `false`

Makes the tag removable and shows a remove button.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The tag's size.

## Available CSS Parts

- `base`: The component's base wrapper.
- `content`: The tag's content.
- `remove-button`: The tag's remove button, an `<syn-icon-button>`.
- `remove-button__base`: The remove button's exported `base` part.

## Available Events

### syn-remove

type: `SynRemoveEvent`

Emitted when the remove button is activated.

## Dependencies

- `syn-icon-button`
