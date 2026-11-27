## Fixed Axis Range

Set min and max on the value axis to keep the scale consistent across charts or updates. Include the relevant range endpoints and actual values so they remain visible.

```html
<syn-chart id="bullet-fixed-axis-range"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-fixed-axis-range");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: { data: ["Pressure", "Flow", "Speed"], type: "category" },
          yAxis: { min: -100, max: 100, type: "value" },
        })
        .seriesBullet({
          data: [
            { name: "Pressure", start: -70, end: 70, current: -40 },
            { name: "Flow", start: -45, end: 65, current: 50 },
            { name: "Speed", start: -30, end: 40, current: -20 },
          ],
        });
  });
</script>
```
