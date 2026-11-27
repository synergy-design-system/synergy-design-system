## Categorical Vs Sequential

Depending on your use case, choose a categorical palette (up to 12 colors) or a sequential palette (recommended for up to 3 colors).

```html
<syn-chart id="bar-series-stacked-categorical"></syn-chart>
<syn-chart id="bar-series-stacked-sequential"></syn-chart>
<script type="module">
  // To use Synergy chart colors, import the resolved chart tokens. The chart
  // configuration currently requires hex values, which can be retrieved
  // directly from the chart tokens object:
  //
  // import { ResolvedTokens as ChartTokens } from '@synergy-design-system/tokens/charts/resolved';

  const getChartColor = (token) => {
    return ChartTokens[token]["light"];
  };

  const categoricalCharts = document.querySelectorAll(
    "#bar-series-stacked-categorical",
  );
  const sequentialCharts = document.querySelectorAll(
    " #bar-series-stacked-sequential",
  );
  const baseConfig = {
    xAxis: {
      data: ["A", "B", "C"],
      name: "Category",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
  };

  categoricalCharts.forEach((categorical) => {
    categorical.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBarStacked([
        {
          data: [120, 180, 150],
        },
        {
          data: [80, 130, 100],
        },
        {
          data: [90, 120, 140],
        },
        {
          data: [110, 140, 170],
        },
      ]);
  });

  sequentialCharts.forEach((sequential) => {
    sequential.config = (handle) =>
      handle
        .baseConfig({
          ...baseConfig,
          color: [
            getChartColor("SynChartSequential01_80"),
            getChartColor("SynChartSequential01_70"),
            getChartColor("SynChartSequential01_50"),
          ],
        })
        .seriesBarStacked([
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
