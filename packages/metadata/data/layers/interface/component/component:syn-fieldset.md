# syn-fieldset

## Summary

Fieldsets are used to group related elements in a form.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-fieldset--docs)
- [Figma Examples](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=50945-47173)
- [Figma Component](https://www.figma.com/design/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?node-id=50975-46749)

## Class Information

- **Tag Name:** `syn-fieldset`
- **Import Example:** `import SynFieldset from '@synergy-design-system/components/components/fieldset/fieldset.js';`

## Usage Information

- **Status:** stable
- **Since:** 3.x.x

## Available Slots

- `(default)`: The fieldset's main content. Place form controls inside the fieldset to group them together.
- `legend`: Add a legend to the fieldset. This is displayed as the title of the fieldset. Alternatively, you can use the `legend` attribute.
- `description`: Add a description to the fieldset. This is displayed below the legend and provides additional information about the fieldset. Alternatively, you can use the `description` attribute.

## Available Properties

### description

attribute: `description`
reflects: yes
type: `string`
default: `''`

The legend for the fieldset. This is displayed as the title of the fieldset.
If not provided, the fieldset will not have a description.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Whether the fieldset is disabled.
When true, all form controls inside the fieldset are disabled

### layout

attribute: `layout`
reflects: yes
type: `'one-column' | 'two-columns'`
default: `'one-column'`

The layout of the fieldset. This determines how the fields are displayed.
Defaults to `one-column`.

- `one-column`: All fields are displayed in a single column.
- `two-columns`: Fields are displayed in two columns. Will automatically fall back to one-column if the fieldset is too narrow to display two columns.

### legend

attribute: `legend`
reflects: yes
type: `string`
default: `''`

The legend for the fieldset. This is displayed as the title of the fieldset.
If not provided, the fieldset will not have a legend.

## Available CSS Parts

- `base`: The component's base wrapper.
- `description`: The component's description element.
- `field-container`: The container for the fieldset's fields.
- `legend`: The component's legend element.
