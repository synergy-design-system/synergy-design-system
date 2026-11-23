## Axes Label Formatting

The axes labels can be formatted via the axisLabel.formatter option. You can customize the formatting to display the labels in a way that best suits your data and visualization needs. We provide predefined formatting functions like unitFormatter, numberFormatter and numberShorthandFormatter.

```html
<div style="display: flex; margin-bottom: var(--syn-spacing-large)">
  <syn-select
    style="width: 300px"
    value="celsius"
    label="Label formatter"
    id="y-axis-formatter"
  >
    <syn-option value="celsius">Unit °C formatter</syn-option>
    <syn-option value="local">Local formatter</syn-option>
    <syn-option value="shorthand">Shorthand labels formatter</syn-option>
    <syn-option value="shorthand-min"
      >Shorthand labels with min fraction formatter</syn-option
    >
    <syn-option value="number-min-max"
      >Number with min / max fraction formatter</syn-option
    >
    <syn-option value="chain">Chain multiple formatter</syn-option>
    <syn-option value="none">No formatter</syn-option>
  </syn-select>
</div>
<syn-chart id="chart-axis-label-formatter"></syn-chart>
<script type="module">
  // Import the formatter from the chart utilities
  // import { formatter } from '@synergy-design-system/components/components/chart/index.js';

  const setConfig = (formatterSelect) => {
    let labelFormatter;
    switch (formatterSelect.value) {
      case "celsius":
        labelFormatter = formatter.unitFormatter("°C");
        break;
      case "shorthand":
        labelFormatter = formatter.numberShorthandFormatter();
        break;
      case "shorthand-min":
        labelFormatter = formatter.numberShorthandFormatter(undefined, {
          minimumFractionDigits: 2,
        });
        break;
      case "number-min-max":
        labelFormatter = formatter.numberFormatter(undefined, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
        });
        break;
      case "chain":
        labelFormatter = (value) =>
          formatter.unitFormatter("°C")(
            formatter.numberShorthandFormatter("en-GB")(value),
          );
        break;
      default:
        labelFormatter = undefined;
        break;
    }

    const baseConfig = {
      series: [
        { data: [1500, 2300, 2242, 2184, 1352, 1479, 2605], type: "line" },
      ],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        name: "Days",
        type: "category",
      },
      yAxis: {
        name: "Values",
        type: "value",
        axisLabel: {
          formatter: labelFormatter,
        },
      },
    };

    const charts = document.querySelectorAll("#chart-axis-label-formatter");
    charts.forEach((chart) => {
      chart.config = (handle) =>
        handle.baseConfig(baseConfig).axesShowSplitLines();
    });
  };

  const selectFormatters = document.querySelectorAll("#y-axis-formatter");

  selectFormatters.forEach((select) => {
    select.addEventListener("syn-change", () => {
      setConfig(select);
    });
    setConfig(select);
  });
</script>
```
