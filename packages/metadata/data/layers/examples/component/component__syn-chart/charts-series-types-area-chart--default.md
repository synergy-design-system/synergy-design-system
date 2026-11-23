## Default

An area chart can be configured via the chart config with type: 'line' and areaStyle: {} or with the seriesArea preset function. When using a config object, set areaStyle.opacity to 0.2 for the recommended styling. The seriesArea preset applies this opacity by default. Pass a custom areaStyle to override the preset default.

```html
<syn-chart id="area-series-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-series-default");

  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        type: "category",
        name: "Days",
      },
      yAxis: { type: "value", name: "Values" },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {
            opacity: 0.2,
          },
        },
        {
          data: [620, 732, 701, 734, 1090, 1130, 1120],
          type: "line",
          areaStyle: {
            opacity: 0.2,
          },
        },
        {
          data: [420, 532, 501, 534, 890, 930, 920],
          type: "line",
          areaStyle: {
            opacity: 0.2,
          },
        },
      ],
    };
  });
</script>
```
