# syn-tab

## Summary

Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs)

## Class Information

- **Module Path:** components/tab/tab.js
- **Tag Name:** syn-tab

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The tab's label. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| panel | string | '' | The name of the tab panel this tab is associated with. The panel must be located in the same tab group. | ✓ |
| active | boolean | false | Draws the tab in an active state. | ✓ |
| closable | boolean | false | Makes the tab closable and shows a close button. | ✓ |
| disabled | boolean | false | Disables the tab and prevents selection. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| tab | HTMLElement | - | - | public |
| panel | string | '' | The name of the tab panel this tab is associated with. The panel must be located in the same tab group. | public |
| active | boolean | false | Draws the tab in an active state. | public |
| closable | boolean | false | Makes the tab closable and shows a close button. | public |
| disabled | boolean | false | Disables the tab and prevents selection. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleActiveChange | - | - | - |
| handleDisabledChange | - | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| close-button | The close button, an `<syn-icon-button>`. |
| close-button__base | The close button's exported `base` part. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-close | SynCloseEvent | Emitted when the tab is closable and the close button is activated. |

## Dependencies

- **syn-icon-button**

## Usage Information

- **Status:** stable
- **Since:** 2.0
