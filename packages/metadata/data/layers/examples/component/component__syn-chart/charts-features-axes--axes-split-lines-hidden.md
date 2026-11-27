## Axes Split Lines Hidden

The default is, that both axes lines as well as the split lines are hidden.

```html
<syn-chart id="chart-lines-hidden"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-lines-hidden");

  charts.forEach((chart) => {
    chart.config = {
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        type: "category",
        name: "Days",
      },
      yAxis: { type: "value", name: "Values" },
    };
  });
</script>
```
