## Non Interactive Legend

By default, the legend is interactive. Users can click on a legend item to toggle the visibility of the corresponding series in the chart. To make the legend non-interactive, use the selectedMode: false option.

```html
<syn-chart id="chart-non-interactive-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-non-interactive-legend");

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
      handle
        .baseConfig(baseConfig)
        .legendShow({ position: "top", legend: { selectedMode: false } });
  });
</script>
```
