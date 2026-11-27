## Multiple Series Per Y Axis

This chart compares two metrics (temperature, precipitation) for two countries (Germany, France) using a single shared axis approach, encoded through visual channels that do not depend on color perception at all: 1. Line style and marker shape = country Germany is drawn with solid lines and filled square/circle markers; France is drawn with dotted lines. This distinction is fully readable in grayscale or black-and-white print, since it relies on stroke pattern and shape rather than hue. 2. Legend labels = explicit redundant encodingRather than expecting the reader to decode line style or marker shape from a key, each legend entry spells out both dimensions in text: "Temperature Germany", "Preciptation France". This turns the legend itself into a self-sufficient lookup table, so no single visual channel has to carry the full weight of disambiguation.Color is still used in this chart (blue/green) to make the two metrics faster to tell apart on screen, but it is treated as a supporting cue only and never as the sole means of distinguishing a series. Every distinction the chart makes is also carried by line style, marker shape, or the legend text, so the chart remains fully legible if color is removed entirely (e.g. printed in black and white, or viewed by a colorblind user).

```html
<syn-chart id="chart-multiple-series-per-y-axis"></syn-chart>
<script type="module">
  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: [
      {
        name: "Temperature (°C)",
        type: "value",
      },
      {
        name: "Precipitation (mm)",
        type: "value",
        position: "right",
      },
    ],
  };

  const charts = document.querySelectorAll("#chart-multiple-series-per-y-axis");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesLine([
          {
            data: [18, 21, 23, 25, 22, 19, 17],
            name: "Temperature Deutschland",
            yAxisIndex: 0,
            symbol: "rect",
            itemStyle: {
              color: "#005aff",
            },
          },
          {
            data: [22, 24, 27, 29, 26, 23, 20],
            yAxisIndex: 0,
            name: "Temperature Frankreich",
            symbol: "rect",
            itemStyle: {
              color: "#005aff",
            },
            lineStyle: {
              type: "dashed",
            },
          },
          {
            data: [5, 0, 2, 12, 18, 8, 3],
            yAxisIndex: 1,
            name: "Precipitation Deutschland",
            symbol: "dotted",
            itemStyle: {
              color: "#2d9c60",
            },
          },
          {
            data: [2, 0, 0, 8, 14, 6, 1],
            yAxisIndex: 1,
            name: "Precipitation Frankreich",
            symbol: "circle",
            itemStyle: {
              color: "#2d9c60",
            },
            lineStyle: {
              type: "dotted",
            },
          },
        ])
        .axesShowSplitLines()
        .legendShow();
  });
</script>
```
