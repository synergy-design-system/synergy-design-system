## Default

A grouped bar chart is created when multiple bar series share the same category axis. The value axis defines the scale for the bar values. The bar chart can be configured via the chart config with type: bar or with the seriesBar preset function.

```html
<syn-chart id="bar-series-grouped-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-grouped-default");

  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        name: "Days",
        type: "category",
      },
      yAxis: {
        name: "Values",
      },
      series: [
        {
          data: [120, 180, 150, 80, 70, 110, 130],
          type: "bar",
        },
        {
          data: [80, 130, 100, 70, 90, 160, 140],
          type: "bar",
        },
        {
          data: [90, 120, 140, 100, 110, 70, 60],
          type: "bar",
        },
      ],
    };
  });
</script>
```
