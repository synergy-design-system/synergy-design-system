# syn-drawer

## Summary

Drawers slide in from a container to expose additional options and information.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-drawer--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41163-282330)

## Class Information

- **Tag Name:** `syn-drawer`
- **Import Example:** `import SynDrawer from '@synergy-design-system/components/components/drawer/drawer.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The drawer's main content.
- `label`: The drawer's label. Alternatively, you can use the `label` attribute.
- `header-actions`: Optional actions to add to the header. Works best with `<syn-icon-button>`.
- `footer`: The drawer's footer, usually one or more buttons representing various options.

## Available Properties

### contained

attribute: `contained`
reflects: yes
type: `boolean`
default: `false`

By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of its parent element, set this attribute and add `position: relative` to the parent.

### label

attribute: `label`
reflects: yes
type: `string`
default: `''`

The drawer's label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.

### modal

attribute: -
reflects: -
type: `undefined`
default: `new Modal(this)`

Exposes the internal modal utility that controls focus trapping. To temporarily disable focus trapping and allow third-party modals spawned from an active Synergy modal, call `modal.activateExternal()` when the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Synergy's focus trapping.

### noHeader

attribute: `no-header`
reflects: yes
type: `boolean`
default: `false`

Removes the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the drawer.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state.

### placement

attribute: `placement`
reflects: yes
type: `'top' | 'end' | 'bottom' | 'start'`
default: `'end'`

The direction from which the drawer will open.

## Available Methods

### hide()

parameters: -
returns: `void`

Hides the drawer

### show()

parameters: -
returns: `void`

Shows the drawer.

## Available CSS Parts

- `base`: The component's base wrapper.
- `body`: The drawer's body.
- `close-button`: The close button, an `<syn-icon-button>`.
- `close-button__base`: The close button's exported `base` part.
- `footer`: The drawer's footer.
- `header`: The drawer's header. This element wraps the title and header actions.
- `header-actions`: Optional actions to add to the header. Works best with `<syn-icon-button>`.
- `overlay`: The overlay that covers the screen behind the drawer.
- `panel`: The drawer's panel (where the drawer and its content are rendered).
- `title`: The drawer's title.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the drawer closes and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the drawer opens and all animations are complete.

### syn-hide

type: `SynHideEvent`

Emitted when the drawer closes.

### syn-initial-focus

type: `SynInitialFocusEvent`

Emitted when the drawer opens and is ready to receive focus. Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.

### syn-request-close

type: `SynRequestCloseEvent`

Emitted when the user attempts to close the drawer by clicking the close button, clicking the overlay, or pressing escape. Calling `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in destructive behavior such as data loss.

### syn-show

type: `SynShowEvent`

Emitted when the drawer opens.

## Dependencies

- `syn-icon-button`
