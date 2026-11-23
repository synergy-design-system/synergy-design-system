## Custom Bar Width

Set barWidth to control bar thickness. A number specifies a fixed width in pixels, while a percentage string sets the width relative to the available category space and adapts to the chart size. By default, bars are responsive but capped at 24 px by the theme's barMaxWidth setting. To use bars wider than 24 px, also increase barMaxWidth on the series.

```html
<syn-chart id="bar-stacked-fixed-width"></syn-chart>
<syn-chart id="bar-stacked-relative-width"></syn-chart>
<script type="module">
  const fixedWidthCharts = document.querySelectorAll(
    "#bar-stacked-fixed-width",
  );
  const relativeWidthCharts = document.querySelectorAll(
    "#bar-stacked-relative-width",
  );
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

  fixedWidthCharts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBarStacked([
        {
          barWidth: 30,
          barMaxWidth: 30,
          data: [120, 180, 150, 80, 70, 110, 130],
        },
        {
          barWidth: 30,
          barMaxWidth: 30,
          data: [80, 130, 100, 70, 90, 160, 140],
        },
        {
          barWidth: 30,
          barMaxWidth: 30,
          data: [90, 120, 140, 100, 110, 70, 60],
        },
      ]);
  });

  relativeWidthCharts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBarStacked([
        {
          barWidth: "30%",
          data: [120, 180, 150, 80, 70, 110, 130],
        },
        {
          barWidth: "30%",
          data: [80, 130, 100, 70, 90, 160, 140],
        },
        {
          barWidth: "30%",
          data: [90, 120, 140, 100, 110, 70, 60],
        },
      ]);
  });
</script>
```
