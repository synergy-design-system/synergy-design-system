## Tooltip

Enable a tooltip to inspect the range and actual value on hover. Set a name on each data item to show it in the tooltip. Without a name, the category label is used instead. Set tooltip.axisPointer.type to 'shadow' to highlight the corresponding category and compare values across series.

```html
<syn-chart id="bullet-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-tooltip");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Pressure", "Flow", "Temperature", "Speed"],
            type: "category",
          },
          yAxis: { type: "value" },
        })
        .seriesBullet({
          data: [
            { name: "Sensor A", start: 10, end: 80, current: 65 },
            { name: "Sensor B", start: -10, end: 60, current: 48 },
            { name: "Sensor C", start: 20, end: 100, current: 42 },
            { name: "Sensor D", start: -15, end: 45, current: -6 },
          ],
        })
        .tooltipShow({ axisPointer: { type: "shadow" } });
  });
</script>
```
