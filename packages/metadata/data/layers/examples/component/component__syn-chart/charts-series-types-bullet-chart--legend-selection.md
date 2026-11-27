## Legend Selection

Show a legend for named bullet items so users can identify ranges and toggle individual items.

```html
<syn-chart id="bullet-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-legend");
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
            { name: "Pressure", start: 10, end: 80, current: 65 },
            { name: "Flow", start: -10, end: 60, current: 48 },
            { name: "Temperature", start: 20, end: 100, current: 42 },
            { name: "Speed", start: -15, end: 45, current: -6 },
          ],
        })
        .legendShow();
  });
</script>
```
