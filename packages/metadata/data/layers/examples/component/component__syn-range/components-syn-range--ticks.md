## Ticks

Use the ticks slot to insert ticks or groups with ticks to improve positioning.

```html
<div class="wrapper">
  <syn-range
    class="syn-range-with-tick"
    max="100"
    min="0"
    value="50"
    label="Volume"
  >
    <nav slot="ticks">
      <syn-range-tick>0</syn-range-tick>
      <syn-range-tick>50</syn-range-tick>
      <syn-range-tick>100</syn-range-tick>
    </nav>
  </syn-range>

  <p>
    It is possible to divide the space between major ticks for finer scale
    readings.
  </p>

  <syn-range
    class="syn-range-with-tick"
    max="100"
    min="0"
    value="50"
    label="Volume"
  >
    <nav slot="ticks">
      <syn-range-tick>0</syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick>50</syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick subdivision=""></syn-range-tick>
      <syn-range-tick>100</syn-range-tick>
    </nav>
  </syn-range>
</div>
<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-large);
  }

  .syn-range-with-tick nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```
