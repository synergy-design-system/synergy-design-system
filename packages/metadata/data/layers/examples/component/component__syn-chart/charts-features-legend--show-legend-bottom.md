## Show Legend Bottom

The legend can be positioned at the bottom of the chart by using the handle method legendShow({ position: 'bottom' }).

```html
<syn-chart id="chart-show-legend-bottom"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-show-legend-bottom");

  const baseConfig = {
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
        name: "Series A",
      },
      {
        data: [120, 282, 251, 234, 290, 430, 310],
        type: "line",
        name: "Series B",
      },
      {
        data: [320, 332, 301, 334, 390, 330, 320],
        type: "line",
        name: "Series C",
      },
    ],
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).legendShow("bottom");
  });
</script>
```
