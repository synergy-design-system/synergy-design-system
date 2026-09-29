import { expect } from '@open-wc/testing';
import type { LegendComponentOption } from 'echarts/types/dist/shared.js';
import type { GridOption } from 'echarts/types/dist/shared';
import { legendShow } from './presets.js';
import type { ECConfig } from '../../types.js';
import { LEGEND } from '../constants.js';

describe('chart legend presets', () => {
  describe('legendShow', () => {
    const config: ECConfig = { series: [{ name: 'A', type: 'line' }] };

    describe('function overloads', () => {
      it('defaults to top legend placement when called without arguments', () => {
        const result = legendShow()(config);
        const legend = result.legend as LegendComponentOption;

        expect(legend.top).to.equal(0);
      });

      it('accepts a position string as first argument', () => {
        const result = legendShow('top')(config);
        const legend = result.legend as LegendComponentOption;

        expect(legend.top).to.equal(0);
      });

      it('accepts a position string and grid options as second argument', () => {
        const result = legendShow('top', { left: 24 })(config);
        const grid = result.grid as GridOption;

        expect(grid.top).to.equal(LEGEND.GRID_OFFSET);
        expect(grid.left).to.equal(24);
      });

      it('accepts a legend options object as first argument', () => {
        const result = legendShow({ legend: { left: 16 }, position: 'top' })(config);
        const legend = result.legend as LegendComponentOption;

        expect(legend.top).to.equal(0);
        expect(legend.left).to.equal(16);
      });

      it('accepts a legend options object and grid options as second argument', () => {
        const result = legendShow({ position: 'top' }, { left: 24 })(config);
        const grid = result.grid as GridOption;

        expect(grid.top).to.equal(LEGEND.GRID_OFFSET);
        expect(grid.left).to.equal(24);
      });

      it('defaults to top position when options object has no position', () => {
        const result = legendShow({ legend: { left: 32 } })(config);
        const legend = result.legend as LegendComponentOption;

        expect(legend.top).to.equal(0);
        expect(legend.left).to.equal(32);
      });

      it('falls back to default top position for invalid position values', () => {
        const result = legendShow({ position: 'center' as never })(config);
        const legend = result.legend as LegendComponentOption;

        expect(legend.top).to.equal(0);
      });
    });

    describe('position: top', () => {
      it('produces no grid offset when config has no series', () => {
        const result = legendShow()({});

        expect(result.grid).to.deep.equal({});
      });

      it('returns a fixed top grid offset of 80 when series are present', () => {
        const result = legendShow({ position: 'top' })(config);
        const grid = result.grid as GridOption;

        expect(grid.top).to.equal(LEGEND.GRID_OFFSET);
        expect(result.legend).to.deep.equal({
          top: 0,
        });
      });
    });

    describe('position: bottom', () => {
      it('returns a fixed bottom grid offset of 80 when series are present', () => {
        const result = legendShow({ position: 'bottom' })(config);
        const grid = result.grid as GridOption;

        expect(grid.bottom).to.equal(LEGEND.GRID_OFFSET);
        expect(result.legend).to.deep.equal({
          bottom: 0,
        });
      });
    });

    describe('position: left', () => {
      it('orients the legend vertically at the top left', () => {
        const result = legendShow({ position: 'left' })({});

        expect(result.legend).to.deep.equal({
          left: 0,
          orient: 'vertical',
        });
      });

      it('returns a positive left grid offset when series are present', () => {
        const result = legendShow({ position: 'left' })(config);
        const grid = result.grid as GridOption;

        expect(grid.left).to.be.a('number').and.greaterThan(0);
      });

      it('adapts the left grid offset to the longest series name', () => {
        const result = legendShow({ position: 'left' })(config);
        const grid = result.grid as GridOption;

        const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'line' }] };
        const resultWithLongerName = legendShow({ position: 'left' })(configWithLongerName);
        const gridWithLongerName = resultWithLongerName.grid as GridOption;

        expect(gridWithLongerName.left).to.be.greaterThan(grid.left as number);
      });
    });

    describe('position: right', () => {
      it('orients the legend vertically at the top right', () => {
        const result = legendShow({ position: 'right' })({});

        expect(result.legend).to.deep.equal({
          orient: 'vertical',
          right: 0,
        });
      });

      it('returns a positive right grid offset when series are present', () => {
        const result = legendShow({ position: 'right' })(config);
        const grid = result.grid as GridOption;

        expect(grid.right).to.be.a('number').and.greaterThan(0);
      });

      it('adapts the right grid offset to the longest series name', () => {
        const result = legendShow({ position: 'right' })(config);
        const grid = result.grid as GridOption;

        const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'line' }] };
        const resultWithLongerName = legendShow({ position: 'right' })(configWithLongerName);
        const gridWithLongerName = resultWithLongerName.grid as GridOption;

        expect(gridWithLongerName.right).to.be.greaterThan(grid.right as number);
      });
    });
  });
});
