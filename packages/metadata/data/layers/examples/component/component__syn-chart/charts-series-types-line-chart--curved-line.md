## Curved Line

The line series supports curved lines. Use the smooth property to enable smooth curves for the line series.

```html
<syn-chart id="line-series-curved"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-curved");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
  };

  const lineData = [
    [820, 932, 901, 934, 1290, 1330, 1320],
    [620, 732, 701, 734, 1090, 1130, 1120],
  ];

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesLine(
        lineData.map((data) => ({
          data,
          smooth: true,
        })),
      );
  });
</script>
```
