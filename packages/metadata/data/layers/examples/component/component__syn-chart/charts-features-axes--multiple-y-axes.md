## Multiple Y Axes

To add multiple y-axes to the chart, define an array of y-axis configurations under the yAxis option. Shared y-axes are positioned on the left side by default, and you can specify the position for each axis individually.

```html
<syn-chart id="chart-multiple-y-axes"></syn-chart>
<script type="module">
  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: [
      {
        name: "Values",
        type: "value",
      },
      {
        name: "Values 2",
        type: "value",
      },
      {
        name: "Values 3",
        type: "value",
        position: "right",
      },
    ],
  };

  const charts = document.querySelectorAll("#chart-multiple-y-axes");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesLine([
          {
            data: [1820, 1932, 1901, 1934, 5290, 3330, 4320],
            name: "Series 1",
            yAxisIndex: 0,
          },
          {
            data: [620, 732, 701, 734, 1090, 1130, 1120],
            yAxisIndex: 1,
            name: "Series 2",
          },
          {
            data: [90, 50, 99, 143, 15, 32, 45],
            yAxisIndex: 2,
            name: "Series 3",
          },
        ])
        .axesShowSplitLines();
  });
</script>
```
