# syn-tab

## Summary

Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tab--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=42207-338162)

## Class Information

- **Tag Name:** `syn-tab`
- **Import Example:** `import SynTab from '@synergy-design-system/components/components/tab/tab.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The tab's label.

## Available Properties

### active

attribute: `active`
reflects: yes
type: `boolean`
default: `false`

Draws the tab in an active state.

### closable

attribute: `closable`
reflects: yes
type: `boolean`
default: `false`

Makes the tab closable and shows a close button.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the tab and prevents selection.

### panel

attribute: `panel`
reflects: yes
type: `string`
default: `''`

The name of the tab panel this tab is associated with. The panel must be located in the same tab group.

## Available CSS Parts

- `base`: The component's base wrapper.
- `close-button`: The close button, an `<syn-icon-button>`.
- `close-button__base`: The close button's exported `base` part.

## Available Events

### syn-close

type: `SynCloseEvent`

Emitted when the tab is closable and the close button is activated.

## Dependencies

- `syn-icon-button`
