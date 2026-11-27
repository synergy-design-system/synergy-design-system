## Custom Colors

Bar series use the chart's categorical palette by default. Use the color option to apply explicit colors to individual series.

```html
<syn-chart id="histogram-custom-color"></syn-chart>
<script type="module">
  const getChartColor = (token) => ChartTokens[token]["light"];
  const charts = document.querySelectorAll("#histogram-custom-color");
  const baseConfig = {
    xAxis: {
      name: "Value Range",
      type: "category",
      data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    },
    yAxis: {
      name: "Frequency",
    },
    color: [getChartColor("SynChartSequential02_70")],
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }]);
  });
</script>
```
