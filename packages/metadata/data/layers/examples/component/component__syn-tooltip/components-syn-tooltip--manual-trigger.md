## Manual Trigger

Tooltips can be controlled programmatically by setting the trigger attribute to manual. Use the open attribute to control when the tooltip is shown.

```html
<syn-button style="margin-right: 4rem">Toggle Manually</syn-button>
<syn-tooltip
  content="This is an avatar"
  trigger="manual"
  class="manual-tooltip"
  open=""
>
  <syn-icon-button
    name="person"
    label="Person"
    size="medium"
    color="neutral"
  ></syn-icon-button>
</syn-tooltip>

<script type="module">
  const tooltip = document.querySelector(".manual-tooltip");
  const toggle = tooltip.previousElementSibling;

  toggle.addEventListener("click", () => (tooltip.open = !tooltip.open));
</script>
```
