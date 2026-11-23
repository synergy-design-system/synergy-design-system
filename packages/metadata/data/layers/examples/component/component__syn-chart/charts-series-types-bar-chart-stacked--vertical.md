## Vertical

Place categories on the x-axis and values on the y-axis, where bar height represents value magnitude. Vertical bar charts work well for chronological trends and smaller category sets, and make differences in magnitude easy to compare.

```html
<syn-chart id="bar-stacked-vertical"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-stacked-vertical");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesBarStacked([
          {
            data: [120, 180, 150, 80, 70, 110, 130],
          },
          {
            data: [80, 130, 100, 70, 90, 160, 140],
          },
          {
            data: [90, 120, 140, 100, 110, 70, 60],
          },
        ])
        .axesShowYSplitLines();
  });
</script>
```
