## Tooltip

Use tooltipShow() to display a segment's value on hover. Set a name on each data item to identify it in the tooltip. The synSegment series supports only trigger: 'item', which is set by default for the series, trigger: 'axis' does not work.

```html
<syn-chart id="segment-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-tooltip");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .seriesSegment({
          data: [
            { name: "Temperature", value: 70 },
            { name: "Pressure", value: 30 },
            { name: "Humidity", value: 50 },
          ],
        })
        .tooltipShow();
  });
</script>
```
