## Custom Colors

By default, each series is assigned a color from the chart's categorical color palette. Use the colors option to provide explicit colors instead. Colors are repeated cyclically when fewer colors than data points are provided.

```html
<syn-chart id="area-range-series-custom-colors"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

  const getChartColor = (token) => {
    return ChartTokens[token]["light"];
  };

  const charts = document.querySelectorAll("#area-range-series-custom-colors");
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
      handle
        .baseConfig(baseConfig)
        .seriesAreaRange([
          [620, 820],
          [732, 932],
          [701, 901],
          [734, 934],
          [1090, 1290],
          [1130, 1330],
          [1120, 1320],
        ])
        .seriesAreaRange([
          [370, 520],
          [482, 682],
          [451, 631],
          [484, 714],
          [840, 1040],
          [880, 1080],
          [870, 1070],
        ])
        .seriesAreaRange([
          [120, 270],
          [232, 382],
          [201, 351],
          [234, 384],
          [590, 740],
          [630, 780],
          [620, 770],
        ]);
  });
</script>
```
