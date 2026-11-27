## Hidden Line

The lines of area series can be hidden. When hidden, only the filled area remains for a more minimal, volume-focused visualization.

```html
<syn-chart id="area-series-hidden"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-hidden");

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
      handle.baseConfig(baseConfig).seriesArea(
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
