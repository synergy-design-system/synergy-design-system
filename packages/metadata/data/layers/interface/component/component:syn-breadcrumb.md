# syn-breadcrumb

## Summary

Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41137-748938)

## Class Information

- **Tag Name:** `syn-breadcrumb`
- **Import Example:** `import SynBreadcrumb from '@synergy-design-system/components/components/breadcrumb/breadcrumb.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: One or more breadcrumb items to display.
- `separator`: The separator to use between breadcrumb items. Works best with `<syn-icon>`.

## Available Properties

### label

attribute: `label`
reflects: no
type: `string`
default: `''`

The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by screen readers and other assistive devices to provide more context for users.

## Available CSS Parts

- `base`: The component's base wrapper.

## Dependencies

- `syn-icon`
