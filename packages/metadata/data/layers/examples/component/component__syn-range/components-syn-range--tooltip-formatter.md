## Tooltip Formatter

You can change the tooltip’s content by setting the tooltipFormatter property to a function that accepts the range’s value as an argument.

```html
<syn-range class="tooltip-formatter" max="100" min="0" value="50">
  <nav slot="ticks">
    <syn-range-tick>0%</syn-range-tick>
    <syn-range-tick>50%</syn-range-tick>
    <syn-range-tick>100%</syn-range-tick>
  </nav>
</syn-range>
<style>
  .tooltip-formatter nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
<script>
  document.querySelectorAll(".tooltip-formatter").forEach((tip) => {
    tip.tooltipFormatter = (value) => value + "%";
  });
</script>
```
