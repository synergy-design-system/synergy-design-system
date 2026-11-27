## With Legend

Use legendShow() to display a legend for named area range series. Users can select legend entries to toggle the corresponding ranges.

```html
<syn-chart id="area-range-series-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-legend");

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
        .seriesAreaRange(
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
            name: "Series A",
          },
        )
        .seriesAreaRange(
          [
            [370, 520],
            [482, 682],
            [451, 631],
            [484, 714],
            [840, 1040],
            [880, 1080],
            [870, 1070],
          ],
          {
            name: "Series B",
          },
        )
        .seriesAreaRange(
          [
            [120, 270],
            [232, 382],
            [201, 351],
            [234, 384],
            [590, 740],
            [630, 780],
            [620, 770],
          ],
          {
            name: "Series C",
          },
        )
        .legendShow();
  });
</script>
```
