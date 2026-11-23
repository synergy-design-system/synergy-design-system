## Symbol Styles And Sizes

The data points can be marked via symbols. Set symbol and symbolSize on each series to customize them.

```html
<syn-chart id="area-series-symbols"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-symbols");

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
        .seriesArea([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            name: "Empty circle",
            symbol: "emptyCircle",
            symbolSize: 8,
          },
          {
            data: [720, 832, 801, 834, 1190, 1230, 1220],
            name: "Circle",
            symbol: "circle",
            symbolSize: 10,
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Diamond",
            symbol: "diamond",
            symbolSize: 14,
          },
          {
            data: [520, 632, 601, 634, 990, 1030, 1020],
            name: "Triangle",
            symbol: "triangle",
            symbolSize: 12,
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            name: "Rect",
            symbol: "rect",
            symbolSize: 12,
          },
          {
            data: [320, 432, 401, 434, 790, 830, 820],
            name: "Pin",
            symbol: "pin",
            symbolSize: 16,
          },
          {
            data: [220, 332, 301, 334, 690, 730, 720],
            name: "Arrow",
            symbol: "arrow",
            symbolSize: 14,
          },
          {
            data: [120, 232, 201, 234, 590, 630, 620],
            name: "Round rect",
            symbol: "roundRect",
            symbolSize: 12,
          },
          {
            data: [20, 132, 101, 134, 490, 530, 520],
            name: "None",
            symbol: "none",
          },
        ])
        .legendShow({}, { top: 140 });
  });
</script>
```
