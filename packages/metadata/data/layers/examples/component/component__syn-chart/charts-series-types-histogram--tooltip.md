## Tooltip

Enable a tooltip to inspect bar values on hover. For bar series it is recommended to set tooltip.axisPointer.type to 'shadow' to highlight the corresponding category and compare its values across series.

```html
<syn-chart id="histogram-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-tooltip");

  const baseConfig = {
    xAxis: {
      name: "Value Range",
      type: "category",
      data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    },
    yAxis: {
      name: "Frequency",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }])
        .tooltipShow({ axisPointer: { type: "shadow" } });
  });
</script>
```
