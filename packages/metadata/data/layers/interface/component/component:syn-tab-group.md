# syn-tab-group

## Summary

Tab groups organize content into a container that shows one section at a time.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tab-group--docs)

## Class Information

- **Module Path:** components/tab-group/tab-group.js
- **Tag Name:** syn-tab-group

## Available Slots

| Name      | Description                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| (default) | Used for grouping tab panels in the tab group. Must be `<syn-tab-panel>` elements. |
| nav       | Used for grouping tabs in the tab group. Must be `<syn-tab>` elements.             |

## Available Attributes

| Name                  | Type                      | Default | Description                                                                                                                                                                                                       | Reflects |
| --------------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| placement             | 'top' \| 'start' \| 'end' | 'top'   | The placement of the tabs.                                                                                                                                                                                        | -        |
| activation            | 'auto' \| 'manual'        | 'auto'  | When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to manual, the tab will receive focus but will not show until the user presses spacebar or enter. | -        |
| no-scroll-controls    | boolean                   | false   | Disables the scroll arrows that appear when tabs overflow.                                                                                                                                                        | -        |
| contained             | boolean                   | false   | Draws the tab group as a contained element.                                                                                                                                                                       | -        |
| sharp                 | boolean                   | false   | Draws the tab group with edges instead of roundings. Takes only effect if used with the 'contained' property                                                                                                      | -        |
| fixed-scroll-controls | boolean                   | false   | Prevent scroll buttons from being hidden when inactive.                                                                                                                                                           | -        |

## Available Properties

| Name                | Type                      | Default | Description                                                                                                                                                                                                       | Access |
| ------------------- | ------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| tabs                | SynTab[]                  | -       | -                                                                                                                                                                                                                 | public |
| panels              | SynTabPanel[]             | -       | -                                                                                                                                                                                                                 | public |
| tabGroup            | HTMLElement               | -       | -                                                                                                                                                                                                                 | public |
| body                | HTMLSlotElement           | -       | -                                                                                                                                                                                                                 | public |
| nav                 | HTMLElement               | -       | -                                                                                                                                                                                                                 | public |
| indicator           | HTMLElement               | -       | -                                                                                                                                                                                                                 | public |
| placement           | 'top' \| 'start' \| 'end' | 'top'   | The placement of the tabs.                                                                                                                                                                                        | public |
| activation          | 'auto' \| 'manual'        | 'auto'  | When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to manual, the tab will receive focus but will not show until the user presses spacebar or enter. | public |
| noScrollControls    | boolean                   | false   | Disables the scroll arrows that appear when tabs overflow.                                                                                                                                                        | public |
| contained           | boolean                   | false   | Draws the tab group as a contained element.                                                                                                                                                                       | public |
| sharp               | boolean                   | false   | Draws the tab group with edges instead of roundings. Takes only effect if used with the 'contained' property                                                                                                      | public |
| fixedScrollControls | boolean                   | false   | Prevent scroll buttons from being hidden when inactive.                                                                                                                                                           | public |

## Available Methods

| Name                 | Parameters    | Return Type | Description                    |
| -------------------- | ------------- | ----------- | ------------------------------ |
| updateScrollControls | -             | -           | -                              |
| syncIndicator        | -             | -           | -                              |
| show                 | panel: string | -           | Shows the specified tab panel. |
| preventFocus         | e: MouseEvent | -           | -                              |

## Available CSS Parts

| Name                  | Description                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------- |
| base                  | The component's base wrapper.                                                                |
| nav                   | The tab group's navigation container where tabs are slotted in.                              |
| tabs                  | The container that wraps the tabs.                                                           |
| active-tab-indicator  | The line that highlights the currently selected tab.                                         |
| body                  | The tab group's body where tab panels are slotted in.                                        |
| scroll-button         | The previous/next scroll buttons that show when tabs are scrollable, an `<syn-icon-button>`. |
| scroll-button--start  | The starting scroll button.                                                                  |
| scroll-button--end    | The ending scroll button.                                                                    |
| scroll-button\_\_base | The scroll button's exported `base` part.                                                    |

## Available Events

| Name         | Event Type      | Description                                                                                             |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------------- |
| syn-tab-show | SynTabShowEvent | Emitted when a tab is shown. The payload of the event returns the "panel" attribute of the shown tab.   |
| syn-tab-hide | SynTabHideEvent | Emitted when a tab is hidden. The payload of the event returns the "panel" attribute of the hidden tab. |

## Dependencies

- **syn-icon-button**

## Usage Information

- **Status:** stable
- **Since:** 2.0
