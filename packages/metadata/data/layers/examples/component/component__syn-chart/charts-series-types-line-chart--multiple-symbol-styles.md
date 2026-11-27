## Multiple Symbol Styles

The line series supports a variety of symbols.

```html
<syn-chart id="line-series-symbols"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-symbols");

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
            name: "Empty circle symbol",
            symbol: "emptyCircle",
          },
          {
            data: [720, 832, 801, 834, 1190, 1230, 1220],
            name: "Circle symbol",
            symbol: "circle",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Diamond symbol",
            symbol: "diamond",
          },
          {
            data: [520, 632, 601, 634, 990, 1030, 1020],
            name: "Triangle symbol",
            symbol: "triangle",
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            name: "Rect symbol",
            symbol: "rect",
          },
          {
            data: [320, 432, 401, 434, 790, 830, 820],
            name: "Pin symbol",
            symbol: "pin",
          },
          {
            data: [220, 332, 301, 334, 690, 730, 720],
            name: "Arrow symbol",
            symbol: "arrow",
          },
          {
            data: [120, 232, 201, 234, 590, 630, 620],
            name: "Round rect symbol",
            symbol: "roundRect",
          },
          {
            data: [20, 132, 101, 134, 490, 530, 520],
            name: "None symbol",
            symbol: "none",
          },
        ])
        .legendShow({}, { top: 140 });
  });
</script>
```
