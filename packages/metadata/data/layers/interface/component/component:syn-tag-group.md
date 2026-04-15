# syn-tag-group

## Summary

A tag group is used to display multiple tags that belong together, often representing selected filters, categories, or user‑generated labels.
It arranges tags in flexible rows and supports different sizes and layouts.
Tags can be removable, icon‑based, or purely textual.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tag-group--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=45275-186668)

## Class Information

- **Tag Name:** `syn-tag-group`
- **Import Example:** `import SynTagGroup from '@synergy-design-system/components/components/tag-group/tag-group.js';`

## Usage Information

- **Status:** stable
- **Since:** unknown

## Available Slots

- `(default)`: The tag group's main content. Must be `<syn-tag />` elements.
- `label`: The tag group's label. Alternatively, you can use the `label` attribute.

## Available Properties

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The tag group's label. If you need to display HTML, use the `label` slot instead.

### labelPosition

attribute: `label-position`
reflects: yes
type: `'top' | 'start'`
default: `'top'`

Controls the label position. Use 'top' to place the label above the tags, or 'start' to place it to the begin of the tag group.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The size that should be applied to all slotted `<syn-tag>` elements

## Available CSS Parts

- `base`: The component's base wrapper.
- `tag-label`: The tag group's label.
