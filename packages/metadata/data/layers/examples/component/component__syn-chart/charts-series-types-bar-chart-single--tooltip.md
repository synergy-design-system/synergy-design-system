## Tooltip

Enable a tooltip to inspect bar values on hover. For bar series it is recommended to set tooltip.axisPointer.type to 'shadow' to highlight the corresponding category and compare its values across series.

```html
<syn-chart id="bar-series-single-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-single-tooltip");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesBar([
          {
            data: [120, 180, 150, 80, 70, 110, 130],
          },
        ])
        .tooltipShow({ axisPointer: { type: "shadow" } });
  });
</script>
```
