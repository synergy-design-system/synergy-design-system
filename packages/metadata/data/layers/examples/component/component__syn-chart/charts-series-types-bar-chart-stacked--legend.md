## Legend

Use legendShow() to display a legend for named series. Series names become the legend labels, and users can toggle series visibility interactively.

```html
<syn-chart id="bar-series-stacked-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-stacked-legend");

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
            name: "Series A",
          },
          {
            data: [80, 130, 100, 70, 90, 160, 140],
            name: "Series B",
          },
          {
            data: [90, 120, 140, 100, 110, 70, 60],
            name: "Series C",
          },
        ])
        .legendShow();
  });
</script>
```
