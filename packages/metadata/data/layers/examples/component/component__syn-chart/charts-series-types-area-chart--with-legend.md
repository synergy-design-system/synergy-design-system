## With Legend

Use legendShow() to display a legend for named series. Series names become the legend labels, and users can toggle series visibility interactively.

```html
<syn-chart id="area-series-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-legend");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          legend: { selectedMode: "multiple" },
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
            name: "Series A",
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            name: "Series B",
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
            name: "Series C",
          },
        ])
        .legendShow();
  });
</script>
```
