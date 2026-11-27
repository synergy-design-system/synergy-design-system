## Hidden Line

The lines of line series can be hidden. When hidden, only the symbols remain, which is useful for minimal or simplified data displays.

```html
<syn-chart id="line-series-hidden"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-hidden");

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
          lineStyle: {
            width: 0,
          },
          symbol: "circle",
        })),
      );
  });
</script>
```
