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
  const xAxisIconPositionSelect = document.querySelector(
    "#x-axis-icon-position",
  );
  const yAxisIconPositionSelect = document.querySelector(
    "#y-axis-icon-position",
  );

  // Import getIconDataURL from '@synergy-design-system/components/utilities/icon-library.js'.
  const [xAxisIconUrls, yAxisIconUrls] = await Promise.all([
    Promise.all(
      [
        "calendar_today",
        "event_available",
        "schedule",
        "event_note",
        "event_upcoming",
        "weekend",
        "sunny",
      ].map((icon) => getIconDataURL(icon)),
    ),
    Promise.all(
      [
        "wallpaper",
        "tune",
        "watch",
        "format_paint",
        "brush",
        "gradient",
        "format_color_reset",
      ].map((icon) => getIconDataURL(icon)),
    ),
  ]);

  const setConfig = () => {
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

  setConfig();
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
