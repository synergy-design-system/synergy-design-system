## Slider Zooming

The data zoom slider (the dataZoom option with type: 'inside') allows users to define a specific data zoom level within a chart by dragging the left and right handles or moving the entire selection bar. It's commonly used in dashboards and analytics tools to filter, zoom, or focus on a subset of data without losing context of the full dataset. The component consists of three interactive elements: - Left handle: Defines the start of the selected zoom- Right handle: Defines the end of the selected zoom- Selection bar (center): Moves the entire zoom without changing its widthThe slider can be customized in terms of position, size and appearance. For more information have a look at the ECharts documentation

```html
<syn-chart id="slider-zooming"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#slider-zooming");

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
        type: "slider",
        start: 30,
        end: 70,
      },
    ],
    grid: {
      bottom: 120,
    },
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
