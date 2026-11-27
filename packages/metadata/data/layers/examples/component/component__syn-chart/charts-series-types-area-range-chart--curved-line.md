## Curved Line

Set smooth: true to curve the upper and lower boundaries of the range.

```html
<syn-chart id="area-range-series-curved"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-curved");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesAreaRange(
        [
          [620, 820],
          [732, 932],
          [701, 901],
          [734, 934],
          [1090, 1290],
          [1130, 1330],
          [1120, 1320],
        ],
        { smooth: true },
      );
  });
</script>
```
