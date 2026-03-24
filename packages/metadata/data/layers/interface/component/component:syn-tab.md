# syn-tab

## Summary

Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs)

## Class Information

- **Import Example:** `import SynTab from '@synergy-design-system/components/components/tab/tab.js';`
- **Module Path:** components/tab/tab.js
- **Tag Name:** `syn-tab`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description      |
| --------- | ---------------- |
| (default) | The tab's label. |

## Available Properties

| Property | Attribute  | Reflects | Type      | Default | Description                                                                                             |
| -------- | ---------- | :------: | --------- | ------- | ------------------------------------------------------------------------------------------------------- |
| active   | `active`   |    ✓     | `boolean` | `false` | Draws the tab in an active state.                                                                       |
| closable | `closable` |    ✓     | `boolean` | `false` | Makes the tab closable and shows a close button.                                                        |
| disabled | `disabled` |    ✓     | `boolean` | `false` | Disables the tab and prevents selection.                                                                |
| panel    | `panel`    |    ✓     | `string`  | `''`    | The name of the tab panel this tab is associated with. The panel must be located in the same tab group. |

## Available CSS Parts

| Name                 | Description                               |
| -------------------- | ----------------------------------------- |
| base                 | The component's base wrapper.             |
| close-button         | The close button, an `<syn-icon-button>`. |
| close-button\_\_base | The close button's exported `base` part.  |

## Available Events

| Name      | Event Type      | Description                                                         |
| --------- | --------------- | ------------------------------------------------------------------- |
| syn-close | `SynCloseEvent` | Emitted when the tab is closable and the close button is activated. |

## Dependencies

- `syn-icon-button`
