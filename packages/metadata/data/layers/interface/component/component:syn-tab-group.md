# syn-tab-group

## Summary

Tab groups organize content into a container that shows one section at a time.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tab-group--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=42207-338578)

## Class Information

- **Import Example:** `import SynTabGroup from '@synergy-design-system/components/components/tab-group/tab-group.js';`
- **Tag Name:** `syn-tab-group`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| (default) | Used for grouping tab panels in the tab group. Must be `<syn-tab-panel>` elements. |
| nav       | Used for grouping tabs in the tab group. Must be `<syn-tab>` elements.             |

## Available Properties

| Property            | Attribute               | Reflects | Type                        | Default  | Description                                                                                                                                                                                                       |
| ------------------- | ----------------------- | :------: | --------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activation          | `activation`            |    -     | `'auto' \| 'manual'`        | `'auto'` | When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to manual, the tab will receive focus but will not show until the user presses spacebar or enter. |
| contained           | `contained`             |    -     | `boolean`                   | `false`  | Draws the tab group as a contained element.                                                                                                                                                                       |
| fixedScrollControls | `fixed-scroll-controls` |    -     | `boolean`                   | `false`  | Prevent scroll buttons from being hidden when inactive.                                                                                                                                                           |
| noScrollControls    | `no-scroll-controls`    |    -     | `boolean`                   | `false`  | Disables the scroll arrows that appear when tabs overflow.                                                                                                                                                        |
| placement           | `placement`             |    -     | `'top' \| 'start' \| 'end'` | `'top'`  | The placement of the tabs.                                                                                                                                                                                        |
| sharp               | `sharp`                 |    -     | `boolean`                   | `false`  | Draws the tab group with edges instead of roundings. Takes only effect if used with the 'contained' property                                                                                                      |

## Available Methods

| Name     | Parameters      | Return Type | Description                    |
| -------- | --------------- | ----------- | ------------------------------ |
| `show()` | `panel: string` | -           | Shows the specified tab panel. |

## Available CSS Parts

| Name                  | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| active-tab-indicator  | The line that highlights the currently selected tab.                                         |
| base                  | The component's base wrapper.                                                                |
| body                  | The tab group's body where tab panels are slotted in.                                        |
| nav                   | The tab group's navigation container where tabs are slotted in.                              |
| scroll-button         | The previous/next scroll buttons that show when tabs are scrollable, an `<syn-icon-button>`. |
| scroll-button\_\_base | The scroll button's exported `base` part.                                                    |
| scroll-button--end    | The ending scroll button.                                                                    |
| scroll-button--start  | The starting scroll button.                                                                  |
| tabs                  | The container that wraps the tabs.                                                           |

## Available Events

| Name         | Event Type        | Description                                                                                             |
| ------------ | ----------------- | ------------------------------------------------------------------------------------------------------- |
| syn-tab-hide | `SynTabHideEvent` | Emitted when a tab is hidden. The payload of the event returns the "panel" attribute of the hidden tab. |
| syn-tab-show | `SynTabShowEvent` | Emitted when a tab is shown. The payload of the event returns the "panel" attribute of the shown tab.   |

## Dependencies

- `syn-icon-button`
