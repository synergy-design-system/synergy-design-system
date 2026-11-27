## Custom Styling

Customize individual mark points with symbol, symbolSize, label.position and itemStyle.color. Pair color with distinct shapes and meaningful labels so status remains clear without relying on color alone.

```html
<syn-chart id="mark-point-custom-styling"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-point-custom-styling");
  const getColor = (token) => ComponentTokens[token]["light"];

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
                {
                  coord: ["Tue", 230],
                  name: "Target met",
                  symbol: "circle",
                  symbolSize: 18,
                  label: { position: "top" },
                  itemStyle: { color: getColor("SynNamurSuccessColor") },
                },
                {
                  coord: ["Thu", 218],
                  name: "Warning",
                  symbol: "triangle",
                  symbolSize: 20,
                  label: { position: "top" },
                  itemStyle: { color: getColor("SynNamurWarningColor") },
                },
                {
                  coord: ["Sat", 147],
                  name: "Critical",
                  symbol: "diamond",
                  symbolSize: 24,
                  label: { position: "right" },
                  itemStyle: { color: getColor("SynNamurErrorColor") },
                },
              ],
              label: { formatter: "{b}" },
            },
          },
        ]);
  });
</script>
```
