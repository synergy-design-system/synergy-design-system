# syn-details

## Summary

Details show a brief summary and expand to show additional content.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-details--docs)

## Class Information

- **Module Path:** components/details/details.js
- **Tag Name:** syn-details

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The details' main content. |
| summary | The details' summary. Alternatively, you can use the `summary` attribute. |
| expand-icon | Optional expand icon to use instead of the default. Works best with `<syn-icon>`. |
| collapse-icon | Optional collapse icon to use instead of the default. Works best with `<syn-icon>`. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| open | boolean | false | Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you can use the `show()` and `hide()` methods and this attribute will reflect the details' open state. | ✓ |
| summary | string | - | The summary to show in the header. If you need to display HTML, use the `summary` slot instead. | - |
| disabled | boolean | false | Disables the details so it can't be toggled. | ✓ |
| contained | boolean | false | Draws the details as contained element. | ✓ |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The details's size. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| details | HTMLDetailsElement | - | - | public |
| header | HTMLElement | - | - | public |
| body | HTMLElement | - | - | public |
| expandIconSlot | HTMLSlotElement | - | - | public |
| detailsObserver | MutationObserver | - | - | public |
| open | boolean | false | Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you can use the `show()` and `hide()` methods and this attribute will reflect the details' open state. | public |
| summary | string | - | The summary to show in the header. If you need to display HTML, use the `summary` slot instead. | public |
| disabled | boolean | false | Disables the details so it can't be toggled. | public |
| contained | boolean | false | Draws the details as contained element. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The details's size. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleOpenChange | - | - | - |
| show | - | - | Shows the details. |
| hide | - | - | Hides the details |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| header | The header that wraps both the summary and the expand/collapse icon. |
| summary | The container that wraps the summary. |
| summary-icon | The container that wraps the expand/collapse icons. |
| content | The details content. |
| body | The container that wraps the details content. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-show | SynShowEvent | Emitted when the details opens. |
| syn-after-show | SynAfterShowEvent | Emitted after the details opens and all animations are complete. |
| syn-hide | SynHideEvent | Emitted when the details closes. |
| syn-after-hide | SynAfterHideEvent | Emitted after the details closes and all animations are complete. |

## Dependencies

- **syn-icon**

## Usage Information

- **Status:** stable
- **Since:** 2.0
