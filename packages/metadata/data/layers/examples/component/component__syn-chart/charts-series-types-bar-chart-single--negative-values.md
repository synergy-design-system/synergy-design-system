## Negative Values

Bar charts can show negative values such as deficits, losses, or decreases. Bars extend away from the zero baseline.

```html
<syn-chart id="bar-series-single-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-single-negative");

  const baseConfig = {
    yAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    xAxis: {
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: [-120, -175, -150, -80, -70, -110, -130],
        },
      ]);
  });
</script>
```
