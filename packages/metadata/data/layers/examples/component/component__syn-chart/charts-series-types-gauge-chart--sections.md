## Sections

The gauge series supports showing an outer sections ring. Use sections.show: true together with sections.boundaries or sections.colors to render a color-coded outer ring around the gauge, where each adjacent pair of boundary values defines a segment. When no progressColor is set, the progress arc automatically adopts the color of the segment containing the current value.

```html
<syn-chart id="gauge-sections"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#gauge-sections");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesGauge({
        sections: {
          boundaries: [0, 20, 70, 100],
          show: true,
        },
        value: 80,
      });
  });
</script>
```
