## Custom Colors

By default, each area series is assigned a color from the chart's categorical color palette. Use the colors option to provide explicit colors instead. Colors are repeated cyclically when fewer colors than data points are provided.

```html
<syn-chart id="area-series-custom-colors"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

  const getChartColor = (token) => {
    return ChartTokens[token]["light"];
  };

  const charts = document.querySelectorAll("#area-series-custom-colors");
  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
    color: [
      getChartColor("SynChartSequential02_80"),
      getChartColor("SynChartSequential02_70"),
      getChartColor("SynChartSequential02_50"),
    ],
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesArea([
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          name: "Series A",
        },
        {
          data: [620, 732, 701, 734, 1090, 1130, 1120],
          name: "Series B",
        },
        {
          data: [420, 532, 501, 534, 890, 930, 920],
          name: "Series C",
        },
      ]);
  });
</script>
```
