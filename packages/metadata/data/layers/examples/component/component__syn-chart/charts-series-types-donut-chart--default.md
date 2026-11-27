## Default

The donut chart can either be configured via config with type: 'synDonut' or with the seriesDonut preset function.

```html
<syn-chart id="donut-series-preset"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#donut-series-preset");

  charts.forEach((chart) => {
    chart.config = {
      series: [
        {
          type: "synDonut",
          data: [10, 20, 30, 40],
        },
      ],
    };
  });
</script>
```
