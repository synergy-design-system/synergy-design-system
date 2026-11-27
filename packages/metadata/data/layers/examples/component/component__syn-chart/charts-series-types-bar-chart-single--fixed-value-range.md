## Fixed Value Range

Use min and max on the value axis to set explicit scale boundaries. Fixed ranges help standardize comparisons across charts, anchor benchmarks such as 0–100%, provide headroom for labels and tooltips, and prevent scale shifts when data changes.

```html
<syn-chart id="bar-series-single-value-range"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-single-value-range");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      min: 60,
      max: 200,
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: [120, 180, 150, 80, 70, 110, 130],
        },
      ]);
  });
</script>
```
