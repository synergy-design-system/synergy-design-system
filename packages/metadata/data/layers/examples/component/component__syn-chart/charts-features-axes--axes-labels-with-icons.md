## Axes Labels With Icons

To add icons to axis labels, use the handle methods axesAddXLabelIcons() and axesAddYLabelIcons().

```html
<div class="controls">
  <syn-select
    value="top"
    label="x-axis icon position"
    id="x-axis-icon-position"
  >
    <syn-option value="top">Top</syn-option>
    <syn-option value="bottom">Bottom</syn-option>
  </syn-select>
  <syn-select
    value="left"
    label="y-axis icon position"
    id="y-axis-icon-position"
  >
    <syn-option value="left">Left</syn-option>
    <syn-option value="right">Right</syn-option>
  </syn-select>
</div>
<syn-chart id="chart-axis-prefix-icons"></syn-chart>
<script type="module">
  const XAXIS_ICONS = [
    "calendar_today",
    "event_available",
    "schedule",
    "event_note",
    "event_upcoming",
    "weekend",
    "sunny",
  ];
  const YAXIS_ICONS = [
    "wallpaper",
    "tune",
    "watch",
    "format_paint",
    "brush",
    "gradient",
    "format_color_reset",
  ];

  let yAxisIconUrls = [];
  let xAxisIconUrls = [];

  const fetchIcons = async () => {
    xAxisIconUrls = await Promise.all(
      XAXIS_ICONS.map(async (iconName) => {
        const svg = await fetch("/assets/sick2025/" + iconName + ".svg").then(
          (r) => r.text(),
        );
        return "data:image/svg+xml;base64," + btoa(svg);
      }),
    );
    yAxisIconUrls = await Promise.all(
      YAXIS_ICONS.map(async (iconName) => {
        const svg = await fetch("/assets/sick2025/" + iconName + ".svg").then(
          (r) => r.text(),
        );
        return "data:image/svg+xml;base64," + btoa(svg);
      }),
    );
  };

  const xAxisIconPositionSelect = document.querySelector(
    "#x-axis-icon-position",
  );
  const yAxisIconPositionSelect = document.querySelector(
    "#y-axis-icon-position",
  );

  const setConfig = async () => {
    const baseConfig = {
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        name: "Days",
        type: "category",
      },
      yAxis: {
        name: "Values",
        type: "value",
      },
    };

    const yAxisIconPosition = yAxisIconPositionSelect.value;
    const xAxisIconPosition = xAxisIconPositionSelect.value;

    const charts = document.querySelectorAll("#chart-axis-prefix-icons");
    charts.forEach((chart) => {
      chart.config = (handle) =>
        handle
          .baseConfig(baseConfig)
          .axesShowSplitLines()
          .axesAddXLabelIcons({
            iconUrls: xAxisIconUrls,
            iconPosition: xAxisIconPosition,
          })
          .axesAddYLabelIcons({
            iconUrls: yAxisIconUrls,
            iconPosition: yAxisIconPosition,
          });
    });
  };

  fetchIcons().then(setConfig);
  xAxisIconPositionSelect.addEventListener("syn-change", setConfig);
  yAxisIconPositionSelect.addEventListener("syn-change", setConfig);
</script>
<style>
  .controls {
    display: flex;
    gap: var(--syn-spacing-large);
    margin-bottom: var(--syn-spacing-large);
  }
</style>
```
