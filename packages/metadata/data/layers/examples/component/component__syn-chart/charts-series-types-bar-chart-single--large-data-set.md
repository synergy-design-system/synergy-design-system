## Large Data Set

Set large: true to enable optimized rendering when a bar series contains many data points. The optimization is used once the number of items reaches largeThreshold (400 by default). Individual data-item styles cannot be customized while large rendering is active, so use it when rendering performance matters more than per-item styling.

```html
<div
  style="
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: var(--syn-spacing-medium);
    margin-bottom: var(--syn-spacing-small);
  "
>
  <syn-switch id="bar-chart-single-large-toggle" checked=""
    >Optimize rendering</syn-switch
  >
  <span id="bar-chart-single-large-status" class="syn-body--medium"></span>
</div>
<syn-chart id="bar-chart-single-large-data"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#bar-chart-single-large-data");
  const largeToggles = document.querySelectorAll(
    "#bar-chart-single-large-toggle",
  );
  const statuses = document.querySelectorAll("#bar-chart-single-large-status");
  const length = 4e4;
  const categories = Array.from({ length }, (_, index) => String(index + 1));
  const segmentSize = 2000;
  const levels = [
    5000, 4500, 5300, 6100, 3900, 6800, 7200, 8600, 9000, 7000, 5900, 4500,
    4100, 5000, 5800, 6500, 6000, 5200, 4200, 3600, 4000,
  ];
  // Interpolate the trend levels and add deterministic variation to each data point.
  const values = Array.from({ length }, (_, index) => {
    const segment = Math.floor(index / segmentSize);
    const progress = (index % segmentSize) / segmentSize;
    const level =
      levels[segment] + (levels[segment + 1] - levels[segment]) * progress;
    const variation =
      Math.sin(index * 0.7548776662) * 700 +
      Math.sin(index * 1.3247179572 + 0.3) * 800 +
      Math.sin(index * 2.4142135624 + 0.7) * 300 +
      Math.sin(index * 4.123105626 + 1.1) * 200;
    return Math.max(0, Math.round(level + variation));
  });

  const baseConfig = {
    xAxis: {
      data: categories,
      name: "Category",
      type: "category",
    },
    yAxis: {
      name: "Values",
    },
    dataZoom: [
      {
        type: "slider",
      },
    ],
    grid: {
      bottom: 120,
    },
  };

  largeToggles.forEach((largeToggle, index) => {
    const chart = charts[index];
    const status = statuses[index];
    if (!chart || !status) return;

    const updateChart = () => {
      const large = largeToggle.checked;
      status.textContent = large
        ? "Performance optimization: enabled"
        : "Performance optimization: disabled";
      chart.config = (handle) =>
        handle.baseConfig(baseConfig).seriesBar([
          {
            data: values,
            large,
            largeThreshold: 1000,
          },
        ]);
    };

    largeToggle.addEventListener("syn-change", updateChart);
    updateChart();
  });
</script>
```
