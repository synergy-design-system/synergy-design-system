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
