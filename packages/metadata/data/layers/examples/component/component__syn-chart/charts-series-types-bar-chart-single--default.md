## Default

The bar chart can be configured via the chart config with type: bar or with the seriesBar preset function.

```html
<syn-chart id="bar-series-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-default");

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
      ],
    };
  });
</script>
```
