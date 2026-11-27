## Positive And Negative Values

Area ranges can cross zero and include both positive and negative values. The chart displays the full lower-to-upper interval for each category.

```html
<syn-chart id="area-range-series-positive-and-negative-values"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll(
    "#area-range-series-positive-and-negative-values",
  );

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "category",
            name: "Days",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesAreaRange([
          [-280, -120],
          [-220, -40],
          [-80, 140],
          [50, 260],
          [120, 290],
          [-170, 180],
          [-260, 240],
        ]);
  });
</script>
```
