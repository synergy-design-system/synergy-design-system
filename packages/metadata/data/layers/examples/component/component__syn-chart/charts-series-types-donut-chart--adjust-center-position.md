## Adjust Center Position

Use the center option to position the donut inside the available layout area. Values can be pixels or percentages.

```html
<syn-chart id="donut-center"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-center");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        center: ["35%", "65%"],
        radius: "70",
        data: [10, 20, 30, 40],
      });
  });
</script>
```
