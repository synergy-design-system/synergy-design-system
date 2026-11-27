## Long Labels

By default, mark points use pin-shaped markers with the value shown inside. When a descriptive label is too long to fit in the pin, use a compact symbol such as circle and position the label outside of it.

```html
<syn-chart id="mark-point-labels"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-point-labels");
  const getChartColor = (token) => ChartTokens[token]["light"];

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
                  name: "Inspection",
                  label: { position: "top" },
                },
                {
                  coord: ["Fri", 135],
                  name: "Maintenance",
                  label: { position: "bottom" },
                },
              ],
              label: { formatter: "{b}", position: "top" },
              symbol: "circle",
              symbolSize: 16,
              itemStyle: { color: getChartColor("SynChartCategorical01") },
            },
          },
        ]);
  });
</script>
```
