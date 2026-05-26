## Default

The default story demonstrates a basic line chart configuration. The chart is configured via the option property, which accepts an object that maps directly to the ECharts option configuration.

```html
<syn-chart id="chart-default"></syn-chart>

<script type="module">
  const charts = document.querySelectorAll("#chart-default");
  charts.forEach((chart) => {
    const option = {
      series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        type: "category",
      },
      yAxis: { type: "value" },
    };
    chart.config = option;
  });
</script>
```

---

## Config

The config property is the main way to configure the chart. It accepts an object that maps 1:1 to the ECharts option configuration. Assigning a new object to this property will update the chart with the new configuration.

```html
<syn-chart id="chart-config"></syn-chart>
<script type="module">
  const chart = document.querySelector("#chart-config");
  chart.config = {
    series: [{ data: [150, 230, 224], type: "line" }],
    xAxis: { data: ["Mon", "Tue", "Wed"], type: "category" },
    yAxis: { type: "value" },
  };
</script>
```

---

## Palette

Use the palette attribute to apply a Synergy design token color palette to chart series. categorical (12 distinct colors for comparing unrelated data series), sequential-01–sequential-07 (10-step single-hue ramps), and sequential-status-critical/error/info/success/warning (10-step status ramps). If option.color is explicitly set, it takes precedence over the palette attribute.

```html
<syn-chart id="chart-palette" palette="sequential-02"></syn-chart>
<script type="module">
  const chart = document.querySelector("#chart-palette");
  chart.config = {
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        name: "Series A",
        type: "line",
      },
      {
        data: [80, 130, 180, 100, 90, 120, 200],
        name: "Series B",
        type: "line",
      },
      {
        data: [200, 160, 140, 170, 210, 180, 150],
        name: "Series C",
        type: "line",
      },
      {
        data: [100, 120, 150, 80, 70, 110, 130],
        name: "Series D",
        type: "line",
      },
      {
        data: [180, 200, 170, 190, 220, 210, 240],
        name: "Series E",
        type: "line",
      },
      {
        data: [90, 110, 130, 70, 60, 100, 120],
        name: "Series F",
        type: "line",
      },
      {
        data: [160, 190, 150, 200, 230, 220, 250],
        name: "Series G",
        type: "line",
      },
    ],
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
    },
    yAxis: { type: "value" },
  };
</script>
```

---

## Get Instance

Use getInstance() to access the underlying ECharts instance directly and work with its full native API. This is useful when the option property alone is not sufficient — for example to listen to ECharts events, trigger actions, or call setOption() with custom merge behavior. This example attaches a click listener via the native ECharts API. Click any data point to see the event payload logged to the browser console.

```html
<syn-chart id="chart-get-instance"></syn-chart>
<p
  style="
    color: var(--syn-color-neutral-600);
    font-size: 0.875rem;
    margin-top: 1rem;
  "
>
  Open the browser console and click a data point to see the native ECharts
  event payload.
</p>
<script type="module">
  const chart = document.querySelector("#chart-get-instance");
  chart.config = {
    series: [{ data: [150, 230, 224, 218, 135, 147, 260], type: "line" }],
    tooltip: { trigger: "item" },
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
    },
    yAxis: { type: "value" },
  };
  const chartInstance = chart.getInstance();
  chartInstance.on("click", (params) =>
    console.log("ECharts click event:", params),
  );
</script>
```

---

## Multiple Charts With Different Palettes

You can use multiple charts in one <syn-chart> instance, each with its own configuration. The palette colors or the default colors can be overridden per series item using the color property directly on the series object — allowing fine-grained control over individual chart series colors.Important: The color property does not support CSS variables (e.g. var(--syn-sequential-05-80)). This is a limitation of ECharts itself: ECharts renders via the Canvas API, which does not resolve CSS custom properties. To use Synergy design tokens as colors, read the computed hex value first using getComputedStyle(document.documentElement).getPropertyValue('--your-token').trim() and pass the resolved value instead.

```html
<syn-chart id="chart-multiple-charts" palette="categorical"></syn-chart>
<script type="module">
  const chart = document.querySelector("#chart-multiple-charts");

  const getHexValueFromVariable = (val) =>
    getComputedStyle(document.documentElement).getPropertyValue(val).trim();

  chart.config = {
    series: [
      {
        data: [160, 185, 180, 175, 150, 160, 190],
        name: "Series A",
        type: "line",
      },
      {
        data: [170, 165, 155, 168, 180, 170, 158],
        name: "Series B",
        type: "line",
      },
      {
        data: [165, 175, 158, 172, 182, 175, 185],
        name: "Series C",
        type: "line",
      },
      {
        color: [getHexValueFromVariable("--syn-sequential-05-80")],
        data: [80, 60, 90, 50, 70, 55, 85],
        name: "Series D",
        type: "line",
      },
      {
        color: [getHexValueFromVariable("--syn-sequential-05-60")],
        data: [65, 75, 55, 80, 45, 70, 60],
        name: "Series E",
        type: "line",
      },
      {
        color: [getHexValueFromVariable("--syn-sequential-05-40")],
        data: [50, 70, 60, 45, 55, 65, 75],
        name: "Series F",
        type: "line",
      },
    ],
    xAxis: {
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      type: "category",
    },
    yAxis: { type: "value" },
  };
</script>
```
