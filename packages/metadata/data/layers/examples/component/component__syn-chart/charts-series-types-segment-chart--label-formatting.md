## Label Formatting

Segment labels can be provided as strings or formatter functions. If no label is provided, the value is used by default; set label to undefined to omit a label.

```html
<syn-chart id="segment-label-formatting"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#segment-label-formatting");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [
          {
            value: 70,
            label: "Custom string",
          },
          {
            value: 70,
            label: undefined,
          },
          {
            value: 70,
            label: formatter.unitFormatter("ms"),
          },
          {
            value: 70,
            label: formatter.numberShorthandFormatter(),
          },
          {
            value: 70,
            label: formatter.numberFormatter(undefined, {
              minimumFractionDigits: 2,
            }),
          },
          {
            value: 70,
          },
        ],
      });
  });
</script>
```
