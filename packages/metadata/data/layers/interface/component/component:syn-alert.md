# syn-alert

## Summary

Alerts are used to display important messages inline or as toast notifications.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-alert--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41137-630160)

## Class Information

- **Tag Name:** `syn-alert`
- **Import Example:** `import SynAlert from '@synergy-design-system/components/components/alert/alert.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The alert's main content.
- `icon`: An icon to show in the alert. Works best with `<syn-icon>`.

## Available Properties

### closable

attribute: `closable`
reflects: yes
type: `boolean`
default: `false`

Enables a close button that allows the user to dismiss the alert.

### duration

attribute: `duration`
reflects: no
type: `undefined`
default: `Infinity`

The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning the alert will not close on its own.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.

### size

attribute: `size`
reflects: yes
type: `'small' | 'medium' | 'large'`
default: `'medium'`

The alert's size.

### variant

attribute: `variant`
reflects: yes
type: `'primary' | 'success' | 'neutral' | 'warning' | 'danger'`
default: `'primary'`

The alert's theme variant.

## Available Methods

### hide()

parameters: -
returns: `void`

Hides the alert

### show()

parameters: -
returns: `void`

Shows the alert.

### toast()

parameters: -
returns: `void`

Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
calling this method again. The returned promise will resolve after the alert is hidden.

## Available CSS Parts

- `base`: The component's base wrapper.
- `close-button`: The close button, an `<syn-icon-button>`.
- `close-button__base`: The close button's exported `base` part.
- `icon`: The container that wraps the optional icon.
- `message`: The container that wraps the alert's main content.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the alert closes and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the alert opens and all animations are complete.

### syn-hide

type: `SynHideEvent`

Emitted when the alert closes.

### syn-show

type: `SynShowEvent`

Emitted when the alert opens.

## Dependencies

- `syn-icon-button`
