## Value Formatting

The gauge series supports custom value formatting using formatter.value, formatter.min, and formatter.max options.

```html
<syn-chart id="gauge-formatter"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#gauge-formatter");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesGauge({
        value: 80,
        formatter: {
          max: (value) =>
            Intl.NumberFormat(undefined, { minimumFractionDigits: 3 }).format(
              value,
            ),
          min: (value) =>
            Intl.NumberFormat(undefined, { minimumFractionDigits: 3 }).format(
              value,
            ),
          value: (value) =>
            Intl.NumberFormat(undefined, { minimumFractionDigits: 2 }).format(
              value,
            ),
        },
      });
  });
</script>
```
