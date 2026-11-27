## Custom Bar Width

Set barWidth to control bar thickness. A number specifies a fixed width in pixels, while a percentage string sets the width relative to the available category space and adapts to the chart size. By default, bars are responsive but capped at 24 px by the theme's barMaxWidth setting. To use bars wider than 24 px, also increase barMaxWidth on the series.

```html
<syn-chart id="bar-series-grouped-bar-width"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-grouped-bar-width");

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
      handle.baseConfig(baseConfig).seriesBar([
        {
          barWidth: 40,
          barMaxWidth: 40,
          data: [120, 180, 150, 80, 70, 110, 130],
        },
        {
          barWidth: "30%",
          data: [80, 130, 100, 70, 90, 160, 140],
        },
        {
          barWidth: "10%",
          data: [90, 120, 140, 100, 110, 70, 60],
        },
      ]);
  });
</script>
```
