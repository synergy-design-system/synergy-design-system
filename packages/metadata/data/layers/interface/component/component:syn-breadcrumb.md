# syn-breadcrumb

## Summary

Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-breadcrumb--docs)

## Class Information

- **Import Example:** `import SynBreadcrumb from '@synergy-design-system/components/components/breadcrumb/breadcrumb.js';`
- **Module Path:** components/breadcrumb/breadcrumb.js
- **Tag Name:** `syn-breadcrumb`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| (default) | One or more breadcrumb items to display.                                     |
| separator | The separator to use between breadcrumb items. Works best with `<syn-icon>`. |

## Available Properties

| Property | Attribute | Reflects | Type     | Default | Description                                                                                                                                                                                  |
| -------- | --------- | :------: | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label    | `label`   |    -     | `string` | `''`    | The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by screen readers and other assistive devices to provide more context for users. |

## Available CSS Parts

| Name | Description                   |
| ---- | ----------------------------- |
| base | The component's base wrapper. |

## Dependencies

- `syn-icon`
