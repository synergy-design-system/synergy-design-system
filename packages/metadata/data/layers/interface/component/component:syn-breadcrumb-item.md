# syn-breadcrumb-item

## Summary

Breadcrumb Items are used inside [breadcrumbs](/components/breadcrumb) to represent different links.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb-item--docs)

## Class Information

- **Module Path:** components/breadcrumb-item/breadcrumb-item.js
- **Tag Name:** syn-breadcrumb-item

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The breadcrumb item's label. |
| prefix | An optional prefix, usually an icon or icon button. |
| suffix | An optional suffix, usually an icon or icon button. |
| separator | The separator to use for the breadcrumb item. This will only change the separator for this item. If you want to change it for all items in the group, set the separator on `<syn-breadcrumb>` instead. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| href | string \| undefined | - | Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered internally. When unset, a button will be rendered instead. | - |
| target | '_blank' \| '_parent' \| '_self' \| '_top' \| undefined | - | Tells the browser where to open the link. Only used when `href` is set. | - |
| rel | string | 'noreferrer noopener' | The `rel` attribute to use on the link. Only used when `href` is set. | - |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| defaultSlot | HTMLSlotElement | - | - | public |
| href | string \| undefined | - | Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered internally. When unset, a button will be rendered instead. | public |
| target | '_blank' \| '_parent' \| '_self' \| '_top' \| undefined | - | Tells the browser where to open the link. Only used when `href` is set. | public |
| rel | string | 'noreferrer noopener' | The `rel` attribute to use on the link. Only used when `href` is set. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| hrefChanged | - | - | - |
| handleSlotChange | - | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| label | The breadcrumb item's label. |
| prefix | The container that wraps the prefix. |
| suffix | The container that wraps the suffix. |
| separator | The container that wraps the separator. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| - | - | - |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 2.0
