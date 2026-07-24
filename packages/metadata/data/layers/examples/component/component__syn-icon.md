## Default

This shows the syn-icon in its default state

```html
<syn-icon name="wallpaper"></syn-icon>
```

---

## Colors

Icons inherit their color from the current text color.
Thus, you can set the color property on the <syn-icon> element or an ancestor to change color.

```html
<div style="color: var(--syn-color-primary-600)">
  <syn-icon name="warning"></syn-icon>
  <syn-icon name="inventory"></syn-icon>
  <syn-icon name="battery_charging_full"></syn-icon>
  <syn-icon name="notifications"></syn-icon>
</div>
<div style="color: var(--syn-color-neutral-800)">
  <syn-icon name="schedule"></syn-icon>
  <syn-icon name="cloud"></syn-icon>
  <syn-icon name="download"></syn-icon>
  <syn-icon name="description"></syn-icon>
</div>
<div style="color: var(--syn-color-error-700)">
  <syn-icon name="mic"></syn-icon>
  <syn-icon name="search"></syn-icon>
  <syn-icon name="star_border"></syn-icon>
  <syn-icon name="delete"></syn-icon>
</div>
```

---

## Sizing

Icons are sized relative to the current font size.
To change their size, set the font-size property on the icon itself
or on a parent element as shown below.

```html
<div style="font-size: var(--syn-font-size-2x-large)">
  <syn-icon name="warning"></syn-icon>
  <syn-icon name="inventory"></syn-icon>
  <syn-icon name="battery_charging_full"></syn-icon>
  <syn-icon name="notifications"></syn-icon>
  <syn-icon name="schedule"></syn-icon>
  <syn-icon name="cloud"></syn-icon>
  <syn-icon name="download"></syn-icon>
  <syn-icon name="description"></syn-icon>
  <syn-icon name="flag"></syn-icon>
  <syn-icon name="favorite"></syn-icon>
  <syn-icon name="image"></syn-icon>
  <syn-icon name="bolt"></syn-icon>
  <syn-icon name="mic"></syn-icon>
  <syn-icon name="search"></syn-icon>
  <syn-icon name="star_border"></syn-icon>
  <syn-icon name="delete"></syn-icon>
</div>
```

---

## Labels

For non-decorative icons, use the label attribute to announce it to assistive devices.

```html
<syn-icon name="star" label="Add to favorites"></syn-icon>
```

---

## Custom Icons

Custom icons can be loaded individually with the src attribute.
Only SVGs on a local or CORS-enabled endpoint are supported.
If you're using more than one custom icon, it might make sense to register a custom icon library.

```html
<syn-icon src="/logo-claim.svg" style="font-size: 10rem"></syn-icon>
```

---

## CDN Icon Library

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="fa" name="far-bell"></syn-icon>
  <syn-icon library="fa" name="far-comment"></syn-icon>
  <syn-icon library="fa" name="far-hand-point-right"></syn-icon>
  <br />
  <syn-icon library="fa" name="fas-archive"></syn-icon>
  <syn-icon library="fa" name="fas-book"></syn-icon>
  <syn-icon library="fa" name="fas-chess-knight"></syn-icon>
  <br />
  <syn-icon library="fa" name="fab-apple"></syn-icon>
  <syn-icon library="fa" name="fab-chrome"></syn-icon>
  <syn-icon library="fa" name="fab-edge"></syn-icon>
</div>
```

---

## Bundled Icon Library

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="bundled-default" name="warning"></syn-icon>
  <syn-icon library="bundled-default" name="inventory"></syn-icon>
  <syn-icon library="bundled-default" name="battery_charging_full"></syn-icon>
  <syn-icon library="bundled-default" name="notifications"></syn-icon>
</div>
```

---

## Sprite Sheet Usage

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="sprite" name="settings"></syn-icon>
  <syn-icon library="sprite" name="refresh"></syn-icon>
</div>
```
