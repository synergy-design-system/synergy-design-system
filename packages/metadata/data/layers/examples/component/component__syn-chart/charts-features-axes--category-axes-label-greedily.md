## Category Axes Label Greedily

The default behavior of ECharts for justifiying axes labels is to avoid overlapping.This default behavior can hide more labels than necessary even when some space is still available. If you want labels to be placed more greedily, use axisLabel.interval = 0 together with hideOverlap: true. This distributes the available space greedily from left to right on horizontal axes and from top to bottom on vertical axes. If a label does not fit into its slot, the space is released for the next tick, and labels are rendered either completely or not at all. This does only work for axis of type category.

```html
<div style="display: flex; margin-bottom: var(--syn-spacing-large)">
  <syn-select
    style="width: 300px"
    value="greedily"
    label="Axes label justification"
    id="x-axis-greedily"
  >
    <syn-option value="greedily">Space greedily</syn-option>
    <syn-option value="default">Default</syn-option>
  </syn-select>
</div>
<syn-chart style="max-width: 450px" id="chart-axis-greedily"></syn-chart>
<script type="module">
  const setConfig = (select) => {
    const charts = document.querySelectorAll("#chart-axis-greedily");
    charts.forEach((chart) => {
      let axisLabel;

      if (select.value === "greedily") {
        axisLabel = {
          interval: 0,
          hideOverlap: true,
        };
      }

      const baseConfig = {
        series: [
          { data: [1500, 2300, 2541, 2184, 1352, 1479, 2605], type: "line" },
        ],
        xAxis: {
          data: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          name: "Days",
          type: "category",
          axisLabel: {
            ...axisLabel,
          },
        },
        yAxis: {
          name: "Values",
          type: "value",
        },
      };

      chart.config = (handle) =>
        handle.baseConfig(baseConfig).axesShowSplitLines();
    });
  };

  const selects = document.querySelectorAll("#x-axis-greedily");

  selects.forEach((select) => {
    select.addEventListener("syn-change", () => {
      setConfig(select);
    });
    setConfig(select);
  });
</script>
```
