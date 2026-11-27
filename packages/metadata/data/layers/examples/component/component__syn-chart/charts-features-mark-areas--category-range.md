## Category Range

Add xAxis category values to the two points in markArea.data to highlight a range of categories. You can define multiple areas to call out separate periods and give each area a name for context.

```html
<syn-chart id="mark-area-category-ranges"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#mark-area-category-ranges");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "category",
            name: "Days",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesLine([
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            markArea: {
              data: [
                [
                  {
                    xAxis: "Mon",
                    name: "Low activity",
                    label: { position: "insideTop" },
                  },
                  { xAxis: "Tue" },
                ],
                [
                  {
                    xAxis: "Fri",
                    name: "High activity",
                    label: { position: "insideTop" },
                  },
                  { xAxis: "Sun" },
                ],
              ],
            },
          },
        ]);
  });
</script>
```
