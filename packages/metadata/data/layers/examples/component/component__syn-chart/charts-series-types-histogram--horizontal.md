## Horizontal

A horizontal histogram displays value intervals along the y-axis and their frequencies along the x-axis. This orientation can improve readability when interval labels are long or when vertical space is more limited.

```html
<syn-chart id="histogram-horizontal"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-horizontal");

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
        .seriesHistogram([{ data: [2, 8, 17, 14, 6, 3] }]);
  });
</script>
```
