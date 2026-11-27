## Label

A description that gets read by assistive devices. For optimal accessibility, you have to include a label that describes what the icon button does.

```html
<div class="grid">
  <span>Unset label property: </span>
  <syn-icon-button
    name="wallpaper"
    color="neutral"
    size="medium"
  ></syn-icon-button>
  <span>Set label property: </span>
  <syn-icon-button
    name="wallpaper"
    label="Wallpaper"
    color="neutral"
    size="medium"
  ></syn-icon-button>
</div>
<style>
  .grid {
    font-size: var(--syn-font-size-x-small);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
</style>
```
