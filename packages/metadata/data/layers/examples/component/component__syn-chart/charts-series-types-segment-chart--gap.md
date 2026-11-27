## Gap

Use the gap option to set the size of the open section in the segment ring. It is defined as a fraction of the full circle (0–1) and defaults to 0.3. Use gapOrientation to rotate the opening around the chart. By default, it is centered at the bottom.

```html
<syn-chart id="segment-gap"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-gap");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [5, 10, 50, 80, 100],
        gap: 0.5,
        gapOrientation: 90,
      });
  });
</script>
```
