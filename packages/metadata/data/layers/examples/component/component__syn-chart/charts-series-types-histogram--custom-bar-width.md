## Custom Bar Width

Set barWidth to control bar thickness. A number specifies a fixed width in pixels, while a percentage string sets the width relative to the available category space and adapts to the chart size. Histograms are typically displayed with little or no gap between bars to emphasize the continuity of the underlying distribution. When barWidth is set, barCategoryGap is ignored.

```html
<syn-chart id="histogram-fixed-width"></syn-chart>
<syn-chart id="histogram-relative-width"></syn-chart>
<script type="module">
  const fixedWidthCharts = document.querySelectorAll("#histogram-fixed-width");
  const relativeWidthCharts = document.querySelectorAll(
    "#histogram-relative-width",
  );
  const baseConfig = {
    xAxis: {
      name: "Value Range",
      type: "category",
      data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    },
    yAxis: {
      name: "Frequency",
    },
  };

  fixedWidthCharts.forEach((fixed) => {
    fixed.config = (handle) =>
      handle.baseConfig(baseConfig).seriesHistogram([
        {
          data: [2, 8, 17, 14, 6, 3],
          barWidth: 16,
        },
      ]);
  });

  relativeWidthCharts.forEach((relative) => {
    relative.config = (handle) =>
      handle.baseConfig(baseConfig).seriesHistogram([
        {
          data: [2, 8, 17, 14, 6, 3],
          barWidth: "30%",
        },
      ]);
  });
</script>
```
