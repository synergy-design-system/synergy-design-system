## Label Formatting

Use the label property in the data items to apply custom label formatting. This can be a string or a function that receives the segment value and returns a formatted label. If the label is not set, the value will be used as the label. To omit the label completely, set the label to undefined.

```html
<syn-chart id="donut-label-formatting"></syn-chart>
<script type="module">
  // Import the formatter from the chart utilities
  //import { formatter } from '@synergy-design-system/components/components/chart/index.js';

  const charts = document.querySelectorAll("#donut-label-formatting");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        data: [
          {
            value: 2000,
            label: "Custom string",
          },
          {
            value: 2000,
            label: undefined,
          },
          {
            value: 2000,
            label: formatter.unitFormatter("ms"),
          },
          {
            value: 2000,
            label: formatter.numberShorthandFormatter(),
          },
          {
            value: 2000,
            label: formatter.numberFormatter(undefined, {
              minimumFractionDigits: 2,
            }),
          },
        ],
      });
  });
</script>
```
