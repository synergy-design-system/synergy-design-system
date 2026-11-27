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

## Data Url

```html
<div id="data-urls" style="display: flex; gap: var(--syn-spacing-medium)">
  <img width="24" height="24" alt="Warning" />
  <img width="24" height="24" alt="Inventory" />
</div>
<script type="module">
  // To get an svg data url for an icon, use "getIconDataURL" from the components package
  // import { getIconDataURL }  from '@synergy-design-system/components/utilities/icon-library.js'.
  const icons = await Promise.all([
    getIconDataURL("warning"),
    getIconDataURL("inventory"),
  ]);
  document.querySelectorAll("#data-urls img").forEach((image, index) => {
    image.src = icons[index];
  });
</script>
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

## Bundled Icon Data URL

```html
<div style="display: flex; gap: var(--syn-spacing-medium)">
  <img id="data-url-bundled-warning" width="24" height="24" alt="Warning" />
  <img id="data-url-bundled-inventory" width="24" height="24" alt="Inventory" />
</div>
<script type="module">
  // To get an svg data url for an icon, use "getIconDataURL" from the components package
  // import { getIconDataURL }  from '@synergy-design-system/components/utilities/icon-library.js'.
  const warningIcon = await getIconDataURL("warning", "bundled-default");
  const inventoryIcon = await getIconDataURL("inventory", "bundled-default");
  document.querySelector("#data-url-bundled-warning").src = warningIcon;
  document.querySelector("#data-url-bundled-inventory").src = inventoryIcon;
</script>
```

---

## Sprite Sheet Usage

```html
<div style="font-size: var(--syn-font-size-x-large)">
  <syn-icon library="sprite" name="settings"></syn-icon>
  <syn-icon library="sprite" name="refresh"></syn-icon>
</div>
```

---

## Sprite Sheet Data URL

```html
<div style="display: flex; gap: var(--syn-spacing-medium)">
  <img id="data-url-sprite-settings" width="24" height="24" alt="Settings" />
  <img id="data-url-sprite-refresh" width="24" height="24" alt="Refresh" />
</div>
<script type="module">
  // import { getIconDataURL } from '@synergy-design-system/components/utilities/icon-library.js';
  const icons = await Promise.all([
    getIconDataURL("settings", "sprite"),
    getIconDataURL("refresh", "sprite"),
  ]);
  document.querySelector("#data-url-sprite-settings").src = icons[0];
  document.querySelector("#data-url-sprite-refresh").src = icons[1];
</script>
```
