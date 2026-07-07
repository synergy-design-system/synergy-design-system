import { expect } from '@open-wc/testing';
import type { ECConfig } from '../../types.js';
import {
  getGridForLegendPosition,
  getLegendConfigForPosition,
} from './utilities.js';

describe('chart legend utilities', () => {
  describe('getLegendConfigForPosition', () => {
    it('position:"top"', () => {
      expect(getLegendConfigForPosition('top')).to.deep.equal({ top: 0 });
    });

    it('position:"bottom"', () => {
      expect(getLegendConfigForPosition('bottom')).to.deep.equal({ bottom: 0 });
    });

    it('position:"left"', () => {
      expect(getLegendConfigForPosition('left')).to.deep.equal({
        left: 0,
        orient: 'vertical',
        top: 'middle',
      });
    });

    it('position:"right"', () => {
      expect(getLegendConfigForPosition('right')).to.deep.equal({
        orient: 'vertical',
        right: 0,
        top: 'middle',
      });
    });
  });

  describe('getGridForLegendPosition', () => {
    it('returns an empty object when config has no series', () => {
      expect(getGridForLegendPosition('top', { top: 0 }, {})).to.deep.equal({});
    });

    it('returns an empty object when the series array is empty', () => {
      const config: ECConfig = { series: [] };
      const result = getGridForLegendPosition('left', { left: 0, orient: 'vertical', top: 'middle' }, config);

      expect(result).to.deep.equal({});
    });

    it('returns a fixed top offset of 80 for "top" position with series', () => {
      const config: ECConfig = { series: [{ name: 'Revenue', type: 'line' }] };

      expect(getGridForLegendPosition('top', { top: 0 }, config)).to.deep.equal({ top: 80 });
    });

    it('returns a fixed bottom offset of 80 for "bottom" position with series', () => {
      const config: ECConfig = { series: [{ name: 'Revenue', type: 'line' }] };

      expect(getGridForLegendPosition('bottom', { bottom: 0 }, config)).to.deep.equal({ bottom: 80 });
    });

    it('returns a left offset depending on the longest series name for "left" position', () => {
      const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
      const result = getGridForLegendPosition('left', { left: 0, orient: 'vertical', top: 'middle' }, config) as Record<string, number>;

      const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'bar' }] };
      const resultWithLongerName = getGridForLegendPosition('left', { left: 0, orient: 'vertical', top: 'middle' }, configWithLongerName) as Record<string, number>;

      expect(resultWithLongerName.left).to.be.greaterThan(result.left);
    });

    it('returns a right offset depending on the longest series name for "right" position', () => {
      const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
      const result = getGridForLegendPosition('right', { orient: 'vertical', right: 0, top: 'middle' }, config) as Record<string, number>;

      const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'bar' }] };
      const resultWithLongerName = getGridForLegendPosition('right', { orient: 'vertical', right: 0, top: 'middle' }, configWithLongerName) as Record<string, number>;

      expect(resultWithLongerName.right).to.be.greaterThan(result.right);
    });

    it('adds a 70 px offset for "left" position when a left y-axis is configured', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { left: 0, orient: 'vertical' as const, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('left', legendStyle, { series }) as Record<string, number>;
      const withLeftYAxis = getGridForLegendPosition('left', legendStyle, {
        series,
        yAxis: { position: 'left', type: 'value' },
      }) as Record<string, number>;

      expect(withLeftYAxis.left).to.equal(withoutYAxis.left + 70);
    });

    it('adds a 70 px offset for "left" position when a y-axis is configured without a position', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { left: 0, orient: 'vertical' as const, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('left', legendStyle, { series }) as Record<string, number>;
      const withLeftYAxis = getGridForLegendPosition('left', legendStyle, {
        series,
        yAxis: { type: 'value' },
      }) as Record<string, number>;

      expect(withLeftYAxis.left).to.equal(withoutYAxis.left + 70);
    });

    it('does not add a y-axis offset for "left" position when the y-axis is on the right', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { left: 0, orient: 'vertical' as const, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('left', legendStyle, { series }) as Record<string, number>;
      const withRightYAxis = getGridForLegendPosition('left', legendStyle, {
        series,
        yAxis: { position: 'right', type: 'value' },
      }) as Record<string, number>;

      expect(withRightYAxis.left).to.equal(withoutYAxis.left);
    });

    it('adds a 70 px offset for "right" position when a right y-axis is configured', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { orient: 'vertical' as const, right: 0, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('right', legendStyle, { series }) as Record<string, number>;
      const withRightYAxis = getGridForLegendPosition('right', legendStyle, {
        series,
        yAxis: { position: 'right', type: 'value' },
      }) as Record<string, number>;

      expect(withRightYAxis.right).to.equal(withoutYAxis.right + 70);
    });

    it('does not add a y-axis offset for "right" position when the y-axis is on the left', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { orient: 'vertical' as const, right: 0, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('right', legendStyle, { series }) as Record<string, number>;
      const withLeftYAxis = getGridForLegendPosition('right', legendStyle, {
        series,
        yAxis: { position: 'left', type: 'value' },
      }) as Record<string, number>;

      expect(withLeftYAxis.right).to.equal(withoutYAxis.right);
    });

    it('applies the y-axis offset when y-axes are provided as an array', () => {
      const series = [{ name: 'Revenue', type: 'line' as const }];
      const legendStyle = { left: 0, orient: 'vertical' as const, top: 'middle' as const };

      const withoutYAxis = getGridForLegendPosition('left', legendStyle, { series }) as Record<string, number>;
      const withArrayYAxes = getGridForLegendPosition('left', legendStyle, {
        series,
        yAxis: [
          { position: 'left', type: 'value' },
          { position: 'right', type: 'value' },
        ],
      }) as Record<string, number>;

      expect(withArrayYAxes.left).to.equal(withoutYAxis.left + 70);
    });

    it('reads the itemWidth from the first entry when legend style is an array', () => {
      const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };

      const singleResult = getGridForLegendPosition('left', { itemWidth: 20, left: 0 }, config) as Record<string, number>;
      const arrayResult = getGridForLegendPosition('left', [{ itemWidth: 20, left: 0 }], config) as Record<string, number>;

      expect(arrayResult.left).to.equal(singleResult.left);
    });
  });
});
