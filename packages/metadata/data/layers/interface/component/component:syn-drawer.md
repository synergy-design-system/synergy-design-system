# syn-drawer

## Summary

Drawers slide in from a container to expose additional options and information.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-drawer--docs)

## Class Information

- **Module Path:** components/drawer/drawer.js
- **Tag Name:** syn-drawer

## Available Slots

| Name | Description |
|------|-------------|
| (default) | The drawer's main content. |
| label | The drawer's label. Alternatively, you can use the `label` attribute. |
| header-actions | Optional actions to add to the header. Works best with `<syn-icon-button>`. |
| footer | The drawer's footer, usually one or more buttons representing various options. |

## Available Attributes

| Name | Type | Default | Description | Reflects |
|------|------|---------|-------------|----------|
| open | boolean | false | Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state. | ✓ |
| label | string | '' | The drawer's label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. | ✓ |
| placement | 'top' \| 'end' \| 'bottom' \| 'start' | 'end' | The direction from which the drawer will open. | ✓ |
| contained | boolean | false | By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of its parent element, set this attribute and add `position: relative` to the parent. | ✓ |
| no-header | boolean | false | Removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the drawer. | ✓ |

## Available Properties

| Name | Type | Default | Description | Access |
|------|------|---------|-------------|--------|
| modal | - | new Modal(this) | Exposes the internal modal utility that controls focus trapping. To temporarily disable focus trapping and allow third-party modals spawned from an active Synergy modal, call `modal.activateExternal()` when the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Synergy's focus trapping. | public |
| drawer | HTMLElement | - | - | public |
| panel | HTMLElement | - | - | public |
| overlay | HTMLElement | - | - | public |
| open | boolean | false | Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state. | public |
| label | string | '' | The drawer's label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead. | public |
| placement | 'top' \| 'end' \| 'bottom' \| 'start' | 'end' | The direction from which the drawer will open. | public |
| contained | boolean | false | By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of its parent element, set this attribute and add `position: relative` to the parent. | public |
| noHeader | boolean | false | Removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the drawer. | public |

## Available Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| handleOpenChange | - | - | - |
| handleNoModalChange | - | - | - |
| show | - | - | Shows the drawer. |
| hide | - | - | Hides the drawer |
| forceVisibility | isVisible: boolean | - | - |

## Available CSS Parts

| Name | Description |
|------|-------------|
| base | The component's base wrapper. |
| overlay | The overlay that covers the screen behind the drawer. |
| panel | The drawer's panel (where the drawer and its content are rendered). |
| header | The drawer's header. This element wraps the title and header actions. |
| header-actions | Optional actions to add to the header. Works best with `<syn-icon-button>`. |
| title | The drawer's title. |
| close-button | The close button, an `<syn-icon-button>`. |
| close-button__base | The close button's exported `base` part. |
| body | The drawer's body. |
| footer | The drawer's footer. |

## Available Events

| Name | Event Type | Description |
|------|------------|-------------|
| syn-show | SynShowEvent | Emitted when the drawer opens. |
| syn-after-show | SynAfterShowEvent | Emitted after the drawer opens and all animations are complete. |
| syn-hide | SynHideEvent | Emitted when the drawer closes. |
| syn-after-hide | SynAfterHideEvent | Emitted after the drawer closes and all animations are complete. |
| syn-initial-focus | SynInitialFocusEvent | Emitted when the drawer opens and is ready to receive focus. Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input. |
| syn-request-close | SynRequestCloseEvent | Emitted when the user attempts to close the drawer by clicking the close button, clicking the overlay, or pressing escape. Calling `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in destructive behavior such as data loss. |

## Dependencies

- **syn-icon-button**

## Usage Information

- **Status:** stable
- **Since:** 2.0
