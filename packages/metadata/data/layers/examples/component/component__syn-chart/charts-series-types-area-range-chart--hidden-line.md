## Hidden Line

Set lineStyle.width to 0 and configure symbol to show data point markers. When lines are hidden, only the filled range and its markers remain for a more minimal, range-focused visualization.

```html
<syn-chart id="area-range-series-hidden"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-hidden");

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
        {
          lineStyle: {
            width: 0,
          },
          symbol: "circle",
        },
      );
  });
</script>
```
