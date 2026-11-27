## No Label

Hide the label for a mark line by setting label.show to false.

```html
<syn-chart id="mark-line-no-label"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-line-no-label");

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
        .seriesLine([
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            markLine: {
              data: [{ yAxis: 180, label: { show: false } }],
            },
          },
        ]);
  });
</script>
```
