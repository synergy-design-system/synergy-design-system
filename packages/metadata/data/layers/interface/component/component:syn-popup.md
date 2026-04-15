# syn-popup

## Summary

Popup is a utility that lets you declaratively anchor "popup" containers to another element.

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-popup--docs)

## Class Information

- **Tag Name:** `syn-popup`
- **Import Example:** `import SynPopup from '@synergy-design-system/components/components/popup/popup.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: The popup's content.
- `anchor`: The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the `anchor` attribute or property instead.

## Available Properties

### active

attribute: `active`
reflects: yes
type: `boolean`
default: `false`

Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn down and the popup will be hidden.

### anchor

attribute: `anchor`
reflects: no
type: `Element | string | VirtualElement`
default: none

The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide the anchor element `id`, a DOM element reference, or a `VirtualElement`. If the anchor lives inside the popup, use the `anchor` slot instead.

### arrow

attribute: `arrow`
reflects: no
type: `boolean`
default: `false`

Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and `--arrow-color` custom properties. For additional customizations, you can also target the arrow using `::part(arrow)` in your stylesheet.

### arrowPadding

attribute: `arrow-padding`
reflects: no
type: `number`
default: `10`

The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example, this will prevent it from overflowing the corners.

### arrowPlacement

attribute: `arrow-placement`
reflects: no
type: `'start' | 'end' | 'center' | 'anchor'`
default: `'anchor'`

The placement of the arrow. The default is `anchor`, which will align the arrow as close to the center of the anchor as possible, considering available space and `arrow-padding`. A value of `start`, `end`, or `center` will align the arrow to the start, end, or center of the popover instead.

### autoSize

attribute: `auto-size`
reflects: no
type: `'horizontal' | 'vertical' | 'both'`
default: none

When set, this will cause the popup to automatically resize itself to prevent it from overflowing.

### autoSizeBoundary

attribute: `autoSizeBoundary`
reflects: no
type: `Element | Element[]`
default: none

The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property.

### autoSizePadding

attribute: `auto-size-padding`
reflects: no
type: `number`
default: `0`

The amount of padding, in pixels, to exceed before the auto-size behavior will occur.

### distance

attribute: `distance`
reflects: no
type: `number`
default: `0`

The distance in pixels from which to offset the panel away from its anchor.

### flip

attribute: `flip`
reflects: no
type: `boolean`
default: `false`

When set, placement of the popup will flip to the opposite site to keep it in view. You can use `flipFallbackPlacements` to further configure how the fallback placement is determined.

### flipBoundary

attribute: `flipBoundary`
reflects: no
type: `Element | Element[]`
default: none

The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property.

### flipFallbackPlacements

attribute: `flip-fallback-placements`
reflects: no
type: `string`
default: `''`

If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip fallback strategy will be used instead.

### flipFallbackStrategy

attribute: `flip-fallback-strategy`
reflects: no
type: `'best-fit' | 'initial'`
default: `'best-fit'`

When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether the popup should be positioned using the best available fit based on available space or as it was initially preferred.

### flipPadding

attribute: `flip-padding`
reflects: no
type: `number`
default: `0`

The amount of padding, in pixels, to exceed before the flip behavior will occur.

### hoverBridge

attribute: `hover-bridge`
reflects: no
type: `boolean`
default: `false`

When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the gap using an invisible element. This makes listening for events such as `mouseenter` and `mouseleave` more sane because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is active.

### placement

attribute: `placement`
reflects: yes
type: `| 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end'`
default: `'top'`

The preferred placement of the popup. Note that the actual placement will vary as configured to keep the panel inside of the viewport.

### popup

attribute: -
reflects: -
type: `HTMLElement`
default: none

A reference to the internal popup container. Useful for animating and styling the popup with JavaScript.

### shift

attribute: `shift`
reflects: no
type: `boolean`
default: `false`

Moves the popup along the axis to keep it in view when clipped.

### shiftBoundary

attribute: `shiftBoundary`
reflects: no
type: `Element | Element[]`
default: none

The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can change the boundary by passing a reference to one or more elements to this property.

### shiftPadding

attribute: `shift-padding`
reflects: no
type: `number`
default: `0`

The amount of padding, in pixels, to exceed before the shift behavior will occur.

### skidding

attribute: `skidding`
reflects: no
type: `number`
default: `0`

The distance in pixels from which to offset the panel along its anchor.

### sync

attribute: `sync`
reflects: no
type: `'width' | 'height' | 'both'`
default: none

Syncs the popup's width or height to that of the anchor element.

## Available Methods

### reposition()

parameters: -
returns: `void`

Forces the popup to recalculate and reposition itself.

## Available CSS Parts

- `arrow`: The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and maybe a border or box shadow.
- `hover-bridge`: The hover bridge element. Only available when the `hover-bridge` option is enabled.
- `popup`: The popup's container. Useful for setting a background color, box shadow, etc.

## Available Events

### syn-reposition

type: `SynRepositionEvent`

Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive operations in your listener or consider debouncing it.
