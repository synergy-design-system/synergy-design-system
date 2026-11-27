## Name

The name option sets the name of the segment chart, which is displayed in the gap of the chart when provided. The text styling can be overwritten via nameTextStyle. It can be used to e.g. change the appearance like color, overflow handling, positioning and other text-related properties.

```html
<syn-chart id="segment-name"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-name");
  charts.forEach((chart) => {
    const halfChartSize = () =>
      Math.min(chart.offsetWidth, chart.offsetHeight) / 2;
    let nameWidth = halfChartSize();
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [5, 10, 50, 80, 100],
        name: "This is a very long name",
        nameTextStyle: {
          overflow: "break",
          width: nameWidth,
        },
      });

    setTimeout(() => {
      const instance = chart.getInstance();
      // Adapt the name width when the chart is resized, so it breaks correctly
      window.addEventListener("resize", () => {
        nameWidth = halfChartSize();
        instance.setOption({
          series: [{ nameTextStyle: { width: nameWidth } }],
        });
      });
    });
  });
</script>
```
