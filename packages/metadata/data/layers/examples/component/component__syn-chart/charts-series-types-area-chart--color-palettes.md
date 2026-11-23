## Color Palettes

Use the palette attribute to apply another Synergy chart color palette to the area series.

```html
<syn-chart id="area-series-palettes" palette="sequential-01"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-palettes");

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
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            data: [420, 532, 501, 534, 890, 930, 920],
          },
        ]);
  });
</script>
```
