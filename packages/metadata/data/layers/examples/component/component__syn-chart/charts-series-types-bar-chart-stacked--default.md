## Default

Configure a stacked bar chart with type: 'bar' and a shared stack identifier or use the seriesBarStacked preset function. Showing labels is recommended and their color should inherit the series color. Place labels to the left for vertical bars and above for horizontal bars. A 1 px border is recommended to better distinguish adjacent bar segments. The seriesBarStacked preset applies these label and border settings by default. It also sets barCategoryGap to control the spacing between category groups and barMinWidth to keep bars from becoming too narrow. These defaults help maintain readability, but cannot compensate for too little chart space or long value labels.

```html
<syn-chart id="bar-stacked-default"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-stacked-default");

  charts.forEach((chart) => {
    chart.config = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        name: "Values",
      },
      series: [
        {
          data: [120, 180, 150, 80, 70, 110, 130],
          type: "bar",
          stack: "total",
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 1,
          },
          barMinWidth: 12,
          barCategoryGap: 32,
          label: {
            color: "inherit",
            position: "left",
            show: true,
          },
        },
        {
          data: [80, 130, 100, 70, 90, 160, 140],
          type: "bar",
          stack: "total",
          barMinWidth: 12,
          barCategoryGap: 32,
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 1,
          },
          label: {
            color: "inherit",
            position: "left",
            show: true,
          },
        },
        {
          data: [90, 120, 140, 100, 110, 70, 60],
          type: "bar",
          stack: "total",
          barMinWidth: 12,
          barCategoryGap: 32,
          itemStyle: {
            borderColor: "transparent",
            borderWidth: 1,
          },
          label: {
            color: "inherit",
            position: "left",
            show: true,
          },
        },
      ],
    };
  });
</script>
```
