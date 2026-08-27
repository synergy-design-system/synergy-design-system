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

/** Synergy gauge series constants */
export const GAUGE_SERIES = {
  /** End angle of the semicircular gauge arc, in degrees. */
  END_ANGLE: 405,
  /** Baseline height used for the default graphic layout and responsive scaling. */
  REFERENCE_HEIGHT: 280,
  /** Default section boundaries used for the optional outer threshold ring. */
  SECTIONS_BOUNDARIES: [0, 20, 60, 100] as Array<number>,
  /** Section gap for transparent separators between section slices. */
  SECTIONS_GAP: 0.01,
  /** Start angle of the semicircular gauge arc, in degrees. */
  START_ANGLE: 135,
  /** Default SVG data URL used when the trend indicator points downward. */
  TREND_ICON_DOWN: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMS4yNSA0LjV2MTIuMTI3bC01LjY5Ni01LjY5Nkw0LjUgMTJsNy41IDcuNSA3LjUtNy41LTEuMDU0LTEuMDctNS42OTYgNS42OTdWNC41eiIvPjwvc3ZnPg==',
  /** Default SVG data URL used when the trend indicator points upward. */
  TREND_ICON_UP: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSdjdXJyZW50Q29sb3InPjxwYXRoIGQ9Ik0xMS4yNSAxOS41VjcuMzczbC01LjY5NiA1LjY5Nkw0LjUgMTIgMTIgNC41bDcuNSA3LjUtMS4wNTQgMS4wNy01LjY5Ni01LjY5N1YxOS41eiIvPjwvc3ZnPg==',
  TYPE_NAME: 'synergyGauge',
} as const;

/** Synergy donut series constants */
export const DONUT_SERIES = {
  /** Baseline height used for the default graphic layout and responsive scaling. */
  REFERENCE_HEIGHT: 280,
  /** Angular gap rendered between adjacent donut segments, in radians. */
  SEGMENT_GAP: 0.02,
  /** Start angle of the donut ring, in degrees. 90 places the first segment at the top of the circle. */
  START_ANGLE: 90,
  TYPE_NAME: 'synergyDonut',
} as const;

/** Synergy segment chart series constants */
export const SEGMENT_CHART_SERIES = {
  /** Default weight used for a segment when no explicit `weights` entry is provided for it. */
  DEFAULT_WEIGHT: 1,
  /** Angle, in degrees, at which the gap is centered when `gapOrientation` is 0. 90 places it at the bottom of the circle. */
  GAP_CENTER_ANGLE: 90,
  /** Default fraction of the full circle reserved as the empty gap, when `gap` is not set. */
  GAP_DEFAULT: 0.3,
  /** Default maximum value used to normalize segment fill, when `max` is not set. */
  MAX_DEFAULT: 100,
  /** Default minimum value used to normalize segment fill, when `min` is not set. */
  MIN_DEFAULT: 0,
  /** Baseline height used for the default graphic layout and responsive scaling. */
  REFERENCE_HEIGHT: 280,
  /** Constant pixel-width gap rendered between adjacent segments, regardless of their distance to the center. */
  SEGMENT_GAP_PX: 2,
  TYPE_NAME: 'synergySegmentChart',
} as const;
