## Value Range

Add yAxis values to the two points in markArea.data to highlight a horizontal value range across the chart. The area spans the full category axis between the specified values.

```html
<syn-chart id="mark-area-value-range"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-area-value-range");

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
            markArea: {
              data: [[{ yAxis: 120 }, { yAxis: 200 }]],
            },
          },
        ]);
  });
</script>
```
