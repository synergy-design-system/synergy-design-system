## Positive And Negative Values

Area charts can display both positive and negative values, filling each data point relative to the configured area origin.

```html
<syn-chart id="area-series-positive-and-negative-values"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll(
    "#area-series-positive-and-negative-values",
  );

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
            data: [-820, 932, -901, 934, -1290, 1330, 1320],
          },
        ]);
  });
</script>
```
