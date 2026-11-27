## Custom Colors

Bar series use the chart's categorical palette by default. Use the color option to apply explicit colors to individual series.

```html
<syn-chart id="bar-series-single-custom-color"></syn-chart>
<script type="module">
  const getChartColor = (token) => ChartTokens[token]["light"];
  const charts = document.querySelectorAll("#bar-series-single-custom-color");
  const baseConfig = {
    xAxis: {
      data: ["A", "B", "C"],
      name: "Category",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
    color: [getChartColor("SynChartSequential02_70")],
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([{ data: [120, 180, 150] }]);
  });
</script>
```
