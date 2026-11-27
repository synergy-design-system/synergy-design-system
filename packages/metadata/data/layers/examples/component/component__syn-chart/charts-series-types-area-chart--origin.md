## Origin

Use the areaStyle.origin option to choose the baseline from which an area is filled. Valid values:- auto fills the area between the axis line and the data (default).- start fills between the minimum axis value and the data.- end fills between the maximum axis value and the data.- A number fills between that specified value and the data.

```html
<div
  style="
    display: grid;
    grid-template-columns: 50% 50%;
    gap: var(--syn-spacing-medium);
  "
>
  <div>
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)"
      >Origin: auto</span
    >
    <syn-chart class="area-series-origin" data-origin='"auto"'></syn-chart>
  </div>

  <div>
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)"
      >Origin: start</span
    >
    <syn-chart class="area-series-origin" data-origin='"start"'></syn-chart>
  </div>

  <div>
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)"
      >Origin: end</span
    >
    <syn-chart class="area-series-origin" data-origin='"end"'></syn-chart>
  </div>

  <div>
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)"
      >Origin: 500</span
    >
    <syn-chart class="area-series-origin" data-origin="500"></syn-chart>
  </div>
</div>
<script type="module">
  const charts = document.querySelectorAll(".area-series-origin");

  charts.forEach((chart) => {
    const origin = JSON.parse(chart.dataset.origin);

    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            type: "category",
            name: "Days",
          },
          yAxis: { type: "value", name: "Values" },
        })
        .seriesArea([
          {
            areaStyle: { origin },
            data: [-620, -320, 200, 734, 1090, 530, -120],
          },
        ]);
  });
</script>
```
