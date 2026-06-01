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

## Config Builder

Instead of manually assembling deeply nested ECharts option objects, `syn-chart` ships a middleware-style composition system. The central concept is the **`ConfigModifier`** — a plain function with the signature `(config: ECConfig) => ECConfig`. Predefined modifiers cover the most common styling adjustments; you can also write your own.

### `enhanceConfig` — Fluent Builder

`enhanceConfig(base)` wraps a base config in a fluent builder. Chain as many `.with(modifier)` calls as needed, then call `.build()` to get the final `ECConfig`.

```js
import {
  enhanceConfig,
  hideAxesValues,
  showGridLines,
} from "@synergy-design-system/components/components/chart/configs/index.js";

const baseConfig = {
  series: [{ type: "line", data: [150, 230, 224] }],
  xAxis: { type: "category", data: ["Mon", "Tue", "Wed"], name: "Days" },
  yAxis: { type: "value", name: "Values" },
};

chart.config = enhanceConfig(baseConfig)
  .with(showGridLines)
  .with(hideAxesValues)
  .build();
```

### `compose` — Combine Modifiers

`compose(...modifiers)` combines several `ConfigModifier` functions into a single one. Modifiers are applied left-to-right.

```js
import {
  compose,
  hideAxesValues,
  showGridLines,
} from "@synergy-design-system/components/components/chart/configs/index.js";

const myPreset = compose(showGridLines, hideAxesValues);

chart.config = enhanceConfig(baseConfig).with(myPreset).build();
```

### Writing Your Own Modifier

```js
import { mergeConfigs } from "@synergy-design-system/components/components/chart/configs/index.js";

/** @type {import('@synergy-design-system/components/components/chart/configs/index.js').ConfigModifier} */
const withTitle = config =>
  mergeConfigs(config, {
    title: { text: "My Chart" },
  });

chart.config = enhanceConfig(baseConfig).with(withTitle).build();
```

### Array Merge Strategy

Nested objects are deep-merged across layers; **arrays are always replaced** by the value from the most recently applied modifier. Keep this in mind when modifying `series`, `xAxis.data`, etc.

---

## Predefined Config Reference

All predefined modifiers are exported from `@synergy-design-system/components/components/chart/configs/index.js`.

### Grid & Axis Lines

| Modifier                  | Description                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `showHorizontalGridLines` | Enables horizontal grid lines by showing the `yAxis.splitLine`.                                                                                           |
| `showVerticalGridLines`   | Enables vertical grid lines by showing the `xAxis.splitLine`.                                                                                             |
| `showGridLines`           | Enables grid lines in both directions and makes the `xAxis` and `yAxis` baseline visible. Composes `showHorizontalGridLines` and `showVerticalGridLines`. |

### Axis Labels

| Modifier          | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `hideXAxisValues` | Hides x-axis tick labels. Adjusts `nameGap` to compensate for the removed label space. |
| `hideYAxisValues` | Hides y-axis tick labels. Left-aligns the axis name text when labels are hidden.       |
| `hideAxesValues`  | Hides tick labels on both axes. Composes `hideXAxisValues` and `hideYAxisValues`.      |

### `xAxisWithIconLabels(options)`

Renders a custom icon above or below each x-axis tick label. Each icon is supplied as an SVG data URL and is automatically colorized.

```js
import {
  xAxisWithIconLabels,
  enhanceConfig,
} from "@synergy-design-system/components/components/chart/configs/index.js";

const iconUrls = [
  "data:image/svg+xml;base64,...",
  "data:image/svg+xml;base64,...",
];

chart.config = enhanceConfig(baseConfig)
  .with(xAxisWithIconLabels({ iconUrls, iconPosition: "top" }))
  .build();
```

#### Options

