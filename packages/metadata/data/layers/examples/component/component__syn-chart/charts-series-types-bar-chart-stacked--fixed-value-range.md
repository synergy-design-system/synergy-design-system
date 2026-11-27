## Fixed Value Range

Use min and max on the value axis to set explicit scale boundaries. Fixed ranges help standardize comparisons across charts, anchor benchmarks such as 0–100%, provide headroom for labels and tooltips, and prevent scale shifts when data changes. For stacked bar charts, account for the combined totals of the stacked series in each category so the full stacks fit within the scale.

```html
<syn-chart id="bar-stacked-value-range"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-stacked-value-range");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      name: "Values",
      max: 600,
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBarStacked([
        {
          data: [120, 180, 150, 80, 70, 110, 130],
        },
        {
          data: [80, 130, 100, 70, 90, 160, 140],
        },
        {
          data: [90, 120, 140, 100, 110, 70, 60],
        },
      ]);
  });
</script>
```
