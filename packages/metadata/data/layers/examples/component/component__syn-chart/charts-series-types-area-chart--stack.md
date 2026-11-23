## Stack

The stack value names a stack group. Area series with the same stack value on the same category axis are stacked on top of one another. Use stackStrategy to control how values are accumulated:- samesign stacks a value only when it has the same sign as the current stack total (default)- all stacks values regardless of whether they are positive or negative- positive stacks only positive values- negative stacks only negative values

```html
<div
  style="
    display: grid;
    grid-template-columns: 50% 50%;
    gap: var(--syn-spacing-medium);
  "
>
  <div style="min-width: 0">
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)">
      Stack strategy: samesign
    </span>
    <syn-chart
      class="area-series-stack"
      data-stack-strategy="samesign"
    ></syn-chart>
  </div>

  <div style="min-width: 0">
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)">
      Stack strategy: all
    </span>
    <syn-chart class="area-series-stack" data-stack-strategy="all"></syn-chart>
  </div>

  <div style="min-width: 0">
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)">
      Stack strategy: positive
    </span>
    <syn-chart
      class="area-series-stack"
      data-stack-strategy="positive"
    ></syn-chart>
  </div>

  <div style="min-width: 0">
    <span style="display: block; margin-bottom: var(--syn-spacing-medium)">
      Stack strategy: negative
    </span>
    <syn-chart
      class="area-series-stack"
      data-stack-strategy="negative"
    ></syn-chart>
  </div>
</div>
<script type="module">
  const charts = document.querySelectorAll(".area-series-stack");
  const seriesData = [
    [400, -400, 400, -400],
    [200, -200, -200, 200],
  ];

  charts.forEach((chart) => {
    const stackStrategy = chart.dataset.stackStrategy;

    chart.config = (handle) =>
      handle
        .baseConfig({
          xAxis: {
            data: [
              "Both positive",
              "Both negative",
              "1. positive, 2. negative",
              "1. negative, 2. positive",
            ],
            type: "category",
            name: "Days",
            axisLabel: {
              interval: 0,
              width: 70,
              overflow: "break",
            },
          },
          yAxis: { min: -1000, max: 1000, type: "value", name: "Values" },
        })
        .seriesArea(
          seriesData.map((data, index) => ({
            data,
            name: "Series " + (index + 1),
            stack: "total",
            stackStrategy,
          })),
        )
        .legendShow();
  });
</script>
```
