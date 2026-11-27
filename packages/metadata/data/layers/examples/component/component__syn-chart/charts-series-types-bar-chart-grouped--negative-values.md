## Negative Values

Bar charts can show negative values such as deficits, losses, or decreases. Bars extend away from the zero baseline.

```html
<syn-chart id="bar-series-grouped-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-grouped-negative");

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
          data: [-120, -180, -150, -80, -70, -110, -130],
        },
        {
          data: [-80, -130, -100, -70, -90, -160, -140],
        },
        {
          data: [-90, -120, -140, -100, -110, -70, -80],
        },
      ]);
  });
</script>
```
