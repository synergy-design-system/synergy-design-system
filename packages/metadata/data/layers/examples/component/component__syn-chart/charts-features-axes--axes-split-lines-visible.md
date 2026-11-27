## Axes Split Lines Visible

If you want to display both axes lines and split lines, use the handle method axesShowSplitLines().

```html
<syn-chart id="chart-lines-visible"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-lines-visible");

  const baseConfig = {
    series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      name: "Values",
      type: "value",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).axesShowSplitLines();
  });
</script>
```
