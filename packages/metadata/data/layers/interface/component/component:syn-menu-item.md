# syn-menu-item

## Summary

Menu items provide options for the user to pick from in a menu.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-menu-item--docs)

## Class Information

- **Module Path:** components/menu-item/menu-item.js
- **Tag Name:** syn-menu-item

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The menu item's label. |
| prefix | Used to prepend an icon or similar element to the menu item. |
| suffix | Used to append an icon or similar element to the menu item. |
| submenu | Used to denote a nested menu. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| type | 'normal' \| 'checkbox' | 'normal' | The type of menu item to render. To use `checked`, this value must be set to `checkbox`. | - |
| checked | boolean | false | Draws the item in a checked state. | ✓ |
| value | string | '' | A unique value to store in the menu item. This can be used as a way to identify menu items when selected. | - |
| loading | boolean | false | Draws the menu item in a loading state. | ✓ |
| disabled | boolean | false | Draws the menu item in a disabled state, preventing selection. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| defaultSlot | HTMLSlotElement | - | - | public |
| menuItem | HTMLElement | - | - | public |
| type | 'normal' \| 'checkbox' | 'normal' | The type of menu item to render. To use `checked`, this value must be set to `checkbox`. | public |
| checked | boolean | false | Draws the item in a checked state. | public |
| value | string | '' | A unique value to store in the menu item. This can be used as a way to identify menu items when selected. | public |
| loading | boolean | false | Draws the menu item in a loading state. | public |
| disabled | boolean | false | Draws the menu item in a disabled state, preventing selection. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleCheckedChange | - | - | - |
| handleDisabledChange | - | - | - |
| handleTypeChange | - | - | - |
| getTextLabel | - | - | Returns a text label based on the contents of the menu item's default slot. |
| isSubmenu | - | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| checked-icon | The checked icon, which is only visible when the menu item is checked. |
| prefix | The prefix container. |
| label | The menu item label. |
| suffix | The suffix container. |
| spinner | The spinner that shows when the menu item is in the loading state. |
| spinner__base | The spinner's base part. |
| submenu-icon | The submenu icon, visible only when the menu item has a submenu (not yet implemented). |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| - | - | - |

## Dependencies

- **syn-icon**
- **syn-popup**
- **syn-spinner**

## Usage Information

- **Status:** stable
- **Since:** 2.0
