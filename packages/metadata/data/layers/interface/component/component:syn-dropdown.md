# syn-dropdown

## Summary

Dropdowns expose additional content that "drops down" in a panel.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-dropdown--docs)

## Class Information

- **Import Example:** `import SynDropdown from '@synergy-design-system/components/components/dropdown/dropdown.js';`
- **Module Path:** components/dropdown/dropdown.js
- **Tag Name:** `syn-dropdown`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                               |
| --------- | --------------------------------------------------------- |
| (default) | The dropdown's main content.                              |
| trigger   | The dropdown's trigger, usually a `<syn-button>` element. |

## Available Properties

| Property          | Attribute             | Reflects | Type                                                                                                                                                                                                                | Default          | Description                                                                                                                                                                                                             |
| ----------------- | --------------------- | :------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| containingElement | -                     |    -     | `HTMLElement \| undefined`                                                                                                                                                                                          | -                | The dropdown will close when the user interacts outside of this element (e.g. clicking). Useful for composing other components that use a dropdown internally.                                                          |
| disabled          | `disabled`            |    ✓     | `boolean`                                                                                                                                                                                                           | `false`          | Disables the dropdown so the panel will not open.                                                                                                                                                                       |
| distance          | `distance`            |    -     | `number`                                                                                                                                                                                                            | `0`              | The distance in pixels from which to offset the panel away from its trigger.                                                                                                                                            |
| open              | `open`                |    ✓     | `boolean`                                                                                                                                                                                                           | `false`          | Indicates whether or not the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you can use the `show()` and `hide()` methods and this attribute will reflect the dropdown's open state. |
| placement         | `placement`           |    ✓     | `\| 'top'     \| 'top-start'     \| 'top-end'     \| 'bottom'     \| 'bottom-start'     \| 'bottom-end'     \| 'right'     \| 'right-start'     \| 'right-end'     \| 'left'     \| 'left-start'     \| 'left-end'` | `'bottom-start'` | The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel inside of the viewport.                                                                              |
| skidding          | `skidding`            |    -     | `number`                                                                                                                                                                                                            | `0`              | The distance in pixels from which to offset the panel along its trigger.                                                                                                                                                |
| stayOpenOnSelect  | `stay-open-on-select` |    ✓     | `boolean`                                                                                                                                                                                                           | `false`          | By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for dropdowns that allow for multiple interactions.                                                       |
| sync              | `sync`                |    ✓     | `'width' \| 'height' \| 'both' \| undefined`                                                                                                                                                                        | `undefined`      | Syncs the popup width or height to that of the trigger element.                                                                                                                                                         |

## Available Methods

| Name           | Parameters | Return Type | Description                                                                                                                    |
| -------------- | ---------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `hide()`       | -          | -           | Hides the dropdown panel                                                                                                       |
| `reposition()` | -          | -           | Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu is activated. |
| `show()`       | -          | -           | Shows the dropdown panel.                                                                                                      |

## Available CSS Parts

| Name          | Description                                                                          |
| ------------- | ------------------------------------------------------------------------------------ |
| base          | The component's base wrapper, an `<syn-popup>` element.                              |
| base\_\_popup | The popup's exported `popup` part. Use this to target the tooltip's popup container. |
| panel         | The panel that gets shown when the dropdown is open.                                 |
| trigger       | The container that wraps the trigger.                                                |

## Available Events

| Name           | Event Type          | Description                                                        |
| -------------- | ------------------- | ------------------------------------------------------------------ |
| syn-after-hide | `SynAfterHideEvent` | Emitted after the dropdown closes and all animations are complete. |
| syn-after-show | `SynAfterShowEvent` | Emitted after the dropdown opens and all animations are complete.  |
| syn-hide       | `SynHideEvent`      | Emitted when the dropdown closes.                                  |
| syn-show       | `SynShowEvent`      | Emitted when the dropdown opens.                                   |

## Dependencies

- `syn-popup`
