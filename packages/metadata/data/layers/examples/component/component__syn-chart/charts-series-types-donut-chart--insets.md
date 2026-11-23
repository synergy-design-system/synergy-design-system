## Insets

Use top, right, bottom, and left to reduce the donut layout area from each side before center and radius are resolved. Insets can be set in pixels (number) or percentages (string).

```html
<syn-chart id="donut-insets"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-insets");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        top: 20,
        right: 120,
        bottom: "50%",
        left: 260,
        data: [10, 20, 30, 40],
      });
  });
</script>
```
