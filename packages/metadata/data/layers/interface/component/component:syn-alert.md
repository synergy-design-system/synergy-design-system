# syn-alert

## Summary

Alerts are used to display important messages inline or as toast notifications.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs)

## Class Information

- **Import Example:** `import SynAlert from '@synergy-design-system/components/components/alert/alert.js';`
- **Module Path:** components/alert/alert.js
- **Tag Name:** `syn-alert`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                                 |
| --------- | ----------------------------------------------------------- |
| (default) | The alert's main content.                                   |
| icon      | An icon to show in the alert. Works best with `<syn-icon>`. |

## Available Properties

| Property | Attribute  | Reflects | Type                                                           | Default     | Description                                                                                                                                                                                                                                                        |
| -------- | ---------- | :------: | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| closable | `closable` |    ✓     | `boolean`                                                      | `false`     | Enables a close button that allows the user to dismiss the alert.                                                                                                                                                                                                  |
| duration | `duration` |    -     | `-`                                                            | `Infinity`  | The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning the alert will not close on its own. |
| open     | `open`     |    ✓     | `boolean`                                                      | `false`     | Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.                                                     |
| size     | `size`     |    ✓     | `'small' \| 'medium' \| 'large'`                               | `'medium'`  | The alert's size.                                                                                                                                                                                                                                                  |
| variant  | `variant`  |    ✓     | `'primary' \| 'success' \| 'neutral' \| 'warning' \| 'danger'` | `'primary'` | The alert's theme variant.                                                                                                                                                                                                                                         |

## Available Methods

| Name      | Parameters | Return Type | Description                                                                                                                                                                                                                                                                                                           |
| --------- | ---------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hide()`  | -          | -           | Hides the alert                                                                                                                                                                                                                                                                                                       |
| `show()`  | -          | -           | Shows the alert.                                                                                                                                                                                                                                                                                                      |
| `toast()` | -          | -           | Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by calling this method again. The returned promise will resolve after the alert is hidden. |

## Available CSS Parts

| Name                 | Description                                        |
| -------------------- | -------------------------------------------------- |
| base                 | The component's base wrapper.                      |
| close-button         | The close button, an `<syn-icon-button>`.          |
| close-button\_\_base | The close button's exported `base` part.           |
| icon                 | The container that wraps the optional icon.        |
| message              | The container that wraps the alert's main content. |

## Available Events

| Name           | Event Type          | Description                                                     |
| -------------- | ------------------- | --------------------------------------------------------------- |
| syn-after-hide | `SynAfterHideEvent` | Emitted after the alert closes and all animations are complete. |
| syn-after-show | `SynAfterShowEvent` | Emitted after the alert opens and all animations are complete.  |
| syn-hide       | `SynHideEvent`      | Emitted when the alert closes.                                  |
| syn-show       | `SynShowEvent`      | Emitted when the alert opens.                                   |

## Dependencies

- `syn-icon-button`
