## Default

This shows the syn-icon in its default state

```html
<syn-icon name="wallpaper" aria-hidden="true" library="default"></syn-icon>
```

---

## Colors

Icons inherit their color from the current text color.
Thus, you can set the color property on the <syn-icon> element or an ancestor to change color.

```html
<div style="color: var(--syn-color-primary-600)">
  <syn-icon name="warning" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="inventory" aria-hidden="true" library="default"></syn-icon>
  <syn-icon
    name="battery_charging_full"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="notifications"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</div>
<div style="color: var(--syn-color-neutral-800)">
  <syn-icon name="schedule" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="cloud" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="download" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="description" aria-hidden="true" library="default"></syn-icon>
</div>
<div style="color: var(--syn-color-error-700)">
  <syn-icon name="mic" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="search" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="star_border" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="delete" aria-hidden="true" library="default"></syn-icon>
</div>
```

---

## Sizing

Icons are sized relative to the current font size.
To change their size, set the font-size property on the icon itself
or on a parent element as shown below.

```html
<div style="font-size: var(--syn-font-size-2x-large)">
  <syn-icon name="warning" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="inventory" aria-hidden="true" library="default"></syn-icon>
  <syn-icon
    name="battery_charging_full"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon
    name="notifications"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  <syn-icon name="schedule" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="cloud" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="download" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="description" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="flag" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="favorite" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="image" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="bolt" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="mic" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="search" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="star_border" aria-hidden="true" library="default"></syn-icon>
  <syn-icon name="delete" aria-hidden="true" library="default"></syn-icon>
</div>
```

---

## Labels

For non-decorative icons, use the label attribute to announce it to assistive devices.

```html
<syn-icon
  name="star"
  label="Add to favorites"
  role="img"
  aria-label="Add to favorites"
  library="default"
></syn-icon>
```

---

## Custom Icons

Custom icons can be loaded individually with the src attribute.
Only SVGs on a local or CORS-enabled endpoint are supported.
If you're using more than one custom icon, it might make sense to register a custom icon library.

```html
<syn-icon
  src="/logo-claim.svg"
  style="font-size: 10rem"
  aria-hidden="true"
  library="default"
></syn-icon>
```

---

## CDN Icon Library

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="fa" name="far-bell" aria-hidden="true"></syn-icon>
  <syn-icon library="fa" name="far-comment" aria-hidden="true"></syn-icon>
  <syn-icon
    library="fa"
    name="far-hand-point-right"
    aria-hidden="true"
  ></syn-icon>
  <br />
  <syn-icon library="fa" name="fas-archive" aria-hidden="true"></syn-icon>
  <syn-icon library="fa" name="fas-book" aria-hidden="true"></syn-icon>
  <syn-icon library="fa" name="fas-chess-knight" aria-hidden="true"></syn-icon>
  <br />
  <syn-icon library="fa" name="fab-apple" aria-hidden="true"></syn-icon>
  <syn-icon library="fa" name="fab-chrome" aria-hidden="true"></syn-icon>
  <syn-icon library="fa" name="fab-edge" aria-hidden="true"></syn-icon>
</div>
```

---

## Bundled Icon Library

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon
    library="bundled-default"
    name="warning"
    aria-hidden="true"
  ></syn-icon>
  <syn-icon
    library="bundled-default"
    name="inventory"
    aria-hidden="true"
  ></syn-icon>
  <syn-icon
    library="bundled-default"
    name="battery_charging_full"
    aria-hidden="true"
  ></syn-icon>
  <syn-icon
    library="bundled-default"
    name="notifications"
    aria-hidden="true"
  ></syn-icon>
</div>
```

---

## Sprite Sheet Usage

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="sprite" name="settings" aria-hidden="true"></syn-icon>
  <syn-icon library="sprite" name="refresh" aria-hidden="true"></syn-icon>
</div>
```
