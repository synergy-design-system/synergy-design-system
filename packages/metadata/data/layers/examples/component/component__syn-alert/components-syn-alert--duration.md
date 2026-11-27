## Duration

Set the duration attribute to automatically hide an alert after a period of time. This is useful for alerts that don’t require acknowledgement.

```html
<div class="alert-duration">
  <syn-button variant="outline">Show Alert</syn-button>

  <syn-alert variant="primary" duration="3000" closable="">
    <syn-icon slot="icon" name="info"></syn-icon>
    This alert will automatically hide itself after three seconds, unless you
    interact with it.
  </syn-alert>
</div>

<script type="module">
  const container = document.querySelector(".alert-duration");
  const button = container.querySelector("syn-button");
  const alert = container.querySelector("syn-alert");

  button.addEventListener("click", () => alert.show());
</script>

<style>
  .alert-duration syn-alert {
    margin-top: var(--syn-spacing-small);
  }
</style>
```
