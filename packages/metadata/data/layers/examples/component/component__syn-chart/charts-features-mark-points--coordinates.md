## Coordinates

Set coord: [category, value] on each marker to highlight specific data coordinates. Use name for descriptive context and value for the value exposed to label formatters. Coordinates may also use numeric values on value axes.

```html
<syn-chart id="mark-point-coordinates"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-point-coordinates");

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
        .seriesLine([
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            markPoint: {
              data: [
                { coord: ["Tue", 230], value: 230 },
                { coord: ["Fri", 135], value: 135 },
              ],
            },
          },
        ]);
  });
</script>
```
