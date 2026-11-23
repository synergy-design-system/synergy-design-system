## Large Data Set

A histogram summarizes large datasets by grouping values into bins. In image processing, the bins can represent grayscale intensities from 0 (black) to 255 (white), and each bar shows the number of pixels at that intensity.

```html
<syn-chart id="histogram-image-processing"></syn-chart>
<script type="module">
  const charts = document.querySelectorAll("#histogram-image-processing");
  const binCount = 290;
  const intensities = Array.from({ length: binCount }, (_, intensity) =>
    String(intensity),
  );
  // Model an image with shadow, midtone, and highlight regions.
  const frequencies = Array.from({ length: binCount }, (_, intensity) => {
    const shadows = 9000 * Math.exp(-0.5 * ((intensity - 42) / 18) ** 2);
    const midtones = 14000 * Math.exp(-0.5 * ((intensity - 128) / 30) ** 2);
    const highlights = 6500 * Math.exp(-0.5 * ((intensity - 214) / 22) ** 2);
    return Math.round(shadows + midtones + highlights);
  });

  const baseConfig = {
    xAxis: {
      data: intensities,
      name: "Grayscale intensity (0-255)",
      type: "category",
    },
    yAxis: {
      name: "Pixel frequency",
    },
  };

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.baseConfig(baseConfig).seriesHistogram([
        {
          data: frequencies,
          barCategoryGap: 0,
        },
      ]);
  });
</script>
```
