## Label Position

The label position can be configured using label.position. While multiple positions are supported, 'insideLeft' is recommended for horizontal mark areas and 'insideTop' for vertical mark areas. The default position is 'insideLeft'.

```html
<syn-chart id="mark-area-label-position"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-area-label-position");
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
                    yAxis: 110,
                    name: "Horizontal Position",
                  },
                  { yAxis: 160 },
                ],
                [
                  {
                    xAxis: "Wed",
                    name: "Vertical Position",
                    label: {
                      position: "insideTop",
                    },
                  },
                  { xAxis: "Fri" },
                ],
              ],
            },
          },
        ]);
  });
</script>
```
