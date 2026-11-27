## Default

The segment chart can be configured via the chart config with type: 'synSegment' or with the seriesSegment preset function.

```html
<syn-chart id="segment-preset"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-preset");

  charts.forEach((chart) => {
    chart.config = {
      series: [
        {
          type: "synSegment",
          data: [5, 10, 50, 80, 100],
        },
      ],
    };
  });
</script>
```
