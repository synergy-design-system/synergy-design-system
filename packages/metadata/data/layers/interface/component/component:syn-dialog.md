# syn-dialog

## Summary

Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.

## Documentation

[Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-dialog--docs)

## Class Information

- **Import Example:** `import SynDialog from '@synergy-design-system/components/components/dialog/dialog.js';`
- **Module Path:** components/dialog/dialog.js
- **Tag Name:** `syn-dialog`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name           | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| (default)      | The dialog's main content.                                                     |
| label          | The dialog's label. Alternatively, you can use the `label` attribute.          |
| header-actions | Optional actions to add to the header. Works best with `<syn-icon-button>`.    |
| footer         | The dialog's footer, usually one or more buttons representing various options. |

## Available Properties

| Property | Attribute   | Reflects | Type      | Default           | Description                                                                                                                                                                                                                                                                                                                      |
| -------- | ----------- | :------: | --------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label    | `label`     |    ✓     | `string`  | `''`              | The dialog's label as displayed in the header. You should always include a relevant label even when using `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.                                                                                                    |
| modal    | -           |    -     | `-`       | `new Modal(this)` | Exposes the internal modal utility that controls focus trapping. To temporarily disable focus trapping and allow third-party modals spawned from an active Synergy modal, call `modal.activateExternal()` when the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Synergy's focus trapping. |
| noHeader | `no-header` |    ✓     | `boolean` | `false`           | Disables the header. This will also remove the default close button, so please ensure you provide an easy, accessible way for users to dismiss the dialog.                                                                                                                                                                       |
| open     | `open`      |    ✓     | `boolean` | `false`           | Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state.                                                                                                                |

## Available Methods

| Name     | Parameters | Return Type | Description       |
| -------- | ---------- | ----------- | ----------------- |
| `hide()` | -          | -           | Hides the dialog  |
| `show()` | -          | -           | Shows the dialog. |

## Available CSS Parts

| Name                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| base                 | The component's base wrapper.                                               |
| body                 | The dialog's body.                                                          |
| close-button         | The close button, an `<syn-icon-button>`.                                   |
| close-button\_\_base | The close button's exported `base` part.                                    |
| footer               | The dialog's footer.                                                        |
| header               | The dialog's header. This element wraps the title and header actions.       |
| header-actions       | Optional actions to add to the header. Works best with `<syn-icon-button>`. |
| overlay              | The overlay that covers the screen behind the dialog.                       |
| panel                | The dialog's panel (where the dialog and its content are rendered).         |
| title                | The dialog's title.                                                         |

## Available Events

| Name              | Event Type             | Description                                                                                                                                                                                                                                                                              |
| ----------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| syn-after-hide    | `SynAfterHideEvent`    | Emitted after the dialog closes and all animations are complete.                                                                                                                                                                                                                         |
| syn-after-show    | `SynAfterShowEvent`    | Emitted after the dialog opens and all animations are complete.                                                                                                                                                                                                                          |
| syn-hide          | `SynHideEvent`         | Emitted when the dialog closes.                                                                                                                                                                                                                                                          |
| syn-initial-focus | `SynInitialFocusEvent` | Emitted when the dialog opens and is ready to receive focus. Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.                                                                                                    |
| syn-request-close | `SynRequestCloseEvent` | Emitted when the user attempts to close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in destructive behavior such as data loss. |
| syn-show          | `SynShowEvent`         | Emitted when the dialog opens.                                                                                                                                                                                                                                                           |

## Dependencies

- `syn-icon-button`
