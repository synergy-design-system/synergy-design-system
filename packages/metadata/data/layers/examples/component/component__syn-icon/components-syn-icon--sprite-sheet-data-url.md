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
