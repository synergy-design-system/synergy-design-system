# syn-tooltip

## Summary

Tooltips display additional information based on a specific action.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-tooltip--docs)
- [Figma Design](https://www.figma.com/file/bZFqk9urD3NlghGUKrkKCR/Synergy-Digital-Design-System?type=design&node-id=41337-203414)

## Class Information

- **Tag Name:** `syn-tooltip`
- **Import Example:** `import SynTooltip from '@synergy-design-system/components/components/tooltip/tooltip.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The tooltip's target element. Avoid slotting in more than one element, as subsequent ones will be ignored.
- `content`: The content to render in the tooltip. Alternatively, you can use the `content` attribute.

## Available Properties

### content

attribute: `content`
reflects: no
type: `string`
default: `''`

The tooltip's content. If you need to display HTML, use the `content` slot instead.

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the tooltip so it won't show when triggered.

### distance

attribute: `distance`
reflects: no
type: `number`
default: `13`

The distance in pixels from which to offset the tooltip away from its target.

### open

attribute: `open`
reflects: yes
type: `boolean`
default: `false`

Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods.

### placement

attribute: `placement`
reflects: no
type: `| 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'`
default: `'top'`

The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip inside of the viewport.

### skidding

attribute: `skidding`
reflects: no
type: `number`
default: `0`

The distance in pixels from which to offset the tooltip along its target.

### trigger

attribute: `trigger`
reflects: no
type: `string`
default: `'hover focus'`

Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple options can be passed by separating them with a space. When manual is used, the tooltip must be activated programmatically.

## Available Methods

### hide()

parameters: -
returns: `void`

Hides the tooltip

### show()

parameters: -
returns: `void`

Shows the tooltip.

## Available CSS Parts

- `base`: The component's base wrapper, an `<syn-popup>` element.
- `base__arrow`: The popup's exported `arrow` part. Use this to target the tooltip's arrow.
- `base__popup`: The popup's exported `popup` part. Use this to target the tooltip's popup container.
- `body`: The tooltip's body where its content is rendered.

## Available Events

### syn-after-hide

type: `SynAfterHideEvent`

Emitted after the tooltip has hidden and all animations are complete.

### syn-after-show

type: `SynAfterShowEvent`

Emitted after the tooltip has shown and all animations are complete.

### syn-hide

type: `SynHideEvent`

Emitted when the tooltip begins to hide.

### syn-show

type: `SynShowEvent`

Emitted when the tooltip begins to show.

## Dependencies

- `syn-popup`
