## Custom Bar Width

Set barWidth to control bar thickness. A number specifies a fixed width in pixels, while a percentage string sets the width relative to the available category space and adapts to the chart size. By default, bars are responsive but capped at 24 px by the theme's barMaxWidth setting. To use bars wider than 24 px, also increase barMaxWidth on the series.

```html
<syn-chart id="bar-series-single-fixed-width"></syn-chart>
<syn-chart id="bar-series-single-relative-width"></syn-chart>
<script type="module">
  const fixedWidthCharts = document.querySelectorAll(
    "#bar-series-single-fixed-width",
  );
  const relativeWidthCharts = document.querySelectorAll(
    "#bar-series-single-relative-width",
  );
  const baseConfig = {
    xAxis: {
      data: ["A", "B", "C"],
      name: "Category",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
  };

  fixedWidthCharts.forEach((fixed) => {
    fixed.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          barWidth: 40,
          barMaxWidth: 40,
          data: [120, 180, 150],
        },
      ]);
  });

  relativeWidthCharts.forEach((relative) => {
    relative.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          barWidth: "30%",
          data: [120, 180, 150],
        },
      ]);
  });
</script>
```
