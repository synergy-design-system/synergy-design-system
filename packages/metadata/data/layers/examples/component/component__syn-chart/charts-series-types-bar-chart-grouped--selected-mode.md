## Selected Mode

Selection is disabled by default. Set selectedMode to true or 'single' to select one data item at a time, 'multiple' to select multiple data items, or 'series' to select an entire series.

```html
<syn-chart id="bar-series-grouped-selected-mode"></syn-chart>
<div class="selected-container syn-body--small">
  <div>Select a bar to see the selections here:</div>
  <div id="bar-series-grouped-selected-info" class="syn-body--x-small"></div>
</div>
<script type="module">
  const charts = document.querySelectorAll("#bar-series-grouped-selected-mode");
  const selectedInfos = document.querySelectorAll(
    "#bar-series-grouped-selected-info",
  );

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

  const data = [
    {
      selectedMode: true,
      data: [120, 180, 150, 80, 70, 110, 130],
      name: "Single / True",
    },
    {
      selectedMode: "series",
      data: [80, 130, 100, 70, 90, 160, 140],
      name: "Series",
    },
    {
      selectedMode: "multiple",
      data: [90, 120, 140, 100, 110, 70, 60],
      name: "Multiple",
    },
  ];

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesBar(data).legendShow();

    const instance = chart.getInstance();
    instance.on("selectchanged", ({ selected }) => {
      selectedInfos.forEach((selectedInfo) => {
        selectedInfo.innerHTML = "";
        if (selectedInfo) {
          const selections = selected.map((item) => ({
            dataIndex: item.dataIndex,
            seriesIndex: item.seriesIndex,
          }));
          selections.forEach((item) => {
            const seriesName = document.createElement("div");
            const seriesValue = document.createElement("div");
            const selectedValues = item.dataIndex.map(
              (index) =>
                baseConfig.xAxis.data[index] +
                " (" +
                data[item.seriesIndex].data[index] +
                ")",
            );
            seriesName.textContent = data[item.seriesIndex].name + ": ";
            seriesValue.textContent = selectedValues.join(", ");
            selectedInfo.appendChild(seriesName);
            selectedInfo.appendChild(seriesValue);
          });
        }
      });
    });
  });
</script>
<style>
  .selected-container {
    border: 1px solid var(--syn-panel-border-color);
    background-color: var(--syn-panel-background-color);
    height: 80px;
  }
  #bar-series-grouped-selected-info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: var(--syn-spacing-2x-small) var(--syn-spacing-small);
  }
</style>
```
