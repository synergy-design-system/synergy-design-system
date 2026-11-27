## Negative Values

Bar charts can show negative values such as deficits, losses, or decreases. Bars extend away from the zero baseline. In stacked bar charts, negative values stack together below the zero baseline, separately from positive values.

```html
<syn-chart id="bar-stacked-negative"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-stacked-negative");

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
      handle.baseConfig(baseConfig).seriesBarStacked(
        [
          {
            data: [-120, -180, -150, -80, -70, -110, -130],
          },
          {
            data: [-80, -130, -100, -70, -90, -160, -140],
          },
          {
            data: [-90, -120, -140, -100, -110, -70, -80],
          },
        ],
        { orientation: "horizontal" },
      );
  });
</script>
```
