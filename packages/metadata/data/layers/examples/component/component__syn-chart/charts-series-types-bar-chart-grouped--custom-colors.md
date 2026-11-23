## Custom Colors

Bar series use the chart's categorical palette by default. Use the color option to apply explicit colors to individual series.

```html
<syn-chart id="bar-series-grouped-colors"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

  const getChartColor = (token) => {
    return ChartTokens[token]["light"];
  };

  const charts = document.querySelectorAll("#bar-series-grouped-colors");
  const baseConfig = {
    xAxis: {
      data: ["A", "B", "C"],
      name: "Category",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
    color: [
      getChartColor("SynChartSequential02_80"),
      getChartColor("SynChartSequential02_70"),
      getChartColor("SynChartSequential02_50"),
    ],
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: [120, 180, 150],
        },
        {
          data: [80, 130, 100],
        },
        {
          data: [90, 120, 140],
        },
      ]);
  });
</script>
```
