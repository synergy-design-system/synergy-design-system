## With Legend

Use legendShow() to render legend entries for the donut segments. Segment names are used as legend labels and can be toggled interactively. For this use the name option in the data items.

```html
<syn-chart id="donut-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-legend");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .seriesDonut({
          top: 60,
          data: [
            {
              value: 421,
              name: "Angular",
            },
            {
              value: 552,
              name: "React",
            },
            {
              value: 36,
              name: "Vue",
            },
          ],
        })
        .legendShow();
  });
</script>
```
