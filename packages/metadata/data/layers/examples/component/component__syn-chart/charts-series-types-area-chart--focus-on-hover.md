## Focus On Hover

Set emphasis.focus to series to highlight the hovered area series and de-emphasize the others.

```html
<syn-chart id="area-series-focus"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-focus");
  const seriesData = [
    [820, 932, 901, 934, 1290, 1330, 1320],
    [620, 732, 701, 734, 1090, 1130, 1120],
    [420, 532, 501, 534, 890, 930, 920],
  ];

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
        .seriesArea(
          seriesData.map((data, index) => ({
            data,
            emphasis: {
              focus: "series",
            },
          })),
        );
  });
</script>
```
