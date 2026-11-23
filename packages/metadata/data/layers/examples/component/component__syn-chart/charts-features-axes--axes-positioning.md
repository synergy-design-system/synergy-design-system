## Axes Positioning

The default position of the y-axis is left and for the x-axis is bottom. The axes can be positioned at the top, bottom, left or right of the chart by using the position option.

```html
<div
  style="
    display: flex;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-large);
  "
>
  <syn-select value="bottom" label="x-axis position" id="x-axis-position">
    <syn-option value="top">Top</syn-option>
    <syn-option value="bottom">Bottom</syn-option>
  </syn-select>
  <syn-select value="left" label="y-axis position" id="y-axis-position">
    <syn-option value="left">Left</syn-option>
    <syn-option value="right">Right</syn-option>
  </syn-select>
</div>
<syn-chart id="chart-axis-position"></syn-chart>
<script type="module">
  const setConfig = (xAxisSelect, yAxisSelect) => {
    const baseConfig = {
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        name: "Days",
        type: "category",
        position: xAxisSelect ? xAxisSelect.value : undefined,
      },
      yAxis: {
        name: "Values",
        type: "value",
        position: yAxisSelect ? yAxisSelect.value : undefined,
      },
    };

    const charts = document.querySelectorAll("#chart-axis-position");
    charts.forEach((chart) => {
      chart.config = (handle) =>
        handle.baseConfig(baseConfig).axesShowSplitLines();
    });
  };

  const xAxisPositionSelects = document.querySelectorAll("#x-axis-position");
  const yAxisPositionSelects = document.querySelectorAll("#y-axis-position");
  const positionSelects = Array.from(xAxisPositionSelects).map(
    (select, index) => ({
      xAxisSelect: select,
      yAxisSelect: yAxisPositionSelects[index],
    }),
  );

  positionSelects.forEach(({ xAxisSelect, yAxisSelect }) => {
    xAxisSelect.addEventListener("syn-change", () => {
      setConfig(xAxisSelect, yAxisSelect);
    });
    yAxisSelect.addEventListener("syn-change", () => {
      setConfig(xAxisSelect, yAxisSelect);
    });

    setConfig(xAxisSelect, yAxisSelect);
  });
</script>
```
