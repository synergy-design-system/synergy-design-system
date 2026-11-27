## Grouping

Grouping multiple ticks can be used as a scale. This can be used for uneven distributions as well.

```html
<div class="groupings">
  <div class="even-group">
    <syn-range-tick>0</syn-range-tick>
    <syn-range-tick>50</syn-range-tick>
    <syn-range-tick>100</syn-range-tick>
  </div>

  <div class="uneven-group">
    <syn-range-tick>1</syn-range-tick>
    <syn-range-tick>2</syn-range-tick>
    <syn-range-tick>3</syn-range-tick>
    <syn-range-tick>5</syn-range-tick>
    <syn-range-tick>8</syn-range-tick>
    <syn-range-tick>13</syn-range-tick>
  </div>
</div>
<style>
  .groupings {
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-4x-large);
  }

  .even-group {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }

  .uneven-group {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }

  .uneven-group syn-range-tick {
    flex-grow: 1;
  }

  .uneven-group syn-range-tick:nth-child(3) {
    flex-grow: 2;
  }

  .uneven-group syn-range-tick:nth-child(4) {
    flex-grow: 3;
  }

  .uneven-group syn-range-tick:nth-child(5) {
    flex-grow: 5;
  }

  .uneven-group syn-range-tick:nth-child(6) {
    flex-grow: 0;
  }
</style>
```
