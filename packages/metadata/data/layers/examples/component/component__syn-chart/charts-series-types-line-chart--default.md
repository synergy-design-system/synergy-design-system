## Default

The line chart can be configured with the seriesLine preset function.

```html
<syn-chart id="line-series-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-default");

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
      handle.baseConfig(baseConfig).seriesLine([
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
