# syn-menu-item

## Summary

Menu items provide options for the user to pick from in a menu.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-menu-item--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41203-369012)

## Class Information

- **Tag Name:** `syn-menu-item`
- **Import Example:** `import SynMenuItem from '@synergy-design-system/components/components/menu-item/menu-item.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The menu item's label.
- `prefix`: Used to prepend an icon or similar element to the menu item.
- `suffix`: Used to append an icon or similar element to the menu item.
- `submenu`: Used to denote a nested menu.

## Available Properties

### checked

attribute: `checked`
reflects: yes
type: `boolean`
default: `false`

Draws the item in a checked state.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Draws the menu item in a disabled state, preventing selection.

### loading

attribute: `loading`
reflects: yes
type: `boolean`
default: `false`

Draws the menu item in a loading state.

### type

attribute: `type`
reflects: no
type: `'normal' | 'checkbox'`
default: `'normal'`

The type of menu item to render. To use `checked`, this value must be set to `checkbox`.

### value

attribute: `value`
reflects: no
type: `string`
default: `''`

A unique value to store in the menu item. This can be used as a way to identify menu items when selected.

## Available Methods

### getTextLabel()

parameters: -
returns: `void`

Returns a text label based on the contents of the menu item's default slot.

## Available CSS Parts

- `base`: The component's base wrapper.
- `checked-icon`: The checked icon, which is only visible when the menu item is checked.
- `label`: The menu item label.
- `prefix`: The prefix container.
- `spinner`: The spinner that shows when the menu item is in the loading state.
- `spinner__base`: The spinner's base part.
- `submenu-icon`: The submenu icon, visible only when the menu item has a submenu (not yet implemented).
- `suffix`: The suffix container.

## Dependencies

- `syn-icon`
- `syn-popup`
- `syn-spinner`
