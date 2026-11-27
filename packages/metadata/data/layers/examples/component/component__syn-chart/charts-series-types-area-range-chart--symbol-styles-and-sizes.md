## Symbol Styles And Sizes

Use symbol and symbolSize to choose the marker shape and size for area range data points. Set symbol to none to hide the markers.

```html
<syn-chart id="area-range-series-symbols"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#area-range-series-symbols");

  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
      name: "Days",
    },
    yAxis: { type: "value", name: "Values" },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig(baseConfig)
        .seriesAreaRange(
          [
            [7170, 7470],
            [7282, 7582],
            [7251, 7551],
            [7284, 7584],
            [7640, 7940],
            [7680, 7980],
            [7670, 7970],
          ],
          {
            name: "Empty circle",
            symbol: "emptyCircle",
            symbolSize: 8,
          },
        )
        .seriesAreaRange(
          [
            [6270, 6570],
            [6382, 6682],
            [6351, 6651],
            [6384, 6684],
            [6740, 7040],
            [6780, 7080],
            [6770, 7070],
          ],
          {
            name: "Circle",
            symbol: "circle",
            symbolSize: 10,
          },
        )
        .seriesAreaRange(
          [
            [5370, 5670],
            [5482, 5782],
            [5451, 5751],
            [5484, 5784],
            [5840, 6140],
            [5880, 6180],
            [5870, 6170],
          ],
          {
            name: "Diamond",
            symbol: "diamond",
            symbolSize: 14,
          },
        )
        .seriesAreaRange(
          [
            [4470, 4770],
            [4582, 4882],
            [4551, 4851],
            [4584, 4884],
            [4940, 5240],
            [4980, 5280],
            [4970, 5270],
          ],
          {
            name: "Triangle",
            symbol: "triangle",
            symbolSize: 12,
          },
        )
        .seriesAreaRange(
          [
            [3570, 3870],
            [3682, 3982],
            [3651, 3951],
            [3684, 3984],
            [4040, 4340],
            [4080, 4380],
            [4070, 4370],
          ],
          {
            name: "Rect",
            symbol: "rect",
            symbolSize: 12,
          },
        )
        .seriesAreaRange(
          [
            [2670, 2970],
            [2782, 3082],
            [2751, 3051],
            [2784, 3084],
            [3140, 3440],
            [3180, 3480],
            [3170, 3470],
          ],
          {
            name: "Pin",
            symbol: "pin",
            symbolSize: 16,
          },
        )
        .seriesAreaRange(
          [
            [1770, 2070],
            [1882, 2182],
            [1851, 2151],
            [1884, 2184],
            [2240, 2540],
            [2280, 2580],
            [2270, 2570],
          ],
          {
            name: "Arrow",
            symbol: "arrow",
            symbolSize: 14,
          },
        )
        .seriesAreaRange(
          [
            [870, 1170],
            [982, 1282],
            [951, 1251],
            [984, 1284],
            [1340, 1640],
            [1380, 1680],
            [1370, 1670],
          ],
          {
            name: "Round rect",
            symbol: "roundRect",
            symbolSize: 12,
          },
        )
        .seriesAreaRange(
          [
            [30, 270],
            [82, 382],
            [51, 351],
            [84, 384],
            [440, 740],
            [480, 780],
            [470, 770],
          ],
          {
            name: "None",
            symbol: "none",
          },
        )
        .legendShow({}, { top: 140 });
  });
</script>
```
