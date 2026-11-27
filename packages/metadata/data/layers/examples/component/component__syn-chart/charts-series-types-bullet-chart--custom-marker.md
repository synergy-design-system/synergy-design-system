## Custom Marker

Use markerStyle to set the actual-value marker's color, border, opacity, width and height. Width and height are physical pixel dimensions independent of orientation, the marker remains centered on the actual value.

```html
<syn-chart id="bullet-custom-marker"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bullet-custom-marker");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Pressure", "Flow", "Speed", "Temperature"],
            type: "category",
          },
          yAxis: { type: "value" },
        })
        .seriesBullet({
          data: [
            { start: 10, end: 80, current: 65 },
            { start: -10, end: 60, current: 48 },
            { start: 20, end: 100, current: 42 },
            { start: -15, end: 45, current: -6 },
          ],
          markerStyle: {
            width: 20,
            height: 20,
            borderRadius: 20,
            color: ComponentTokens.SynColorNeutral400.light,
          },
        });
  });
</script>
```
