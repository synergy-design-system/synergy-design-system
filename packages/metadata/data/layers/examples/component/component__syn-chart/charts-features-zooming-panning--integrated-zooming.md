## Integrated Zooming

When having large data sets or dense series where users need to inspect local trends without leaving the chart context, the dataZoom option with type: 'inside' can be used. It enables direct interaction inside the plotting area: - mouse drag to pan- mouse wheel to zoom There are possibilities to customize the zooming behavior, for example, to restrict zooming to a specific axis, to set minimum and maximum zoom levels or to add an additional key for zooming. For more information have a look at the ECharts documentation

```html
<syn-chart id="integrated-zooming"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#integrated-zooming");

  const baseConfig = {
    xAxis: {
      data: Array.from({ length: 30 }, (_, i) => {
        const d = new Date(2026, 0, 1 + i);
        return d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }),
      type: "category",
      name: "Date",
    },
    yAxis: { type: "value", name: "Values" },
    dataZoom: [
      {
        type: "inside",
        start: 30,
        end: 70,
      },
    ],
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesLine([
        {
          data: [
            820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090,
            1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434,
            790, 830, 820, 220, 332,
          ],
        },
        {
          data: [
            450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780,
            560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680, 1080,
            620, 950, 1220, 750,
          ],
        },
      ]);
  });
</script>
```
