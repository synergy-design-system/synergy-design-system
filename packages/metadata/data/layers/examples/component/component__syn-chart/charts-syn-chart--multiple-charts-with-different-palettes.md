## Multiple Charts With Different Palettes

You can use multiple charts in one <syn-chart> instance, each with its own configuration. The palette colors or the default colors can be overridden per series item using the color property directly on the series object — allowing fine-grained control over individual chart series colors.Important: The color property does not support CSS variables (e.g. var(--syn-sequential-05-80)). This is a limitation of ECharts itself: ECharts renders via the Canvas API, which does not resolve CSS custom properties. To use Synergy design tokens as colors, read the computed hex value first using getComputedStyle(document.documentElement).getPropertyValue('--your-token').trim() and pass the resolved value instead.

```html
<syn-chart id="chart-multiple-charts" palette="categorical"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#chart-multiple-charts");

  const getHexValueFromVariable = (val) =>
    getComputedStyle(document.documentElement).getPropertyValue(val).trim();

  charts.forEach((chart) => {
    chart.config = {
      series: [
        {
          data: [160, 185, 180, 175, 150, 160, 190],
          name: "Series A",
          type: "line",
        },
        {
          data: [170, 165, 155, 168, 180, 170, 158],
          name: "Series B",
          type: "line",
        },
        {
          data: [165, 175, 158, 172, 182, 175, 185],
          name: "Series C",
          type: "line",
        },
        {
          color: [getHexValueFromVariable("--syn-sequential-05-80")],
          data: [80, 60, 90, 50, 70, 55, 85],
          name: "Series D",
          type: "line",
        },
        {
          color: [getHexValueFromVariable("--syn-sequential-05-60")],
          data: [65, 75, 55, 80, 45, 70, 60],
          name: "Series E",
          type: "line",
        },
        {
          color: [getHexValueFromVariable("--syn-sequential-05-40")],
          data: [50, 70, 60, 45, 55, 65, 75],
          name: "Series F",
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
