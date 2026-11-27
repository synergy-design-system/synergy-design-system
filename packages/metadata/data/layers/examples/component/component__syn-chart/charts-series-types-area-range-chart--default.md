## Default

Use the seriesAreaRange preset function to create area range charts. This preset accepts each data point as a pair of lower and upper values and automatically generates the boundary lines, filled area and tooltip configuration. Its optional second argument accepts line series options that are merged into both boundary series and can override their defaults.Alternatively, an area range can be configured using two stacked line series. Both series must use the same stack and name value. The first series contains the lower bound values and has its tooltip disabled. The second series contains the difference between the upper and lower values (upper - lower) and defines an areaStyle to render the shaded range. To display the actual range in the tooltip, format the second series' tooltip value using the original lower and upper values rather than the calculated difference values.

```html
<syn-chart id="area-range-series-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-default");

  const lower = [620, 732, 701, 734, 1090, 1130, 1120];
  const upper = [820, 1032, 901, 1134, 1390, 1430, 1320];
  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        type: "category",
        name: "Days",
      },
      yAxis: { type: "value", name: "Values" },
      tooltip: {},
      series: [
        {
          data: lower,
          stack: "arearange",
          name: "Series A",
          type: "line",
          tooltip: {
            show: false,
          },
        },
        {
          data: upper.map((value, index) => value - lower[index]),
          stack: "arearange",
          type: "line",
          name: "Series A",
          areaStyle: { opacity: 0.2 },
          tooltip: {
            valueFormatter: (_, dataIndex) =>
              lower[dataIndex] + " - " + upper[dataIndex],
          },
        },
      ],
    };
  });
</script>
```
