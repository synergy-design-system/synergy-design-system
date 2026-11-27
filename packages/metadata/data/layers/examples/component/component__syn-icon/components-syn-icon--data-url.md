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
