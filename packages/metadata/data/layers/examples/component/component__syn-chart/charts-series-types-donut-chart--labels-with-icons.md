## Labels With Icons

Use the label option to render a label for each segment, aligned by index with data. Each label is centered on its segment and placed outside the outer ring; provide a prefixIcon data URL alongside the label to render an icon before the label.

```html
<syn-chart id="donut-labels"></syn-chart>
<script type="module">
  // Register a custom icon library for chart framework icons.
  registerIconLibrary("chart-frameworks", {
    resolver: (name) => "/framework-icons/" + name + ".svg",
  });
  // Custom icons use a named library registered with the components icon-library utility.
  const [angularIcon, reactIcon, vueIcon] = await Promise.all([
    getIconDataURL("angular", "chart-frameworks"),
    getIconDataURL("react", "chart-frameworks"),
    getIconDataURL("vue", "chart-frameworks"),
  ]);
  const charts = document.querySelectorAll("#donut-labels");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesDonut({
        data: [
          {
            value: 421,
            label: "Angular",
            prefixIcon: angularIcon,
          },
          {
            value: 552,
            label: "React",
            prefixIcon: reactIcon,
          },
          {
            value: 36,
            label: "Vue",
            prefixIcon: vueIcon,
          },
        ],
      });
  });
</script>
```
