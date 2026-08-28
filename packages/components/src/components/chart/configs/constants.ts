/**
 * Shared chart layout constants.
 *
 * These values capture the fixed spacings and fallback sizes that are used by
 * multiple chart helpers. Keeping them here makes the intent behind the numbers
 * explicit and keeps the config helpers easier to read.
 */

/** Theme constants */
export const THEME = {
  /** Right inset used by the light theme grid to avoid clipping the last split line or the dataZoom slider */
  GRID_RIGHT_INSET: 6,
} as const;

/** Legend constants */
export const LEGEND = {
  DEFAULT_POSITION: 'top',
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
  /** Default offset for the first y-axis element to the chart. */
  Y_AXIS_OFFSET_FIRST_ELEMENT: 12,
  /** Factor for calculating the offset of subsequent y-axis elements. */
  Y_AXIS_OFFSET_INCREMENT: 80,
} as const;

/** DataZoom constants */
export const DATA_ZOOM = {
  /** Icon as path for the dataZoom handles. */
  HANDLE_ICON: 'path://M0,0M0,40M-2.5,8H2.5A4,4,0,0,1,6.5,12V28A4,4,0,0,1,2.5,32H-2.5A4,4,0,0,1,-6.5,28V12A4,4,0,0,1,-2.5,8Z',
  /** Inner icon of the move handle. */
  MOVE_HANDLE_ICON: 'image://data:image/svg+xml,%3Csvg%20width%3D%2210%22%20height%3D%228%22%20viewBox%3D%220%200%2010%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20x%3D%220%22%20y%3D%221%22%20width%3D%222%22%20height%3D%226%22%20rx%3D%221%22%20fill%3D%22white%22/%3E%3Crect%20x%3D%224%22%20y%3D%221%22%20width%3D%222%22%20height%3D%226%22%20rx%3D%221%22%20fill%3D%22white%22/%3E%3Crect%20x%3D%228%22%20y%3D%221%22%20width%3D%222%22%20height%3D%226%22%20rx%3D%221%22%20fill%3D%22white%22/%3E%3C/svg%3E',
} as const;

/** Synergy donut series constants */
export const DONUT_SERIES = {
  /** Baseline height used for the default graphic layout and responsive scaling. */
  REFERENCE_HEIGHT: 280,
  /** Angular gap rendered between adjacent donut segments, in radians. */
  SEGMENT_GAP: 0.02,
  /** Start angle of the donut ring, in degrees. 90 places the first segment at the top of the circle. */
  START_ANGLE: 90,
  TYPE_NAME: 'synDonut',
} as const;
