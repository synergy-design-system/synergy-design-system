## With Legend

Use legendShow() to display a legend for segment data items. Set the name option on each item to provide its legend label.

```html
<syn-chart id="segment-legend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-legend");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .seriesSegment({
          data: [
            {
              value: 15,
              name: "One",
            },
            {
              value: 30,
              name: "Two",
            },
            {
              value: 50,
              name: "Three",
            },
            {
              value: 80,
              name: "Four",
            },
          ],
          top: 20,
        })
        .legendShow();
  });
</script>
```
