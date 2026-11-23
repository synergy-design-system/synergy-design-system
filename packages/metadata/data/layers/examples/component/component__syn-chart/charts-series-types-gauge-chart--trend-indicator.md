## Trend Indicator

Use trend.show: true together with trend.value to render a small pill trend indicator above the gauge value; set trend.direction to 'up' (default) or 'down' to control the directional icon, and optionally provide trend.iconUp or trend.iconDown with a custom data URL to replace the default icons.

```html
<syn-chart id="gauge-trend"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#gauge-trend");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesGauge({
        trend: {
          show: true,
          value: "5",
        },
        value: 80,
      });
  });
</script>
```
