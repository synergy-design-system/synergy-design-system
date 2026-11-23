## Fixed Value Range

Use min and max on the value axis to set explicit scale boundaries. This ensures the axis scale remains consistent across datasets, making it easier to compare multiple charts and monitor changes over time.

```html
<syn-chart id="histogram-value-range"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-value-range");

  const baseConfig = {
    xAxis: {
      name: "Value Range",
      type: "category",
      data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    },
    yAxis: {
      min: 0,
      max: 25,
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
