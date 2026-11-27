## Intent Colors

Use Synergy's NAMUR status colors when a reference line needs to communicate intent: green for a target that has been met, red for an exceeded limit or critical threshold and yellow/orange for a warning.

```html
<syn-chart id="mark-line-intent-colors"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-intent-colors");
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
            markLine: {
              data: [
                {
                  yAxis: 100,
                  name: "Target met",
                  lineStyle: { color: getColor("SynNamurSuccessColor") },
                },
                {
                  yAxis: 180,
                  name: "Warning",
                  lineStyle: { color: getColor("SynNamurWarningColor") },
                },
                {
                  yAxis: 260,
                  name: "Critical limit",
                  lineStyle: { color: getColor("SynNamurErrorColor") },
                },
              ],
            },
          },
        ]);
  });
</script>
```
