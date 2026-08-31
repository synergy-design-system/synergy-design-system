import type { ZRColor } from 'echarts/types/dist/shared.js';
import type { Override, WithRequired } from '../types.js';

/**
 * Formatter functions for gauge value labels.
 */
export type GaugeFormatterOptions = {
  /** Formatter applied to the displayed gauge value. */
  value?: (value: number) => string;
  /** Formatter applied to the displayed minimum label. */
  min?: (value: number) => string;
  /** Formatter applied to the displayed maximum label. */
  max?: (value: number) => string;
};

/**
 * Boundary and color definitions for outer gauge sections.
 */
export type GaugeSectionsOptions = {
  /** Shows the outer section ring when enabled. */
  show?: boolean;
  /** Boundary values for outer gauge sections (for example `[0, 20, 60, 100]`). */
  boundaries?: number[];
  /** Colors for section ranges. Colors are repeated cyclically when fewer colors than ranges are provided. */
  colors?: string[];
};
/**
 * Visual and textual settings for the optional trend indicator.
 */
export type GaugeTrendOptions = {
  /** Shows the trend indicator when enabled. */
  show?: boolean;
  /** Trend direction that controls indicator styling and semantics. */
  direction?: 'up' | 'down';
  /** Data URL used as icon source when the trend direction is `up`. Falls back to the Synergy default up icon when not set. */
  iconUp?: string;
  /** Data URL used as icon source when the trend direction is `down`. Falls back to the Synergy default down icon when not set. */
  iconDown?: string;
  /** Text displayed next to the trend indicator icon. */
  value?: string;
};

export type GaugeSeriesConfig = {
  /** Color of progress arc */
  color?: string;
  /** Background color of progress arc */
  backgroundColor?: string;
  /** Outer gauge section boundaries and colors. */
  sections?: GaugeSectionsOptions;
  /** SVG data URL rendered as an image below the value. */
  icon?: string;
  /** Minimum value of the gauge scale. Defaults to `0`. */
  min?: number;
  /** Maximum value of the gauge scale. Defaults to `100`. */
  max?: number;
  /** Formatter functions for the displayed gauge labels. */
  formatter?: GaugeFormatterOptions;
  /** Detailed configuration for the trend indicator. */
  trend?: GaugeTrendOptions;
};

/**
 * Fully normalized gauge preset options after defaults are resolved.
 */
export type ResolvedGaugeSeriesConfig = Override<
  WithRequired<
    GaugeSeriesConfig,
    'max' | 'min' | 'icon' | 'backgroundColor'
  >,
  {
    formatter: WithRequired<GaugeFormatterOptions, 'max' | 'min' | 'value'>;
    sections: WithRequired<GaugeSectionsOptions, 'boundaries' | 'colors' | 'show'>;
    trend: WithRequired<
      GaugeTrendOptions,
      'direction' | 'iconUp' | 'iconDown' | 'value' | 'show'
    >;
  }
>;

export type Sector = {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  color: ZRColor;
  z: number;
};

export type TextInput = {
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight?: number | string;
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  z?: number;
};

export type ImageInput = {
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  z?: number;
};

export type SynergyGaugeSeriesOption = {
  type: 'synGauge';
  name?: string;
  color?: string;
  data?: number[];
} & GaugeSeriesConfig;

/**
 * Input options for the `seriesGauge` preset.
 *
 * `value` is a convenience alias for setting the first data item. When both
 * `data` and `value` are provided, `data` takes precedence.
 */
export type GaugeSeriesPresetOptions = Omit<SynergyGaugeSeriesOption, 'data' | 'type'> & {
  /** Current value of the gauge */
  value: number;
};

export type GaugeModelOption = {
  type: 'synGauge';
  data?: number[];
};

/**
 * Add the `synGauge` series type to the ECharts module.
 */
declare module 'echarts/types/dist/shared.js' {
  interface RegisteredSeriesOption {
    synGauge: SynergyGaugeSeriesOption;
  }
}
