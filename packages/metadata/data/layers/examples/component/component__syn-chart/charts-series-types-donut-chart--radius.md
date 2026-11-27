## Radius

Use the radius option to define the donut's outer radius. The value can be specified either as a number (for a fixed pixel value, e.g. 20) or as a percentage string (e.g. '50%'). Percentage-based values automatically scale with the available space, while pixel values remain fixed.

```html
<syn-chart id="donut-radius"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-radius");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        radius: "90%",
        data: [10, 20, 30, 40],
      });
  });
</script>
```
