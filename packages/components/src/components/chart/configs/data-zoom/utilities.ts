import {
  type Themes, getHexWithOpacity, getRealStyleValue, getRealValueWithoutUnit,
} from '../../themes/utilities.js';
import { DATA_ZOOM } from '../constants.js';

export const getDataZoomStyles = (mode: Themes = 'light') => ({
  borderColor: getRealStyleValue('SynPanelBorderColor', mode),
  // The background which represents the whole data range
  dataBackground: {
    areaStyle: {
      // TODO: need to wait for design feedback if this is the correct color
      color: getRealStyleValue('SynChartCategorical01', mode),
      opacity: 0.2,
    },
    lineStyle: {
      // TODO: need to wait for design feedback if this is the correct color
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
  // The drag handle on the top of the slider
  moveHandleSize: getRealValueWithoutUnit('SynSpacingMedium', mode),
  moveHandleStyle: {
    color: getRealStyleValue('SynChartRangeSelectionColor', mode),
    opacity: 1,
  },
  showDetail: false,
});