| Option         | Type                | Default                                                       | Description                                                                                                                                                                                                                                                                                              |
| -------------- | ------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iconUrls`     | `string[]`          | _(required)_                                                  | One SVG data URL per x-axis category value.                                                                                                                                                                                                                                                              |
| `iconPosition` | `'top' \| 'bottom'` | `'top'`                                                       | Whether icons appear above or below the tick label.                                                                                                                                                                                                                                                      |
| `iconColor`    | `string`            | resolved value of `--syn-color-neutral-950`                   | A real color value (e.g. `#1a1a1a`, `rgb(26, 26, 26)`) used to replace `currentColor` in each SVG. **CSS custom properties (e.g. `--syn-color-neutral-950`) are not supported** — pass the resolved value instead: `getComputedStyle(document.body).getPropertyValue('--syn-color-neutral-950').trim()`. |
| `iconsStyle`   | `TextCommonOption`  | `{ height: --syn-spacing-large, width: --syn-spacing-large }` | ECharts rich-text style overrides for the icon element.                                                                                                                                                                                                                                                  |
| `labelsStyle`  | `TextCommonOption`  | See note                                                      | ECharts rich-text style overrides for the label element. Defaults use Synergy typography tokens (`--syn-font-sans`, `--syn-font-size-x-small`, `--syn-font-weight-normal`, `--syn-typography-color-text-quiet`).                                                                                         |

### `yAxisWithIconLabels(options)`

Renders a custom icon to the left or right of each y-axis tick label. The label box width is calculated automatically from the longest label in the config so that icons stay horizontally aligned; override via `labelsStyle.width`.

```js
import {
  yAxisWithIconLabels,
  enhanceConfig,
} from "@synergy-design-system/components/components/chart/configs/index.js";

const iconUrls = [
  "data:image/svg+xml;base64,...",
  "data:image/svg+xml;base64,...",
];

chart.config = enhanceConfig(baseConfig)
  .with(yAxisWithIconLabels({ iconUrls, iconPosition: "left" }))
  .build();
```

#### Options

| Option         | Type                | Default                                                       | Description                                                                                                                                                                                                                                                                                              |
| -------------- | ------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `iconUrls`     | `string[]`          | _(required)_                                                  | One SVG data URL per y-axis category value.                                                                                                                                                                                                                                                              |
| `iconPosition` | `'left' \| 'right'` | `'left'`                                                      | Whether icons appear to the left or right of the tick label.                                                                                                                                                                                                                                             |
| `iconColor`    | `string`            | resolved value of `--syn-color-neutral-950`                   | A real color value (e.g. `#1a1a1a`, `rgb(26, 26, 26)`) used to replace `currentColor` in each SVG. **CSS custom properties (e.g. `--syn-color-neutral-950`) are not supported** — pass the resolved value instead: `getComputedStyle(document.body).getPropertyValue('--syn-color-neutral-950').trim()`. |
| `iconsStyle`   | `TextCommonOption`  | `{ height: --syn-spacing-large, width: --syn-spacing-large }` | ECharts rich-text style overrides for the icon element.                                                                                                                                                                                                                                                  |
| `labelsStyle`  | `TextCommonOption`  | See note                                                      | ECharts rich-text style overrides for the label element. Defaults use Synergy typography tokens. For `iconPosition: 'left'` the label width is auto-calculated to keep icons aligned; set `labelsStyle.width` explicitly to override.                                                                    |

### Builder Utilities

| Export          | Signature                                            | Description                                                                                                                  |
| --------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `enhanceConfig` | `(base: ECConfig) => ConfigBuilder`                  | Creates a fluent builder. Chain `.with(modifier)` calls, then `.build()` to get the final config.                            |
| `compose`       | `(...modifiers: ConfigModifier[]) => ConfigModifier` | Combines multiple modifiers into one. Applied left-to-right.                                                                 |
| `mergeConfigs`  | `(...layers: Partial<ECConfig>[]) => ECConfig`       | Low-level deep-merge primitive. Nested objects are merged; arrays are replaced. Used internally by all predefined modifiers. |

---

## TypeScript

The `config` property is typed as `ECConfig`, which is a **scoped** [`ComposeOption`](https://echarts.apache.org/en/api.html#echarts.ComposeOption) — it only includes the chart types and ECharts components that are currently registered internally:

```ts
import type { ECConfig } from "@synergy-design-system/components/components/chart/types.js";
```

The type currently covers:

- `LineSeriesOption` (line charts)

> If you use TypeScript and assign options for unsupported chart types (e.g. `BarSeriesOption`), you will get a **type error**. This is intentional — it reflects the actual runtime capabilities of the component.

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
