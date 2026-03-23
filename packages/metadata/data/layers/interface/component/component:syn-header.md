# syn-header

## Summary

The <syn-header /> element provides a generic application header
that can be used to add applications name, toolbar and primary navigation.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs)

## Class Information

- **Module Path:** components/header/header.js
- **Tag Name:** syn-header

## Available Slots

| Name | Description |
|------|-------------|
| label | The label for the header |
| logo | The logo that should be displayed. Will fall back to the SICK logo if not provided |
| meta-navigation | The meta-navigation is used to add various application toolbar icons Best used with `<syn-icon-button />` and `<syn-drop-down />` |
| navigation | This slot can be used to add an optional horizontal navigation |
| open-burger-menu-icon | An icon to use in lieu of the default burger-menu=open state. The default close icon is a 'x'. |
| closed-burger-menu-icon | An icon to use in lieu of the default burger-menu=closed state. The default open icon is a burger menu. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| label | string | '' | The headers label. If you need to display HTML, use the `label` slot instead. | - |
| burger-menu | 'hidden' \| 'open' \| 'closed' | 'hidden' | Defines the current visibility and icon of the burger-menu icon. The menu button is added automatically if the component finds a syn-side-nav in variant="default". The following values can be used: - hidden: The burger menu is not visible - open: The burger menu is visible and shows the close icon - closed: The burger menu is visible and shows the open icon | ✓ |
| sticky | boolean | false | Makes the header stick to the top of the viewport when scrolling. Also applies a shadow to the header when scrolling. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| label | string | '' | The headers label. If you need to display HTML, use the `label` slot instead. | public |
| burgerMenu | 'hidden' \| 'open' \| 'closed' | 'hidden' | Defines the current visibility and icon of the burger-menu icon. The menu button is added automatically if the component finds a syn-side-nav in variant="default". The following values can be used: - hidden: The burger menu is not visible - open: The burger menu is visible and shows the close icon - closed: The burger menu is visible and shows the open icon | public |
| sticky | boolean | false | Makes the header stick to the top of the viewport when scrolling. Also applies a shadow to the header when scrolling. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleBurgerMenu | - | - | - |
| connectSideNavigation | sideNav: SynSideNav \| null | - | Connect a `syn-side-nav` to add automatic interaction of the header with the side navigation like showing the burger menu icon and open / close handling.  If no side navigation is connected, the header will use the first `syn-side-nav` element it finds. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper |
| content | The wrapper most content items reside |
| logo | The wrapper the application logo resides in |
| label | The element wrapping the application name |
| meta-navigation | The Item wrapping the optional application menu |
| navigation | The wrapper that is holding the optional top navigation section |
| burger-menu-toggle-button | The button that toggles the burger menu |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-burger-menu-closed | SynBurgerMenuClosedEvent | Emitted when the burger menu is toggled to closed |
| syn-burger-menu-hidden | SynBurgerMenuHiddenEvent | Emitted when the burger menu is toggled to hidden |
| syn-burger-menu-open | SynBurgerMenuOpenEvent | Emitted when the burger menu is toggled to open |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 1.10.0
