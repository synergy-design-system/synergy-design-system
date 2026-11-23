## Axes Lines Visible With Labels Hidden

To show axes split lines but hide axis labels, combine axesShowSplitLines() and axesHideLabels().

```html
<syn-chart id="chart-lines-visible-values-hidden"></syn-chart>
<script type="module">
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

  const charts = document.querySelectorAll(
    "#chart-lines-visible-values-hidden",
  );
  charts.forEach((chart) => {
    chart.config = (handle) => handle.baseConfig(baseConfig).axesHideLabels();
  });
</script>
```
