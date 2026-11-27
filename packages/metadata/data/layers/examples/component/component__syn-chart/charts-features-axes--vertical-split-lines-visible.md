## Vertical Split Lines Visible

To show only vertical split lines, use the handle method axesShowXSplitLines().

```html
<syn-chart id="chart-vertical-lines-visible"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-vertical-lines-visible");

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
      handle.baseConfig(baseConfig).axesShowXSplitLines();
  });
</script>
```
