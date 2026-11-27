## Icon

Use the icon option to render an SVG image below the unit label, or below the value when no unit is set.

```html
<syn-chart id="gauge-icon"></syn-chart>
<script type="module">
  // Import the formatter from the chart utilities
  //import { formatter } from '@synergy-design-system/components/components/chart/index.js';
  // Import the getIconDataURL utility from the icon-library module.
  // import { getIconDataURL } from '@synergy-design-system/components/utilities/icon-library.js'.

  const icon = await getIconDataURL("device_thermostat");
  const charts = document.querySelectorAll("#gauge-icon");

  charts.forEach((chart) => {
    chart.config = (handle) =>
      handle.seriesGauge({
        icon,
        sections: {
          show: true,
        },
        value: 80,
        formatter: {
          max: formatter.unitFormatter("°C"),
          min: formatter.unitFormatter("°C"),
          value: formatter.unitFormatter("°C"),
        },
      });
  });
</script>
```
