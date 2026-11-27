## Positive And Negative Values

Line charts can display both positive and negative values.

```html
<syn-chart id="line-series-positive-and-negative-values"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll(
    "#line-series-positive-and-negative-values",
  );

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
        .axesShowSplitLines()
        .seriesLine([
          {
            data: [-820, 932, -901, 934, -1290, 1330, 1320],
          },
          {
            data: [620, -32, -701, 734, 1090, -1130, 1120],
          },
        ]);
  });
</script>
```
