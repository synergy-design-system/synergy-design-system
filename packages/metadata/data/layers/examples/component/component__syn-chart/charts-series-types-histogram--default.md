## Default

Configure a histogram with a series of type: 'bar' and set barMaxWidth to '100%' to let bars fill the available category space or use the seriesHistogram preset for the recommended configuration.

```html
<syn-chart id="histogram-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-default");

  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        name: "Value Range",
        type: "category",
        data: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60"],
      },
      yAxis: {
        name: "Frequency",
      },
      series: [
        {
          data: [2, 8, 17, 14, 6, 3],
          type: "bar",
          barMaxWidth: "100%",
        },
      ],
    };
  });
</script>
```
