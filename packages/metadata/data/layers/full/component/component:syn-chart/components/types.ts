import type { EChartsOption } from 'echarts/types/dist/shared.js';

export type ECConfig = EChartsOption;

export type {
  SynChartPresetName,
  SynChartPresetOptionsMap,
} from './configs/presets/index.js';

// Public preset option types
export type {
  AxisIndexSelection,
  AxisPatchOptions,
  AxesPatchOptions,
  AxisLabelIconsOptions,
} from './configs/axes/types.js';
