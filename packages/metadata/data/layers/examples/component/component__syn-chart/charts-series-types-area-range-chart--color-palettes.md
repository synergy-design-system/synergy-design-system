## Color Palettes

Set the chart's palette attribute to apply a Synergy chart color palette to area range series.

```html
<syn-chart id="area-range-series-palettes" palette="sequential-01"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-palettes");

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
        .seriesAreaRange([
          [620, 820],
          [732, 932],
          [701, 901],
          [734, 934],
          [1090, 1290],
          [1130, 1330],
          [1120, 1320],
        ])
        .seriesAreaRange([
          [370, 520],
          [482, 682],
          [451, 631],
          [484, 714],
          [840, 1040],
          [880, 1080],
          [870, 1070],
        ])
        .seriesAreaRange([
          [120, 270],
          [232, 382],
          [201, 351],
          [234, 384],
          [590, 740],
          [630, 780],
          [620, 770],
        ]);
  });
</script>
```
