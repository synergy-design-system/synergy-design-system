## Coordinate Line

Define a mark line with a pair of coord points to connect custom coordinates. Configure symbol to control the symbols at either end of the line.

```html
<syn-chart id="mark-line-coordinates"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-coordinates");

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
            markLine: {
              data: [
                [
                  { coord: ["Mon", 100], name: "Trend" },
                  { coord: ["Sun", 280] },
                ],
              ],
              symbol: ["none", "arrow"],
            },
          },
        ]);
  });
</script>
```
