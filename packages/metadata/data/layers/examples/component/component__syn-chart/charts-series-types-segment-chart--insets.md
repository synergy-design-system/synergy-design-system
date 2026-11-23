## Insets

Use top, right, bottom, and left to reduce the segment layout area from each side before segment rendering is done. Insets can be set in pixels (number) or percentages (string).

```html
<syn-chart id="segment-insets"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-insets");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        top: 20,
        right: 30,
        bottom: "20%",
        left: 60,
        data: [10, 20, 30, 40],
      });
  });
</script>
```
