## Min Max And Average

Use predefined types like average, min or max as points in markPoint.data.type.

```html
<syn-chart id="mark-point-min-max-and-average"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-point-min-max-and-average");

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
            data: [150, 230, 270, 218, 135, 147, 260],
            markPoint: {
              data: [{ type: "min" }, { type: "max" }, { type: "average" }],
            },
          },
        ]);
  });
</script>
```
