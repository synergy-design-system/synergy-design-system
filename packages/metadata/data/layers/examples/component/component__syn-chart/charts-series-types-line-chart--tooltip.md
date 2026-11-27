## Tooltip

The tooltip provides contextual information when users hover or focus on data points within a chart. It displays values, labels without obstructing the view of the visualization. Use the tooltipShow preset to enable the tooltip.

```html
<syn-chart id="line-series-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-tooltip");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .tooltipShow()
        .seriesLine([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
        ]);
  });
</script>
```
