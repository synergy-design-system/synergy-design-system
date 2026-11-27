## Positive And Negative

A histogram can be used to visualize the distribution of positive and negative changes around a reference value. Negative bars represent decreases or values below the reference, while positive bars indicate increases or values above it.

```html
<syn-chart id="histogram-positive-and-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-positive-and-negative");

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
        .seriesHistogram([{ data: [-6, -2, 8, 14, 6, 3] }]);
  });
</script>
```
