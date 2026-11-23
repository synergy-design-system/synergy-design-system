## Multiple Line Widths And Symbol Sizes

The line widths and symbol sizes can be adjusted to the needs.

```html
<syn-chart id="line-series-widths"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-widths");

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
      handle
        .baseConfig(baseConfig)
        .seriesLine([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name: "Default",
            symbol: "emptyCircle",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Width: 4",
            lineStyle: {
              width: 4,
            },
            symbol: "emptyCircle",
            symbolSize: 10,
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            name: "Width: 8",
            lineStyle: {
              width: 8,
            },
            symbol: "emptyCircle",
            symbolSize: 12,
          },
          {
            data: [220, 332, 301, 334, 690, 730, 720],
            name: "Width: 12",
            lineStyle: {
              width: 12,
            },
            symbol: "emptyCircle",
            symbolSize: 16,
          },
        ])
        .legendShow();
  });
</script>
```
