## Min And Max

Use type: 'min' and type: 'max' in markLine.data to highlight the minimum and maximum values of a series.

```html
<syn-chart id="mark-line-min-max"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-min-max");

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
            markLine: {
              data: [
                { type: "min", name: "Minimum" },
                { type: "max", name: "Maximum" },
              ],
            },
          },
        ]);
  });
</script>
```
