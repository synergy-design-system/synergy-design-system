import {
  type Themes, getHexWithOpacity, getRealStyleValue, getRealValueWithoutUnit,
} from '../../themes/utilities.js';
import { DATA_ZOOM } from '../constants.js';
import { colorSvgImageUri } from '../utilities.js';

export const getDataZoomStyles = (mode: Themes = 'light') => ({
  borderColor: getRealStyleValue('SynChartGridLinesColor', mode),
  // The background which represents the whole data range
  dataBackground: {
    areaStyle: {
      color: getRealStyleValue('SynChartCategorical01', mode),
      opacity: 0.2,
    },
    lineStyle: {
      color: getRealStyleValue('SynChartCategorical01', mode),
    },
  },
  // The area that represents the selected data range
  fillerColor: getHexWithOpacity(getRealStyleValue('SynColorPrimary700', mode), 0.2),
  // The small handles on the left and right
  handleIcon: DATA_ZOOM.HANDLE_ICON,
  handleStyle: {
    borderColor: getRealStyleValue('SynChartRangeSelectionColor', mode),
    color: getRealStyleValue('SynChartBackgroundColor', mode),
  },
  // We need to set an explicit move handle icon depending on the theme, because there is no other possibility to color it
  moveHandleIcon: colorSvgImageUri(DATA_ZOOM.MOVE_HANDLE_ICON, getRealStyleValue('SynChartBackgroundColor', mode)),
  // The drag handle on the top of the slider
  moveHandleSize: getRealValueWithoutUnit('SynSpacingMedium', mode),
  moveHandleStyle: {
    color: getRealStyleValue('SynChartRangeSelectionColor', mode),
    opacity: 1,
  },
  selectedDataBackground: {
    areaStyle: {
      color: getRealStyleValue('SynChartCategorical01', mode),
      opacity: 0.2,
    },
    lineStyle: {
      color: getRealStyleValue('SynChartCategorical01', mode),
    },
  },
  showDetail: false,
});
