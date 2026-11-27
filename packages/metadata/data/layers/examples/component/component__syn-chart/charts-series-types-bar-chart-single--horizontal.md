## Horizontal

Place categories on the y-axis and values on the x-axis, where bar length represents value magnitude. Horizontal bar charts are best suited for:- Long category labels: Provides ample horizontal room for text, avoiding overlapping, truncation, or awkward label rotations.- Large datasets: Scales cleanly for 10 or more categories without compressing bar widths.- Rankings: Naturally presents ordered lists (ascending or descending) in a top-to-bottom reading flow.

```html
<syn-chart id="bar-series-single-horizontal"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-single-horizontal");

  const baseConfig = {
    yAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    xAxis: {
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: [120, 180, 150, 80, 70, 110, 130],
        },
      ]);
  });
</script>
```
