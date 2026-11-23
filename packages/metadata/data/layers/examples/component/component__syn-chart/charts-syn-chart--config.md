## Config

The config property is the main way to configure the chart. It accepts an object that maps 1:1 to the ECharts option configuration. Assigning a new object to this property will update the chart with the new configuration.

```html
<syn-chart id="chart-config"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-config");
  charts.forEach((chart) => {
    chart.config = {
      series: [{ data: [150, 230, 224], type: "line" }],
      xAxis: { data: ["Mon", "Tue", "Wed"], type: "category" },
      yAxis: { type: "value" },
    };
  });
</script>
```
