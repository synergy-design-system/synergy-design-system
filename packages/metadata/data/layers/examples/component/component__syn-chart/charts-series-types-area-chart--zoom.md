## Zoom

Configure dataZoom to let users focus on a subset of an area chart's data. The slider provides handles for selecting the visible range.

```html
<syn-chart id="area-series-zoom"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-zoom");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          dataZoom: [{ type: "slider", start: 30, end: 70 }],
          grid: { bottom: 120 },
          xAxis: {
            data: Array.from({ length: 30 }, (_, index) => {
              const date = new Date(2026, 0, 1 + index);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }),
            type: "category",
            name: "Date",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesArea([
          {
            data: [
              820, 932, 901, 934, 1290, 1330, 1320, 620, 732, 701, 734, 1090,
              1130, 1120, 420, 532, 501, 534, 890, 930, 920, 320, 432, 401, 434,
              790, 830, 820, 220, 332,
            ],
            name: "Series A",
          },
          {
            data: [
              450, 680, 550, 890, 720, 850, 610, 1100, 950, 820, 1050, 650, 780,
              560, 920, 1200, 680, 750, 1040, 590, 875, 1150, 740, 920, 680,
              1080, 620, 950, 1220, 750,
            ],
            name: "Series B",
          },
        ]);
  });
</script>
```
