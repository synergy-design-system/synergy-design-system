/**
 * Shared chart layout constants.
 *
 * These values capture the fixed spacings and fallback sizes that are used by
 * multiple chart helpers. Keeping them here makes the intent behind the numbers
 * explicit and keeps the config helpers easier to read.
 */

/** Theme constants */
export const THEME = {
  /** Right inset used by the light theme grid to avoid clipping the last split line. */
  GRID_RIGHT_INSET: 1,
} as const;

/** Legend constants */
export const LEGEND = {
  /** Shared spacing used when positioned legends need to stay clear of chart content. */
  GRID_OFFSET: 80,
  /** Horizontal gap between a vertical legend icon and its label text. */
  ICON_TEXT_GAP: 6,
  /** Width reserved for the legend visibility icon at the end of each legend item. */
  VISIBILITY_ICON_SPACE: 20,
} as const;

/** Axis constants */
export const AXIS = {
  /** Fallback width used when y-axis label text cannot be measured at runtime. */
  LABEL_FALLBACK_WIDTH: 30,
  /** Small icon-to-label padding used by the default rich axis label layouts. */
  LABEL_ICON_PADDING: 4,
  /** Default gap between the x-axis name and the axis line. */
  X_NAME_GAP: 32,
} as const;
