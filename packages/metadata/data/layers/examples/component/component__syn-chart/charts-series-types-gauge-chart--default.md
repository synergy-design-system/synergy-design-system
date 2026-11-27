## Default

The gauge chart can either be configured via config with type: 'synGauge' or with the seriesGauge preset function.

```html
<syn-chart id="gauge-series-preset"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#gauge-series-preset");

  charts.forEach((chart) => {
    chart.config = {
      series: [
        {
          type: "synGauge",
          data: [45],
        },
      ],
    };
  });
</script>
```
