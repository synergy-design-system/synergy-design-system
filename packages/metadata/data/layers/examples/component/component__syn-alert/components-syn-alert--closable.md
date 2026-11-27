## Closable

Add the closable attribute to show a close button that will hide the alert.

```html
<syn-alert variant="primary" open="" closable="" class="alert-closable">
  <syn-icon slot="icon" name="info"></syn-icon>
  You can close this alert any time!
</syn-alert>

<script type="module">
  const alert = document.querySelector(".alert-closable");
  alert.addEventListener("syn-after-hide", () => {
    setTimeout(() => (alert.open = true), 2000);
  });
</script>
```
