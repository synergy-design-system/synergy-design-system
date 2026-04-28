# syn-breadcrumb-item

## Summary

Breadcrumb Items are used inside [breadcrumbs](/components/breadcrumb) to represent different links.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb-item--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41127-679600)

## Class Information

- **Tag Name:** `syn-breadcrumb-item`
- **Import Example:** `import SynBreadcrumbItem from '@synergy-design-system/components/components/breadcrumb-item/breadcrumb-item.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The breadcrumb item's label.
- `prefix`: An optional prefix, usually an icon or icon button.
- `suffix`: An optional suffix, usually an icon or icon button.
- `separator`: The separator to use for the breadcrumb item. This will only change the separator for this item. If you want to change it for all items in the group, set the separator on `<syn-breadcrumb>` instead.

## Available Properties

### href

attribute: `href`
reflects: no
type: `string | undefined`
default: none

Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered internally. When unset, a button will be rendered instead.

### rel

attribute: `rel`
reflects: no
type: `string`
default: `'noreferrer noopener'`

The `rel` attribute to use on the link. Only used when `href` is set.

### target

attribute: `target`
reflects: no
type: `'_blank' | '_parent' | '_self' | '_top' | undefined`
default: none

Tells the browser where to open the link. Only used when `href` is set.

## Available CSS Parts

- `base`: The component's base wrapper.
- `label`: The breadcrumb item's label.
- `prefix`: The container that wraps the prefix.
- `separator`: The container that wraps the separator.
- `suffix`: The container that wraps the suffix.
