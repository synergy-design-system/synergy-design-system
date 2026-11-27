## Line Styles And Widths

The line styles can be adjusted such as solid, dashed, and dotted as well as custom line widths. Use distinct styles to differentiate series when needed.

```html
<syn-chart id="area-series-line-styles"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-line-styles");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "category",
            name: "Days",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesArea([
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            lineStyle: { type: "solid", width: 2 },
            name: "Solid, 2 px",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            lineStyle: { type: "dashed", width: 4 },
            name: "Dashed, 4 px",
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            lineStyle: { type: "dotted", width: 6 },
            name: "Dotted, 6 px",
          },
        ])
        .legendShow();
  });
</script>
```
