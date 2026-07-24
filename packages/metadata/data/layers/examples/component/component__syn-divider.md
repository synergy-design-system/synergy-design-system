## Default

Dividers are used to visually separate or group elements.

```html
<syn-divider></syn-divider>
```

---

## Width

Use the --width custom property to change the width of the divider.

```html
<syn-divider style="--width: var(--syn-spacing-x-small)"></syn-divider>
```

---

## Color

Use the --color custom property to change the color of the divider.

```html
<syn-divider style="--color: var(--syn-color-primary-600)"></syn-divider>
```

---

## Spacing

Use the --spacing custom property to change the amount of space between the divider and it’s neighboring elements.

```html
<div style="text-align: center">
  Above
  <syn-divider style="--spacing: var(--syn-spacing-large)"></syn-divider>
  Below
</div>
```

---

## Vertical

Add the vertical attribute to draw the divider in a vertical orientation. The divider will span the full height of its container. Vertical dividers work especially well inside of a flex container.

```html
<div style="display: flex; align-items: center; height: 2rem">
  First
  <syn-divider vertical=""></syn-divider>
  Middle
  <syn-divider vertical=""></syn-divider>
  Last
</div>
```
