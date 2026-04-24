# syn-optgroup

## Summary

The <syn-optgroup> element creates a grouping for <syn-option>s within a <syn-select>.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-optgroup--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41325-324372)

## Class Information

- **Tag Name:** `syn-optgroup`
- **Import Example:** `import SynOptgroup from '@synergy-design-system/components/components/optgroup/optgroup.js';`

## Usage Information

- **Status:** stable
- **Since:** 1.3.0

## Available Slots

- `(default)`: The given options. Must be `<syn-option>` elements.
- `prefix`: A presentational prefix icon or similar element.
- `label`: The label for the optgroup
- `suffix`: A presentational suffix icon or similar element.

## Available Properties

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables all options in the optgroup.

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The optgroups label. If you need to display HTML, use the `label` slot instead.

## Available CSS Parts

- `base`: The component's base wrapper.
- `divider`: The divider that is displayed above the content
- `label-container`: The container that wraps prefix, label and base
- `options`: The container that wraps the <syn-option> elements.
- `prefix`: The container that wraps the prefix.
- `suffix`: The container that wraps the suffix.

## Dependencies

- `syn-divider`
