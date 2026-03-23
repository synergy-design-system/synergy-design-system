# syn-alert

## Summary

Alerts are used to display important messages inline or as toast notifications.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs)

## Class Information

- **Module Path:** components/alert/alert.js
- **Tag Name:** syn-alert

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The alert's main content. |
| icon | An icon to show in the alert. Works best with `<syn-icon>`. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| open | boolean | false | Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can use the `show()` and `hide()` methods and this attribute will reflect the alert's open state. | ✓ |
| closable | boolean | false | Enables a close button that allows the user to dismiss the alert. | ✓ |
| variant | 'primary' \| 'success' \| 'neutral' \| 'warning' \| 'danger' | 'primary' | The alert's theme variant. | ✓ |
| duration | - | Infinity | The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning the alert will not close on its own. | - |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The alert's size. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| base | HTMLElement | - | - | public |
| countdownElement | HTMLElement | - | - | public |
| open | boolean | false | Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can use the `show()` and `hide()` methods and this attribute will reflect the alert's open state. | public |
| closable | boolean | false | Enables a close button that allows the user to dismiss the alert. | public |
| variant | 'primary' \| 'success' \| 'neutral' \| 'warning' \| 'danger' | 'primary' | The alert's theme variant. | public |
| duration | - | Infinity | The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning the alert will not close on its own. | public |
| size | 'small' \| 'medium' \| 'large' | 'medium' | The alert's size. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleOpenChange | - | - | - |
| handleDurationChange | - | - | - |
| show | - | - | Shows the alert. |
| hide | - | - | Hides the alert |
| toast | - | - | Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by calling this method again. The returned promise will resolve after the alert is hidden. |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| icon | The container that wraps the optional icon. |
| message | The container that wraps the alert's main content. |
| close-button | The close button, an `<syn-icon-button>`. |
| close-button__base | The close button's exported `base` part. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-show | SynShowEvent | Emitted when the alert opens. |
| syn-after-show | SynAfterShowEvent | Emitted after the alert opens and all animations are complete. |
| syn-hide | SynHideEvent | Emitted when the alert closes. |
| syn-after-hide | SynAfterHideEvent | Emitted after the alert closes and all animations are complete. |

## Dependencies

- **syn-icon-button**

## Usage Information

- **Status:** stable
- **Since:** 2.0
