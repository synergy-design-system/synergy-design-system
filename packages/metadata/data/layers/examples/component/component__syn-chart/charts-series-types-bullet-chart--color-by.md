## Color By

Use colorBy: 'data' to assign range colors by item or colorBy: 'series' to give the items in a series the same color.

```html
<syn-chart id="bullet-color-by-data"></syn-chart>
<syn-chart id="bullet-color-by-series"></syn-chart>
<script type="module">
  const byData = document.querySelectorAll("#bullet-color-by-data");
  const bySeries = document.querySelectorAll("#bullet-color-by-series");
  const baseConfig = {
    xAxis: {
      data: ["Pressure", "Flow", "Temperature", "Speed"],
      type: "category",
    },
    yAxis: { type: "value" },
  };
  const data = [
    { start: 10, end: 80, current: 65 },
    { start: -10, end: 60, current: 48 },
    { start: 20, end: 100, current: 42 },
    { start: -15, end: 45, current: -6 },
  ];
  byData.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBullet({ colorBy: "data", data });
  });
  bySeries.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBullet({ colorBy: "series", data });
  });
</script>
```
