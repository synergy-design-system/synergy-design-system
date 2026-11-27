## Custom Range Width

Set barWidth to control the thickness of the bullet range. A number specifies a fixed width in pixels, while a percentage string sets the width relative to the category band and adapts to the chart size. By default, ranges are responsive but capped at 24 px by the theme's barMaxWidth setting. To use ranges wider than 24 px, increase barMaxWidth on the series or explicitly set barMaxWidth: undefined in the initial series configuration to remove the maximum. Explicit barWidth ignores barCategoryGap and remains subject to barMinWidth.

```html
<syn-chart id="bullet-fixed-width"></syn-chart>
<syn-chart id="bullet-relative-width"></syn-chart>
<script type="module">
  const fixedWidthCharts = document.querySelectorAll("#bullet-fixed-width");
  const relativeWidthCharts = document.querySelectorAll(
    "#bullet-relative-width",
  );
  const baseConfig = {
    xAxis: {
      data: ["Pressure", "Flow", "Temperature", "Speed"],
      type: "category",
    },
    yAxis: { type: "value" },
  };
  const data = [
    { start: 10, end: 80, current: 65 },
    { start: -10, end: 60, current: 48 },
    { start: 20, end: 100, current: 42 },
    { start: -15, end: 45, current: -6 },
  ];

  fixedWidthCharts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesBullet({ barWidth: 40, barMaxWidth: 40, data });
  });
  relativeWidthCharts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesBullet({ barWidth: "30%", barMaxWidth: undefined, data });
  });
</script>
```
