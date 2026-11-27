## Default

Configure a bullet chart via the chart config with type: 'synBullet' or with the seriesBullet preset function. Each data item requires numeric start, end and current values: the range extends from start to end and the marker shows current, which can be inside or outside the range. Range thickness adapts to the available category space and is capped by barMaxWidth by default.

```html
<syn-chart id="bullet-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-default");
  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        data: ["Pressure", "Flow", "Temperature", "Speed"],
        type: "category",
      },
      yAxis: { type: "value" },
      series: [
        {
          type: "synBullet",
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
        },
      ],
    };
  });
</script>
```
