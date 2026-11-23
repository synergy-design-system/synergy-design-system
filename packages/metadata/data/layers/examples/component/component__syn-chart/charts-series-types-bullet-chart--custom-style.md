## Custom Style

Set itemStyle on the series or on individual data items to customize range colors, border or shadows. Use Synergy chart tokens and keep the actual-value marker distinguishable from the range.

```html
<syn-chart id="bullet-custom-colors"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-custom-colors");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Pressure", "Flow", "Temperature", "Speed"],
            type: "category",
          },
          yAxis: { type: "value" },
        })
        .seriesBullet({
          itemStyle: {
            borderColor: ComponentTokens.SynColorNeutral700.light,
            borderWidth: 2,
            color: ChartTokens.SynChartSequential02_40.light,
          },
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            {
              start: 20,
              end: 100,
              current: 42,
              itemStyle: {
                borderColor: ComponentTokens.SynColorNeutral1000.light,
                color: ChartTokens.SynChartSequential02_70.light,
              },
            },
            { start: -15, end: 45, current: -6 },
          ],
        });
  });
</script>
```
