## Category Axes Label Evenly

When all axis labels should remain visible and be distributed evenly along the axis, configure the labels to use a fixed amount of space per tick. If the available space becomes insufficient, labels are automatically truncated. This behavior can be achieved with axisLabel.interval = 0, axisLabel.width (calculated based on the available space per tick), and axisLabel.overflow = 'truncate'. To keep the layout responsive, recalculate the label width on window resize and update the chart configuration accordingly. This does only work for axis of type category.

```html
<syn-chart style="max-width: 450px" id="chart-axis-evenly"></syn-chart>
<script type="module">
  // Calculate the available width for each axis label based on the chart width and the number of labels
  const getAxisLabelWidth = (chart) => {
    const width = chart.getWidth() - 100; // Subtract some padding for the y-axis width
    const labelCount = 7;
    const labelWidth = width / labelCount;
    return labelWidth;
  };

  const updateChart = (chart) => {
    const chartInstance = chart.getInstance();

    const baseConfig = {
      series: [
        { data: [1500, 2300, 2541, 2184, 1352, 1479, 2605], type: "line" },
      ],
      xAxis: {
        data: ["January", "February", "March", "April", "May", "June", "July"],
        name: "Days",
        type: "category",
        axisLabel: {
          interval: 0,
          width: getAxisLabelWidth(chartInstance),
          overflow: "truncate",
        },
      },
      yAxis: {
        name: "Values",
        type: "value",
      },
    };

    chart.config = (handle) =>
      handle.baseConfig(baseConfig).axesShowSplitLines();
  };

  const charts = document.querySelectorAll("#chart-axis-evenly");
  charts.forEach((chart) => {
    const chartInstance = chart.getInstance();
    updateChart(chart);

    // Update the chart when the window is resized to recalculate the available width for each axis label
    window.addEventListener("resize", () => {
      updateChart(chart);
    });
  });
</script>
```
