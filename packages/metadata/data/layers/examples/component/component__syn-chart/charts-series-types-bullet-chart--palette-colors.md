## Palette Colors

Use the palette attribute to apply another Synergy chart color palette to the bullet series.

```html
<syn-chart id="bullet-palette" palette="sequential-status-success"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-palette");
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
        });
  });
</script>
```
