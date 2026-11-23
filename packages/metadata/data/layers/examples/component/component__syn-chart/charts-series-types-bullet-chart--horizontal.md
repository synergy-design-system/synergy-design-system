## Horizontal

Place categories on the y-axis and values on the x-axis. Horizontal bullets provide more room for category labels and can be useful for compact KPI dashboards.

```html
<syn-chart id="bullet-horizontal"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-horizontal");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: { type: "value" },
          yAxis: {
            data: ["Pressure", "Flow", "Temperature", "Speed"],
            type: "category",
          },
        })
        .seriesBullet({
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
        });
  });
</script>
```
