## Curved Line

The area series supports curved lines. Use the smooth property to enable smooth curves.

```html
<syn-chart id="area-series-curved"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-curved");

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
    [420, 532, 501, 534, 890, 930, 920],
  ];

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesArea(
        lineData.map((data) => ({
          data,
          smooth: true,
        })),
      );
  });
</script>
```
