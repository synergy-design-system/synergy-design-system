# `<syn-chart>` – Charting Component

> ⚠️ **Experimental**
>
> `syn-chart` is currently **experimental**. The API may change in future releases without prior notice.
> Use it with caution in production environments and expect potential breaking changes.

---

## Overview

`<syn-chart>` is a web component that provides a structured, consistently styled container for rendering charts inside the Synergy Design System. It is a thin, opinionated wrapper around [Apache ECharts](https://echarts.apache.org), which handles all rendering internally.

> ⚠️ **Theme Compatibility**
>
> Chart design tokens are only available for the **sick2025** theme and are **not supported** by the sick2018 theme.

## Based on Apache ECharts

`syn-chart` is powered by **[Apache ECharts](https://echarts.apache.org)**.

- Full ECharts option documentation: https://echarts.apache.org/en/option.html
- ECharts instance API: https://echarts.apache.org/en/api.html#echartsInstance

All chart configuration is passed directly through the `config` property, which maps 1:1 to ECharts' `setOption()` call.

---

## Installation

The component is part of the `@synergy-design-system/components` package:

```bash
npm install @synergy-design-system/components
# or
pnpm add @synergy-design-system/components
```

The chart component is shipped as a **separate entrypoint** for all packages and framework wrappers to avoid bundling the echarts dependency unless it is actually needed.

> **Note:** `echarts` is a **required peer dependency** and must be installed separately:
>
> ```bash
> npm install echarts
> # or
> pnpm add echarts
> ```
>
> If `echarts` is missing, the following error will appear in the console when the component is used:
>
> ```
> Error: Could not resolve "echarts/core.js" imported by "@synergy-design-system/components". Is it installed?
> ```

### Token Import

> Component tokens and chart tokens must be imported in your application for the chart to render correctly with the Synergy theme:
>
> ```js
> // Import tokens FIRST, before any component initialization
> import "@synergy-design-system/tokens/themes/light.css";
> import "@synergy-design-system/tokens/charts/themes/light.css";
> // Then import other files and initialize your app
> ```

> ⚠️ **Important**
>
> Token files must be imported **before** your application is initialized to ensure the default Synergy theme is loaded correctly for the chart component.
> Therefore add these imports at the very beginning of your application entry point.

---

## Usage

### Vanilla HTML / Web Component

```html
<syn-chart id="my-chart"></syn-chart>

<script type="module">
  import "@synergy-design-system/components/components/chart/chart.js";

  const chart = document.getElementById("my-chart");
  chart.config = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [150, 230, 224, 218, 135] }],
  };
</script>
```

### React

#### Full react wrapper

```tsx
import { SynChart } from "@synergy-design-system/react/components/chart.js";
import type { ECConfig } from "@synergy-design-system/components/components/chart/types.js";

const config: ECConfig = {
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { type: "value" },
  series: [{ type: "line", data: [150, 230, 224, 218, 135] }],
};

export default function App() {
  return <SynChart config={config} />;
}
```

#### Native web components with react types (version >= 19)

```tsx
import "@synergy-design-system/components/components/chart/chart.js";
import type { ECConfig } from "@synergy-design-system/components/components/chart/types.js";

const config: ECConfig = {
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
  yAxis: { type: "value" },
  series: [{ type: "line", data: [150, 230, 224, 218, 135] }],
};

export default function App() {
  return <syn-chart config={config}></syn-chart>;
}
```

### Vue

```ts
<script setup lang="ts">
import { SynVueChart } from '@synergy-design-system/vue/chart';
import type { ECConfig } from '@synergy-design-system/components/components/chart/types.js';

const config: ECConfig = {
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [150, 230, 224, 218, 135] }],
};
</script>

<template>
  <SynVueChart :config="config" />
</template>
```

### Angular

```ts
import { SynChartComponent } from "@synergy-design-system/angular/components/chart";
import type { ECConfig } from "@synergy-design-system/components/components/chart/types.js";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [SynChartComponent],
  template: `<syn-chart [config]="config"></syn-chart>`,
})
export class AppComponent {
  config: ECConfig = {
    xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    yAxis: { type: "value" },
    series: [{ type: "line", data: [150, 230, 224, 218, 135] }],
  };
}
```

---

## Full Replace vs. Partial Update

There are two ways to update chart data:

| Approach                              | Behavior                                                               | When to use                                  |
| ------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| Assign `chart.config = { ... }`       | **Full replace** – the previous config is discarded (`notMerge: true`) | Initial setup or complete config changes     |
| `chart.getInstance()?.setOption(...)` | **Partial / merged update** – only the provided keys are changed       | Streaming data, animation-preserving updates |

```js
// Full replace (all previous series/axes are discarded)
chart.config = { xAxis: { ... }, series: [{ type: 'line', data: newData }] };

// Partial update (only series data changes, rest of config stays)
chart.getInstance()?.setOption(
  { series: [{ data: newData }] },
  { replaceMerge: 'series' }
);
```

---

## Config Handle API

Instead of passing a full ECharts option object, you can pass a callback directly to `chart.config`.

This callback receives a typed handle with preset helper functions. The handle is useful when you want to:

- start with a small base config,
- apply Synergy-approved styling/behavior presets,
- keep chart setup readable and consistent across teams.

### How it works

1. A temporary config builder is created.
2. Your callback runs and calls handle methods (for example `baseConfig`, `axesShowSplitLines`, `axesAddXLabelIcons`).
3. The final ECharts option is generated and applied to the chart.

### Merge and order rules (important)

- Calls are applied in the order they are called.
- Later handle calls override conflicting values from earlier calls.
- Nested objects are merged deeply.
- Arrays (for example `series`) are replaced by the latest value, not merged item-by-item.
- If you call `baseConfig()` multiple times, the latest call becomes the new base.

You can call handle methods either by **chaining** or by **sequential calls** — both approaches are equivalent:

```js
const baseConfig = {
  series: [{ type: "line", data: [150, 230, 224] }],
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed"], name: "Days" },
  yAxis: { type: "value", name: "Values" },
};

// Chaining approach
chart.config = handle =>
  handle
    .baseConfig(baseConfig)
    .axesShowSplitLines()
    .axesHideLabels()
    .axesAddXLabelIcons({
      iconUrls,
      iconPosition: "top",
    });

// Sequential calls approach
chart.config = handle => {
  handle.baseConfig(baseConfig);
  handle.axesShowSplitLines();
  handle.axesHideLabels();
  handle.axesAddXLabelIcons({
    iconUrls,
    iconPosition: "top",
  });
};
```

---

## Predefined Preset Functions

The sections below document the handle preset functions available in `chart.config = handle => { ... }` callbacks.

### Axes presets

| Preset function       | Options                          | Description                                      |
| --------------------- | -------------------------------- | ------------------------------------------------ |
| `axesShowSplitLines`  | `AxesUpdateOptions` _(optional)_ | Shows horizontal and vertical split lines.       |
| `axesShowXSplitLines` | `AxisUpdateOptions` _(optional)_ | Shows vertical split lines only on the x-axis.   |
| `axesShowYSplitLines` | `AxisUpdateOptions` _(optional)_ | Shows horizontal split lines only on the y-axis. |
| `axesHideLabels`      | `AxesUpdateOptions` _(optional)_ | Hides tick labels on both axes.                  |
| `axesHideXLabels`     | `AxisUpdateOptions` _(optional)_ | Hides tick labels only on the x-axis.            |
| `axesHideYLabels`     | `AxisUpdateOptions` _(optional)_ | Hides tick labels only on the y-axis.            |
| `axesAddXLabelIcons`  | `AxisLabelIconOptions<'xAxis'>`  | Adds one icon per x-axis label.                  |
| `axesAddYLabelIcons`  | `AxisLabelIconOptions<'yAxis'>`  | Adds one icon per y-axis label.                  |

Axis index behavior:
If index options are omitted, presets are applied to all configured axes of the targeted type.

---

## Bundle Size

`syn-chart` uses [ECharts tree-shaking](https://echarts.apache.org/en/tutorial.html#Use%20ECharts%20with%20bundler%20and%20NPM) internally. Only the modules that are actually needed (currently `LineChart`, `CanvasRenderer`, `GridComponent`, `LegendComponent`, `TitleComponent`, `TooltipComponent`) are imported and registered via ECharts' `use([...])`.

> ⚠️ You do **not** need to register anything yourself.

---

## Supported Chart Types

> ⚠️ **Currently, only line charts are supported** (`series[].type: 'line'`).
>
> Support for additional chart types (bar, pie, gauge, etc.) is planned for future releases.

If you can't wait for the future releases or want to use echarts features, which we won't support, you can do this by registering the needed echarts plugins by yourself.
But keep in mind, that they are not synergy approved and do not have synergy styling! Also the registration needs to be done **before** the component is initialized.

To register echarts functionalities do following or have a closer look at the [echarts documentation](https://echarts.apache.org/en/api.html#echarts.use) :

```js
import { use } from "echarts/core.js";
import { BarChart } from "echarts/charts.js";

use([BarChart]);
```

---

## Something Missing?

If you need a chart type or feature that is not yet available, **please reach out to us**!

- Open an issue in the [GitHub repository](https://github.com/synergy-design-system/synergy-design-system/issues)
- Or start a discussion to share your use case

---

## Contributing

Contributions are very welcome! 🎉

If you'd like to add support for additional chart types, improve styling, fix bugs, or enhance documentation, please refer to our [Contributing Guide](../../CONTRIBUTING.md) to get started.

We appreciate every contribution, big or small.
