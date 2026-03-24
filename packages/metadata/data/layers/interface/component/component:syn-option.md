# syn-option

## Summary

Options define the selectable items within various form controls such as [select](/components/select).

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-option--docs)

## Class Information

- **Module Path:** components/option/option.js
- **Tag Name:** syn-option

## Available Slots

| Name      | Description                                                  |
| --------- | ------------------------------------------------------------ |
| (default) | The option's label.                                          |
| prefix    | Used to prepend an icon or similar element to the menu item. |
| suffix    | Used to append an icon or similar element to the menu item.  |

## Available Attributes

| Name     | Type             | Default | Description                                                                                                                                                                                                                                          | Reflects |
| -------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| value    | string \| number | ''      | The option's value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing multiple values. | ✓        |
| disabled | boolean          | false   | Draws the option in a disabled state, preventing selection.                                                                                                                                                                                          | ✓        |

## Available Properties

| Name        | Type             | Default | Description                                                                                                                                                                                                                                          | Access |
| ----------- | ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| defaultSlot | HTMLSlotElement  | -       | -                                                                                                                                                                                                                                                    | public |
| delimiter   | string           | ' '     | -                                                                                                                                                                                                                                                    | public |
| current     | boolean          | false   | -                                                                                                                                                                                                                                                    | public |
| selected    | boolean          | false   | -                                                                                                                                                                                                                                                    | public |
| hasHover    | boolean          | false   | -                                                                                                                                                                                                                                                    | public |
| value       | string \| number | ''      | The option's value. When selected, the containing form control will receive this value. The value must be unique from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing multiple values. | public |
| disabled    | boolean          | false   | Draws the option in a disabled state, preventing selection.                                                                                                                                                                                          | public |

## Available Methods

| Name                      | Parameters | Return Type | Description                                                                                |
| ------------------------- | ---------- | ----------- | ------------------------------------------------------------------------------------------ |
| handleDisabledChange      | -          | -           | -                                                                                          |
| handleSelectedChange      | -          | -           | -                                                                                          |
| handleDelimiterChange     | -          | -           | -                                                                                          |
| handleValueChange         | -          | -           | -                                                                                          |
| sanitizeValueForDelimiter | -          | -           | Replaces any occurrences of the delimiter in the option's original value with underscores. |
| getTextLabel              | -          | -           | Returns a plain text label based on the option's content.                                  |

## Available CSS Parts

| Name         | Description                                |
| ------------ | ------------------------------------------ |
| checked-icon | The checked icon, an `<syn-icon>` element. |
| base         | The component's base wrapper.              |
| label        | The option's label.                        |
| prefix       | The container that wraps the prefix.       |
| suffix       | The container that wraps the suffix.       |

## Available Events

| Name | Event Type | Description |
| ---- | ---------- | ----------- |
| -    | -          | -           |

## Dependencies

- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 2.0
