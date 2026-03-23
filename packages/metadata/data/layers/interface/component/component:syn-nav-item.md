# syn-nav-item

## Summary

Flexible button / link component that can be used to quickly build navigations.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-nav-item--docs)

## Class Information

- **Module Path:** components/nav-item/nav-item.js
- **Tag Name:** syn-nav-item

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The navigation item's label. |
| prefix | A presentational prefix icon or similar element. |
| suffix | A presentational suffix icon or similar element. |
| children | Slot used to provide nested child navigation elements. If provided, details and summary elements will be used. A chevron will be shown on the right side regardless of the chevron property. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| href | string | - | The navigation item's href target. If provided, the navigation item will use an anchor tag otherwise it will use a button tag.  If the 'children' slot is provided, the navigation item will ignore the 'href' and use accordion behavior. | ✓ |
| target | '_blank' \| '_parent' \| '_self' \| '_top' | - | Tells the browser where to open the link. Only used when `href` is present. | - |
| rel | string | 'noreferrer noopener' | When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits.  However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly.  You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. | - |
| current | boolean | false | - | ✓ |
| disabled | boolean | false | Disables the navigation item. | ✓ |
| horizontal | boolean | false | The navigation item's orientation. | ✓ |
| chevron | boolean | false | Appends a chevron to the right side of a navigation item. Only used if `horizontal` is false. | ✓ |
| open | boolean | false | Reflects HTML details element state and allows control from parent. Only used if `horizontal` is false and `children` is defined. | ✓ |
| divider | boolean | false | Toggle to true to show a divider above the element. Only available when horizontal is false. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| childrenSlot | HTMLSlotElement | - | Reference to the children slot | public |
| control | HTMLButtonElement \| HTMLLinkElement \| HTMLElement | - | Reference to the outermost button | public |
| href | string | - | The navigation item's href target. If provided, the navigation item will use an anchor tag otherwise it will use a button tag.  If the 'children' slot is provided, the navigation item will ignore the 'href' and use accordion behavior. | public |
| target | '_blank' \| '_parent' \| '_self' \| '_top' | - | Tells the browser where to open the link. Only used when `href` is present. | public |
| rel | string | 'noreferrer noopener' | When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the default is `noreferrer noopener` to prevent security exploits.  However, if you're using `target` to point to a specific tab/window, this will prevent that from working correctly.  You can remove or change the default value by setting the attribute to an empty string or a value of your choice, respectively. | public |
| current | boolean | false | - | public |
| disabled | boolean | false | Disables the navigation item. | public |
| horizontal | boolean | false | The navigation item's orientation. | public |
| chevron | boolean | false | Appends a chevron to the right side of a navigation item. Only used if `horizontal` is false. | public |
| open | boolean | false | Reflects HTML details element state and allows control from parent. Only used if `horizontal` is false and `children` is defined. | public |
| divider | boolean | false | Toggle to true to show a divider above the element. Only available when horizontal is false. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleHorizontalChange | - | - | - |
| blur | - | - | Removes focus from the button. |
| click | - | - | Simulates a click on the nav-items button, link or summary. |
| focus | options: FocusOptions | - | Sets focus on the nav-item |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper including children. |
| children | The wrapper that holds the children |
| content-wrapper | The component's content wrapper. |
| content | The component's content excluding children. |
| current-indicator | The indicator used when current is set to true |
| chevron | The container that wraps the chevron. |
| details | The details element rendered when there are children available |
| divider | The components optional top divider. |
| prefix | The container that wraps the prefix. |
| suffix | The container that wraps the suffix. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-show | SynShowEvent | Emitted when the navigation item: - has children, - and is clicked while HTML details are hidden. |
| syn-hide | SynHideEvent | Emitted when the navigation item: - has children, - and is clicked while HTML details are shown. |
| syn-blur | SynBlurEvent | Emitted when the button loses focus. |
| syn-focus | SynFocusEvent | Emitted when the button gains focus. |

## Dependencies

- **syn-divider**
- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 1.14.0
