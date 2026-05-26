import type { LineSeriesOption } from 'echarts/charts.js';
import type { ComposeOption } from 'echarts/core.js';

// Scoped option type — only includes the components and chart types registered via use()
export type ECConfig = ComposeOption<LineSeriesOption>;
