## Average

Use type: 'average' in markLine.data to show the average value of a series as a reference line.

```html
<syn-chart id="mark-line-average"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-average");

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
          grid: { left: 80 },
        })
        .seriesLine([
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            markLine: {
              data: [{ type: "average", name: "Average" }],
            },
          },
        ]);
  });
</script>
```
