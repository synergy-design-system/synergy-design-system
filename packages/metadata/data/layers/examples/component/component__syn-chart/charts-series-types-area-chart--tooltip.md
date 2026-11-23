## Tooltip

Enable contextual data point details with the tooltipShow() preset. The tooltip displays labels and values as users interact with the chart.

```html
<syn-chart id="area-series-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-tooltip");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "category",
            name: "Days",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesArea([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name: "Series A",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Series B",
          },
        ])
        .tooltipShow();
  });
</script>
```
