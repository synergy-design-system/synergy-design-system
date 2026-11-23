## Palette

Use the palette attribute to apply a Synergy design token color palette to chart series. categorical (12 distinct colors for comparing unrelated data series), sequential-01–sequential-07 (10-step single-hue ramps), and sequential-status-critical/error/info/success/warning (10-step status ramps). If option.color is explicitly set, it takes precedence over the palette attribute.

```html
<syn-chart id="chart-palette" palette="sequential-01"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-palette");
  charts.forEach((chart) => {
    chart.config = {
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          name: "Series A",
          type: "line",
        },
        {
          data: [80, 130, 180, 100, 90, 120, 200],
          name: "Series B",
          type: "line",
        },
        {
          data: [200, 160, 140, 170, 210, 180, 150],
          name: "Series C",
          type: "line",
        },
        {
          data: [100, 120, 150, 80, 70, 110, 130],
          name: "Series D",
          type: "line",
        },
        {
          data: [180, 200, 170, 190, 220, 210, 240],
          name: "Series E",
          type: "line",
        },
        {
          data: [90, 110, 130, 70, 60, 100, 120],
          name: "Series F",
          type: "line",
        },
        {
          data: [160, 190, 150, 200, 230, 220, 250],
          name: "Series G",
          type: "line",
        },
      ],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        type: "category",
      },
      yAxis: { type: "value" },
    };
  });
</script>
```
