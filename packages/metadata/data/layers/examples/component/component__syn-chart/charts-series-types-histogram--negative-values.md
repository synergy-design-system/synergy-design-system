## Negative Values

A histogram can show negative values such as losses, deficits or decreases. Bars extend below the zero baseline to represent the frequency of values within negative ranges.

```html
<syn-chart id="histogram-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-negative");

  const baseConfig = {
    yAxis: {
      name: "Value Range",
      type: "category",
      data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
    },
    xAxis: {
      name: "Frequency",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesHistogram([{ data: [-2, -8, -17, -14, -6, -3] }]);
  });
</script>
```
