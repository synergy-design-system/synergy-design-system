## Multiple Line Styles

The line series supports a variety of styles, including line width and line type (solid, dashed, dotted). When combining multiple line charts, ensure there’s sufficient visual differentiation, for example, by using distinct line styles.

```html
<syn-chart id="line-series-styles"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#line-series-styles");

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
            name: "Solid Line",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Dashed Line",
            lineStyle: {
              type: "dashed",
            },
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            name: "Dotted Line",
            lineStyle: {
              type: "dotted",
            },
          },
        ])
        .legendShow();
  });
</script>
```
