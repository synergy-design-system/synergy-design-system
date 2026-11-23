## Custom Colors

By default, each segment item is assigned a color from the chart's categorical color palette. Use the colors option to provide explicit colors instead; colors are repeated cyclically when fewer colors than data points are provided.

```html
<syn-chart id="segment-colors"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

  const charts = document.querySelectorAll("#segment-colors");
  const getChartColor = (token) => {
    return ChartTokens[token]["light"];
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          color: [
            getChartColor("SynChartSequential01_100"),
            getChartColor("SynChartSequential01_90"),
            getChartColor("SynChartSequential01_80"),
            getChartColor("SynChartSequential01_70"),
            getChartColor("SynChartSequential01_60"),
            getChartColor("SynChartSequential01_50"),
            getChartColor("SynChartSequential01_40"),
          ],
        })
        .seriesSegment({
          data: [70, 80, 90, 75, 60, 50],
        });
  });
</script>
```
