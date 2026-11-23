## Weights

Use the weight option on data items to control the relative width of each segment independently of its value. Segments without an explicit weight use the default weight.

```html
<syn-chart id="segment-weights"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-weights");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [
          {
            label: formatter.unitFormatter("%"),
            value: 15,
            weight: 0.2,
          },
          {
            label: formatter.unitFormatter("%"),
            value: 30,
          },
          {
            label: formatter.unitFormatter("%"),
            value: 50,
            weight: 0.5,
          },
          {
            label: formatter.unitFormatter("%"),
            value: 80,
            weight: 0.3,
          },
          {
            label: formatter.unitFormatter("%"),
            value: 70,
            weight: 0.7,
          },
        ],
      });
  });
</script>
```
