# syn-nav-item

## Summary

Flexible button / link component that can be used to quickly build navigations.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-nav-item--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41163-402744)

## Class Information

- **Tag Name:** `syn-nav-item`
- **Import Example:** `import SynNavItem from '@synergy-design-system/components/components/nav-item/nav-item.js';`

## Usage Information

- **Status:** stable
- **Since:** 1.14.0

## Available Slots

- `(default)`: The navigation item's label.
- `prefix`: A presentational prefix icon or similar element.
- `suffix`: A presentational suffix icon or similar element.
- `children`: Slot used to provide nested child navigation elements. If provided, details and summary elements will be used. A chevron will be shown on the right side regardless of the chevron property.

## Available Properties

### chevron

attribute: `chevron`
reflects: yes
type: `boolean`
default: `false`

Appends a chevron to the right side of a navigation item. Only used if `horizontal` is false.

### childrenSlot

attribute: -
reflects: -
type: `HTMLSlotElement`
default: none

Reference to the children slot

### control

attribute: -
reflects: -
type: `HTMLButtonElement | HTMLLinkElement | HTMLElement`
default: none

Reference to the outermost button

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the navigation item.

### divider

attribute: `divider`
reflects: yes
type: `boolean`
default: `false`

Toggle to true to show a divider above the element. Only available when horizontal is false.

### horizontal

attribute: `horizontal`
reflects: yes
type: `boolean`
default: `false`

The navigation item's orientation.

### href

attribute: `href`
reflects: yes
type: `string`
default: none

The navigation item's href target. If provided, the navigation item will use an anchor tag otherwise it will use a button tag. If the 'children' slot is provided, the navigation item will ignore the 'href' and use accordion behavior.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Reflects HTML details element state and allows control from parent. Only used if `horizontal` is false and `children` is defined.

### rel

attribute: `rel`
reflects: no
type: `string`
default: `'noreferrer noopener'`

When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly. You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively.

### target

attribute: `target`
reflects: no
type: `'_blank' | '_parent' | '_self' | '_top'`
default: none

Tells the browser where to open the link. Only used when `href` is present.

## Attribute-only Members

These attributes are reflected but not exposed as component properties.

### current

reflects: yes
type: `boolean`
default: `false`

-

## Available Methods

### blur()

parameters: -
returns: `void`

Removes focus from the button.

### click()

parameters: -
returns: `void`

Simulates a click on the nav-items button, link or summary.

### focus()

parameters: `options: FocusOptions`
returns: `void`

Sets focus on the nav-item

## Available CSS Parts

- `base`: The component's base wrapper including children.
- `chevron`: The container that wraps the chevron.
- `children`: The wrapper that holds the children
- `content`: The component's content excluding children.
- `content-wrapper`: The component's content wrapper.
- `current-indicator`: The indicator used when current is set to true
- `details`: The details element rendered when there are children available
- `divider`: The components optional top divider.
- `prefix`: The container that wraps the prefix.
- `suffix`: The container that wraps the suffix.

## Available Events

### syn-blur

type: `SynBlurEvent`

Emitted when the button loses focus.

### syn-focus

type: `SynFocusEvent`

Emitted when the button gains focus.

### syn-hide

type: `SynHideEvent`

Emitted when the navigation item: - has children, - and is clicked while HTML details are shown.

### syn-show

type: `SynShowEvent`

Emitted when the navigation item: - has children, - and is clicked while HTML details are hidden.

## Dependencies

- `syn-divider`
- `syn-icon`
