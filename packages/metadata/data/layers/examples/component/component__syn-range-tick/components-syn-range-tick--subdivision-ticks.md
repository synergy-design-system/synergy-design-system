## Subdivision Ticks

It is possible to divide the space between major ticks for finer scale readings.

```html
<div class="grouping">
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
</div>
<style>
  .grouping {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```
