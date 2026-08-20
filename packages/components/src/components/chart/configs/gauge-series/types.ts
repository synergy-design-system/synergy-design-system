import type { PieSeriesOption } from 'echarts/types/dist/shared.js';

/**
 * Visual and textual settings for the optional trend indicator.
 */
export type GaugeTrendOptions = {
  /** Trend direction that controls indicator styling and semantics. */
  direction?: 'up' | 'down';
  /** Data URL used as icon source when the trend direction is `up`. */
  iconUp?: string;
  /** Data URL used as icon source when the trend direction is `down`. */
  iconDown?: string;
  /** Text displayed next to the trend indicator icon. */
  value?: string;
};

/**
 * Boundary and color definitions for outer gauge sections.
 */
export type GaugeSectionsOptions = {
  /** Boundary values for outer gauge sections (for example `[0, 20, 60, 100]`). */
  boundaries?: number[];
  /** Colors for section ranges. Colors are repeated cyclically when fewer colors than ranges are provided. */
  colors?: string[];
};

/**
 * Makes selected keys required while preserving the remaining type shape.
 */
type WithRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
/**
 * Overrides properties of a type with another type, while preserving the remaining type shape.
 */
type Override<T, R> = Omit<T, keyof R> & R;

/**
 * Configures a gauge chart preset used by the Synergy chart component.
 */
export type GaugeSeriesPresetOptions = {
  /** SVG data URL rendered as an image below the unit label, or below the value when no unit is set. */
  icon?: string;
  /** Color of the progress arc that displays the current value. */
  progressColor?: string;
  /** ECharts pie series overrides for the progress arc. */
  gaugeSeries?: PieSeriesOption;
  /** Maximum value for the gauge */
  max?: number;
  /** Minimum value for the gauge */
  min?: number;
  /** ECharts pie series overrides for the optional outer sections ring. */
  sectionsSeries?: PieSeriesOption;
  /** Outer gauge section boundaries and colors. */
  sections?: GaugeSectionsOptions;
  /** Enables rendering of the outer section ring. */
  showSections?: boolean;
  /** Enables rendering of the trend indicator above to the value. */
  showTrend?: boolean;
  /** Detailed configuration for the trend indicator. */
  trend?: GaugeTrendOptions;
  /** Unit label rendered beneath the numeric value (for example "%" or "kWh"). */
  unit?: string;
  /** Current gauge value. */
  value?: number;
};

/**
 * Fully normalized gauge preset options after defaults are resolved.
 */
export type ResolvedGaugeSeriesPresetOptions = Override<
  WithRequired<
    GaugeSeriesPresetOptions,
    'max' | 'min' | 'showSections' | 'showTrend' | 'unit' | 'value'
  >,
  {
    sections: WithRequired<GaugeSectionsOptions, 'boundaries' | 'colors'>;
    trend: WithRequired<
      GaugeTrendOptions,
      'direction' | 'iconUp' | 'iconDown' | 'value'
    >;
  }
>;

export type PieDataItem = {
  /** Slice fill style. Undefined color lets ECharts use its defaults. */
  itemStyle: { color: string | undefined };
  /** Numeric size of the pie slice. */
  value: number;
};

export type { PieSeriesOption };
