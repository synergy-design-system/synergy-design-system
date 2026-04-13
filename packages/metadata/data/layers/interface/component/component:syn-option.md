# syn-option

## Summary

Options define the selectable items within various form controls such as [select](/components/select).

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-option--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41325-312743)

## Class Information

- **Import Example:** `import SynOption from '@synergy-design-system/components/components/option/option.js';`
- **Tag Name:** `syn-option`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                  |
| --------- | ------------------------------------------------------------ |
| (default) | The option's label.                                          |
| prefix    | Used to prepend an icon or similar element to the menu item. |
| suffix    | Used to append an icon or similar element to the menu item.  |

## Available Properties

| Property | Attribute  | Reflects | Type               | Default | Description                                                                                                                                                                                                                                          |
| -------- | ---------- | :------: | ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disabled | `disabled` |    ✓     | `boolean`          | `false` | Draws the option in a disabled state, preventing selection.                                                                                                                                                                                          |
| value    | `value`    |    ✓     | `string \| number` | `''`    | The option's value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing multiple values. |

## Available Methods

| Name                          | Parameters | Return Type | Description                                                                                |
| ----------------------------- | ---------- | ----------- | ------------------------------------------------------------------------------------------ |
| `getTextLabel()`              | -          | -           | Returns a plain text label based on the option's content.                                  |
| `sanitizeValueForDelimiter()` | -          | -           | Replaces any occurrences of the delimiter in the option's original value with underscores. |

## Available CSS Parts

| Name         | Description                                |
| ------------ | ------------------------------------------ |
| base         | The component's base wrapper.              |
| checked-icon | The checked icon, an `<syn-icon>` element. |
| label        | The option's label.                        |
| prefix       | The container that wraps the prefix.       |
| suffix       | The container that wraps the suffix.       |

## Dependencies

- `syn-icon`
