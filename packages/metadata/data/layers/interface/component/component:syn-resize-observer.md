# syn-resize-observer

## Summary

The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-resize-observer--docs)

## Class Information

- **Tag Name:** `syn-resize-observer`
- **Import Example:** `import SynResizeObserver from '@synergy-design-system/components/components/resize-observer/resize-observer.js';`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

- `(default)`: One or more elements to watch for resizing.

## Available Properties

### disabled

attribute: `disabled`
reflects: yes
type: `boolean`
default: `false`

Disables the observer.

## Available Events

### syn-resize

type: `SynResizeEvent`

Emitted when the element is resized.
