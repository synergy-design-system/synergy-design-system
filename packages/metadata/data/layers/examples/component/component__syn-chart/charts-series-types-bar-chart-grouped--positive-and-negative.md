## Positive And Negative

Bar charts can combine positive and negative values to show gains and losses or deviations from a baseline. Bars extend in opposite directions from zero.

```html
<syn-chart id="bar-series-grouped-positive-and-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll(
    "#bar-series-grouped-positive-and-negative",
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

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: [100, -120, 150, -80, 70, -110, 130],
        },
        {
          data: [60, -40, -20, -60, 30, -80, -50],
        },
        {
          data: [120, -70, 50, -90, 80, -40, 140],
        },
      ]);
  });
</script>
```
