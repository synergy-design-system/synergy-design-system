## Min Max And Average

Use predefined types like average, min or max as start or endpoints in markArea.data.type.

```html
<syn-chart id="mark-area-min-max"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-area-min-max");

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
            markArea: {
              data: [[{ type: "average" }, { type: "max" }]],
            },
          },
        ]);
  });
</script>
```
