## No Gap

Set gap to 0 to render no gap between the segments. Additionally a custom icon can be added to the inner circle via icon option.

```html
<syn-chart id="segment-no-gap"></syn-chart>
<script type="module">
  // Import getIconDataURL from '@synergy-design-system/components/utilities/icon-library.js'.
  const icon = await getIconDataURL("device_thermostat");
  const charts = document.querySelectorAll("#segment-no-gap");
  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesSegment({
        data: [90, 100, 20, 10, 50, 90, 10, 0, 20, 10, 30, 70, 40, 10, 30, 20],
        gap: 0,
        icon,
      });
  });
</script>
```
