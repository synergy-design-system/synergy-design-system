## Axes Labels Hidden

If you want to hide the axis labels, use the handle method axesHideLabels().

```html
<syn-chart id="chart-lines-hidden-values-hidden"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-lines-hidden-values-hidden");

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
    chart.config = (handle) => handle.baseConfig(baseConfig).axesHideLabels();
  });
</script>
```
