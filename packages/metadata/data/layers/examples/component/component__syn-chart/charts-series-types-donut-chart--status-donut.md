## Status Donut

Use status colors to visualize the distribution of items across different statuses, such as error, warning, success, and neutral.

```html
<syn-chart id="donut-status"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';
  const charts = document.querySelectorAll("#donut-status");
  const getColor = (token) => {
    return ComponentTokens[token]["light"];
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          color: [
            getColor("SynNamurErrorColor"),
            getColor("SynNamurWarningColor"),
            getColor("SynNamurSuccessColor"),
            getColor("SynNamurNeutralColor"),
          ],
        })
        .seriesDonut({
          top: 16,
          data: [
            {
              value: 220,
              name: "Error",
            },
            {
              value: 50,
              name: "Warning",
            },
            {
              value: 120,
              name: "Success",
            },
            {
              value: 33,
              name: "Neutral",
            },
          ],
        })
        .legendShow();
  });
</script>
```
