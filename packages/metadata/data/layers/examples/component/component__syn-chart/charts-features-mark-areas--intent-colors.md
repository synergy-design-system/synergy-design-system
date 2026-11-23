## Intent Colors

Use Synergy's NAMUR status colors when a highlighted range needs to communicate intent: green for a target that has been met, red for an exceeded limit or critical range, and yellow/orange for a warning. Set the area color in itemStyle and use opacity to keep the data visible beneath it.

```html
<syn-chart id="mark-area-intent-colors"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-area-intent-colors");
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
            markArea: {
              data: [
                [
                  {
                    yAxis: 230,
                    name: "Too high",
                    itemStyle: {
                      color: getColor("SynNamurErrorColor"),
                      opacity: 0.3,
                    },
                  },
                  { yAxis: 280 },
                ],
                [
                  {
                    yAxis: 80,
                    name: "Too low",
                    itemStyle: {
                      color: getColor("SynNamurErrorColor"),
                      opacity: 0.3,
                    },
                  },
                  { yAxis: 120 },
                ],
              ],
            },
          },
        ]);
  });
</script>
```
