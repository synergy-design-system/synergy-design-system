# syn-accordion

## Summary

Accordions provide the ability to group a list of `<syn-details>`.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-accordion--docs)

## Class Information

- **Module Path:** components/accordion/accordion.js
- **Tag Name:** syn-accordion

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The accordion's main content. Must be `<syn-details />` elements. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| close-others | boolean | false | Indicates whether or not multiple `<syn-detail>` elements can be open at the same time. | - |
| contained | boolean | false | Draws the accordion and the slotted `<syn-details>` as contained elements. | ✓ |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size that should be applied to all slotted `<syn-details>` elements | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| detailsInDefaultSlot | SynDetails[] | - | - | public |
| closeOthers | boolean | false | Indicates whether or not multiple `<syn-detail>` elements can be open at the same time. | public |
| contained | boolean | false | Draws the accordion and the slotted `<syn-details>` as contained elements. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The size that should be applied to all slotted `<syn-details>` elements | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleSizeChange | - | - | - |
| handleContainedChange | - | - | - |
| handleSlotChange | - | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| - | - | - |

## Dependencies

- None

## Usage Information

- **Status:** stable
- **Since:** 1.23.0
