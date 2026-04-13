# syn-resize-observer

## Summary

The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

## Documentation

- [Component Documentation](https://synergy-design-system.github.io/?path=/docs/components-syn-resize-observer--docs)

## Class Information

- **Import Example:** `import SynResizeObserver from '@synergy-design-system/components/components/resize-observer/resize-observer.js';`
- **Tag Name:** `syn-resize-observer`

## Usage Information

- **Status:** stable
- **Since:** 2.0

## Available Slots

| Name      | Description                                 |
| --------- | ------------------------------------------- |
| (default) | One or more elements to watch for resizing. |

## Available Properties

| Property | Attribute  | Reflects | Type      | Default | Description            |
| -------- | ---------- | :------: | --------- | ------- | ---------------------- |
| disabled | `disabled` |    ✓     | `boolean` | `false` | Disables the observer. |

## Available Events

| Name       | Event Type       | Description                          |
| ---------- | ---------------- | ------------------------------------ |
| syn-resize | `SynResizeEvent` | Emitted when the element is resized. |
