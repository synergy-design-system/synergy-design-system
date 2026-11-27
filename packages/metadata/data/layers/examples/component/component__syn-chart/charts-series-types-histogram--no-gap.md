## No Gap

Set barCategoryGap to 0 to remove the gap between histogram bars, emphasizing the continuity of the distribution.

```html
<syn-chart id="histogram-no-gap"></syn-chart>
<script type="module">
  const noGapCharts = document.querySelectorAll("#histogram-no-gap");
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

  noGapCharts.forEach((noGap) => {
    noGap.config = (handle) =>
      handle.baseConfig(baseConfig).seriesHistogram([
        {
          data: [2, 8, 17, 14, 6, 3],
          barCategoryGap: 0,
        },
      ]);
  });
</script>
```
