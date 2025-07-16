
## Default

Tooltips display additional information based on a specific action.A tooltip’s target is its first child element, so you should only wrap one element inside of the tooltip. If you need the tooltip to show up for multiple elements, nest them inside a container first.Tooltips use display: contents so they won’t interfere with how elements are positioned in a flex or grid layout.

```html

```

---

## Placement

Use the placement attribute to set the preferred placement of the tooltip.

```html

```

---

## Click Trigger

Set the trigger attribute to click to toggle the tooltip on click instead of hover.

```html

```

---

## Manual Trigger

Tooltips can be controlled programmatically by setting the trigger attribute to manual. Use the open attribute to control when the tooltip is shown.

```html

```

---

## Removing Arrows

You can control the size of tooltip arrows by overriding the --syn-tooltip-arrow-size design token. To remove them, set the value to 0 as shown below.

```html

```

---

## HTML In Tooltips

Use the content slot to create tooltips with HTML content. Tooltips are designed only for text and presentational elements. Avoid placing interactive content, such as buttons, links, and form controls, in a tooltip.

```html

```

---

## Setting A Maximum Width

Use the --max-width custom property to change the width the tooltip can grow to before wrapping occurs.

```html

```

---

## Hoisting

Tooltips will be clipped if they’re inside a container that has overflow: auto|hidden|scroll. The hoist attribute forces the tooltip to use a fixed positioning strategy, allowing it to break out of the container. In this case, the tooltip will be positioned relative to its containing block, which is usually the viewport unless an ancestor uses a transform, perspective, or filter.

```html

```
