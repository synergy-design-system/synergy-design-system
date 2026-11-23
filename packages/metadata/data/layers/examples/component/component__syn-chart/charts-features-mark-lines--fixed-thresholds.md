## Fixed Thresholds

Add a yAxis value to markLine.data to draw a horizontal threshold line. Use an xAxis value for a vertical line at a specific category.

```html
<syn-chart id="mark-line-thresholds"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-thresholds");

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
                { yAxis: 240 },
                {
                  xAxis: "Sat",
                  label: {
                    position: "start",
                  },
                },
              ],
            },
          },
        ]);
  });
</script>
```
