## Vertical

Place categories on the x-axis and values on the y-axis to compare actual values with their reference ranges vertically. This orientation works well for a small number of categories.

```html
<syn-chart id="bullet-vertical"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-vertical");
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
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
        })
        .axesShowYSplitLines();
  });
</script>
```
