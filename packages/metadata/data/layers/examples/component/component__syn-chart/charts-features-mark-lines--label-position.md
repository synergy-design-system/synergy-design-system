## Label Position

The label position can be configured using label.position. While several positions are supported, start and end are generally recommended. To ensure long labels remain fully visible, adjust the chart grid (for example grid.left, grid.top, etc.) to provide sufficient space around the chart area. Use label.formatter to customize the displayed text, such as combining the mark line name with the value.

```html
<syn-chart id="mark-line-label-position"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-label-position");

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
          grid: {
            left: 200,
            right: 200,
            top: 50,
          },
        })
        .seriesLine([
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            markLine: {
              data: [
                {
                  yAxis: 80,
                  name: "Horizontal start",
                  label: {
                    formatter: "{b}: {c}",
                    position: "start",
                  },
                },
                {
                  yAxis: 220,
                  name: "Horizontal end",
                  label: {
                    formatter: "{b}: {c}",
                    position: "end",
                  },
                },
                {
                  xAxis: "Tue",
                  name: "Vertical start",
                  label: {
                    formatter: "{b}: {c}",
                    position: "start",
                  },
                },
                {
                  xAxis: "Sat",
                  name: "Vertical end",
                  label: {
                    formatter: "{b}: {c}",
                    position: "end",
                  },
                },
              ],
            },
          },
        ]);
  });
</script>
```
