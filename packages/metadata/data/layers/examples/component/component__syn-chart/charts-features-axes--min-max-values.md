## Min Max Values

The default min and max values of the axes are calculated automatically based on the data. The min and max values can be set manually by using the min and max options for the axes.

```html
<div
  style="
    display: flex;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-large);
  "
>
  <syn-input
    type="number"
    id="x-axis-min-value"
    label="X-Axis min value"
  ></syn-input>
  <syn-input
    type="number"
    id="x-axis-max-value"
    label="X-Axis max value"
  ></syn-input>
  <syn-input
    type="number"
    id="y-axis-min-value"
    label="Y-Axis min value"
  ></syn-input>
  <syn-input
    type="number"
    id="y-axis-max-value"
    label="Y-Axis max value"
  ></syn-input>
</div>
<syn-chart id="chart-min-max"></syn-chart>
<script type="module">
  const xAxisMinInput = document.querySelector("#x-axis-min-value");
  const xAxisMaxInput = document.querySelector("#x-axis-max-value");
  const yAxisMinInput = document.querySelector("#y-axis-min-value");
  const yAxisMaxInput = document.querySelector("#y-axis-max-value");

  xAxisMinInput.addEventListener("syn-change", () => {
    setConfig();
  });
  xAxisMaxInput.addEventListener("syn-change", () => {
    setConfig();
  });
  yAxisMinInput.addEventListener("syn-change", () => {
    setConfig();
  });
  yAxisMaxInput.addEventListener("syn-change", () => {
    setConfig();
  });

  const setConfig = () => {
    const baseConfig = {
      series: [
        {
          data: [
            [-100, -150],
            [-50, 230],
            [0, 224],
            [50, -218],
            [100, 135],
            [150, 147],
            [200, 260],
          ],
          type: "line",
        },
      ],
      xAxis: {
        data: [-100, -50, 0, 50, 100, 150, 200],
        name: "Days",
        type: "value",
        min: xAxisMinInput.value ? parseFloat(xAxisMinInput.value) : undefined,
        max: xAxisMaxInput.value ? parseFloat(xAxisMaxInput.value) : undefined,
      },
      yAxis: {
        name: "Values",
        type: "value",
        min: yAxisMinInput.value ? parseFloat(yAxisMinInput.value) : undefined,
        max: yAxisMaxInput.value ? parseFloat(yAxisMaxInput.value) : undefined,
      },
    };

    const charts = document.querySelectorAll("#chart-min-max");
    charts.forEach((chart) => {
      chart.config = (handle) =>
        handle.baseConfig(baseConfig).axesShowSplitLines();
    });
  };

  setConfig();
</script>
```
