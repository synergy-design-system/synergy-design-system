## Tooltip

Use tooltipShow() to display a segment's value on hover. Set a name on each data item to identify it in the tooltip. The synDonut series supports only trigger: 'item', which is set by default for the series, trigger: 'axis' does not work.

```html
<syn-chart id="donut-tooltip"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-tooltip");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .seriesDonut({
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
        .tooltipShow();
  });
</script>
```
