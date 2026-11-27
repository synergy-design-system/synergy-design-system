## Prefix And Suffix Slot

Use the prefix and suffix slots to add e. g. icons or tags. If available the prefix slot will be shown in the rail navigation.

```html
<style>
  .doc-number-helper {
    align-items: center;
    border: 1px solid var(--syn-color-neutral-400);
    border-radius: var(--syn-border-radius-circle);
    box-sizing: border-box;
    color: var(--syn-color-neutral-950);
    display: inline-flex;
    font-size: var(--syn-font-size-x-small);
    height: var(--syn-font-size-x-large);
    width: var(--syn-font-size-x-large);
    justify-content: center;
  }
</style>
<syn-nav-item>
  <syn-icon name="wallpaper" slot="prefix"></syn-icon>
  Item with icon slots
  <syn-icon name="wallpaper" slot="suffix"></syn-icon>
</syn-nav-item>
<br />
<syn-nav-item>
  <span class="doc-number-helper" slot="prefix">1</span>
  Step-like item with a number
</syn-nav-item>
```
