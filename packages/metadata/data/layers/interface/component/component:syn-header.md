# syn-header

## Summary

The <syn-header /> element provides a generic application header
that can be used to add applications name, toolbar and primary navigation.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-header--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41163-318668)

## Class Information

- **Tag Name:** `syn-header`
- **Import Example:** `import SynHeader from '@synergy-design-system/components/components/header/header.js';`

## Usage Information

- **Status:** stable
- **Since:** 1.10.0

## Available Slots

- `label`: The label for the header
- `logo`: The logo that should be displayed. Will fall back to the SICK logo if not provided
- `meta-navigation`: The meta-navigation is used to add various application toolbar icons Best used with `<syn-icon-button />` and `<syn-drop-down />`
- `navigation`: This slot can be used to add an optional horizontal navigation
- `open-burger-menu-icon`: An icon to use in lieu of the default burger-menu=open state. The default close icon is a 'x'.
- `closed-burger-menu-icon`: An icon to use in lieu of the default burger-menu=closed state. The default open icon is a burger menu.

## Available Properties

### burgerMenu

attribute: `burger-menu`
reflects: yes
type: `'hidden' | 'open' | 'closed'`
default: `'hidden'`

Defines the current visibility and icon of the burger-menu icon. The menu button is added automatically if the component finds a syn-side-nav in variant="default". The following values can be used: - hidden: The burger menu is not visible - open: The burger menu is visible and shows the close icon - closed: The burger menu is visible and shows the open icon

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The headers label. If you need to display HTML, use the `label` slot instead.

### sticky

attribute: `sticky`
reflects: yes
type: `boolean`
default: `false`

Makes the header stick to the top of the viewport when scrolling. Also applies a shadow to the header when scrolling.

## Available Methods

### connectSideNavigation()

parameters: `sideNav: SynSideNav | null`
returns: `void`

Connect a `syn-side-nav` to add automatic interaction of the header with the side navigation
like showing the burger menu icon and open / close handling.

If no side navigation is connected, the header will use the first `syn-side-nav` element it
finds.

## Available CSS Parts

- `base`: The component's base wrapper
- `burger-menu-toggle-button`: The button that toggles the burger menu
- `content`: The wrapper most content items reside
- `label`: The element wrapping the application name
- `logo`: The wrapper the application logo resides in
- `meta-navigation`: The Item wrapping the optional application menu
- `navigation`: The wrapper that is holding the optional top navigation section

## Available Events

### syn-burger-menu-closed

type: `SynBurgerMenuClosedEvent`

Emitted when the burger menu is toggled to closed

### syn-burger-menu-hidden

type: `SynBurgerMenuHiddenEvent`

Emitted when the burger menu is toggled to hidden

### syn-burger-menu-open

type: `SynBurgerMenuOpenEvent`

Emitted when the burger menu is toggled to open
