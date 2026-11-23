## Vertical

A vertical histogram displays value intervals along the x-axis and their frequencies along the y-axis. This orientation is commonly used when there is sufficient horizontal space and makes it easy to compare the distribution across value ranges.

```html
<syn-chart id="histogram-vertical"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-vertical");

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

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }]);
  });
</script>
```
