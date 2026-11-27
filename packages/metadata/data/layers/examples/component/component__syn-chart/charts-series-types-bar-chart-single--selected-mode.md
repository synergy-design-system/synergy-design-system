## Selected Mode

Selection is disabled by default. Set selectedMode to true or 'single' to select one data item at a time, 'multiple' to select multiple data items, or 'series' to select an entire series.

```html
<syn-chart id="bar-series-single-selected-mode"></syn-chart>
<div class="syn-body--medium">
  Selected day: <span id="bar-series-selected-day">-</span>
</div>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-single-selected-mode");
  const status = document.querySelectorAll("#bar-series-selected-day");
  const values = [120, 180, 150, 80, 70, 110, 130];
  const baseConfig = {
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      name: "Days",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar([
        {
          data: values,
          selectedMode: "single",
        },
      ]);

    const instance = chart.getInstance();
    instance.on("selectchanged", ({ selected }) => {
      const selectedIndex = selected.flatMap((item) => item.dataIndex)[0];
      status.forEach((el) => {
        el.textContent =
          selectedIndex !== undefined
            ? baseConfig.xAxis.data[selectedIndex] +
              " (" +
              values[selectedIndex] +
              ")"
            : "-";
      });
    });
  });
</script>
```
