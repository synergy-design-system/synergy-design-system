import { expect } from '@open-wc/testing';
import type { LegendComponentOption } from 'echarts/types/dist/echarts';
import type { GridOption } from 'echarts/types/dist/shared';
import { legendShow } from './presets.js';
import type { ECConfig } from '../../types.js';

describe('chart legend presets', () => {
  describe('legendShow', () => {
    it('produces no grid offset for top position when config has no series', () => {
      const result = legendShow()({});

      expect(result.grid).to.deep.equal({});
    });

    describe('position: top', () => {
      it('defaults to top legend placement when called without arguments', () => {
        const result = legendShow()({});
        const legend = result.legend as LegendComponentOption;
        expect(legend.top).to.equal(0);
      });

      it('returns a fixed top grid offset of 80 when series are present', () => {
        const config: ECConfig = { series: [{ name: 'Sales', type: 'line' }] };
        const result = legendShow({ position: 'top' })(config);
        const grid = result.grid as GridOption;

        expect(grid.top).to.equal(80);
      });
    });

    describe('position: bottom', () => {
      it('returns a fixed bottom grid offset of 80 for bottom position with series', () => {
        const config: ECConfig = { series: [{ name: 'Sales', type: 'line' }] };
        const result = legendShow({ position: 'bottom' })(config);
        const grid = result.grid as GridOption;

        expect(grid.bottom).to.equal(80);
      });
    });

    describe('position: left', () => {
      it('orients the legend vertically at left center for left position', () => {
        const result = legendShow({ position: 'left' })({});
        const legend = result.legend as LegendComponentOption;

        expect(legend.left).to.equal(0);
        expect(legend.orient).to.equal('vertical');
        expect(legend.top).to.equal('middle');
      });

      it('returns a positive left grid offset for left position with named series', () => {
        const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
        const result = legendShow({ position: 'left' })(config);
        const grid = result.grid as GridOption;
        expect(grid.left).to.be.a('number').and.greaterThan(0);
      });

      it('adapts left grid depending on the longest series name', () => {
        const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
        const result = legendShow({ position: 'left' })(config);
        const grid = result.grid as GridOption;

        const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'bar' }] };
        const resultWithLongerName = legendShow({ position: 'left' })(configWithLongerName);
        const gridWithLongerName = resultWithLongerName.grid as GridOption;

        expect(gridWithLongerName.left).to.be.greaterThan(grid.left as number);
      });
    });

    describe('position: right', () => {
      it('orients the legend vertically at right center for right position', () => {
        const result = legendShow({ position: 'right' })({});
        const legend = result.legend as LegendComponentOption;

        expect(legend.right).to.equal(0);
        expect(legend.orient).to.equal('vertical');
        expect(legend.top).to.equal('middle');
      });

      it('returns a positive right grid offset for right position with named series', () => {
        const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
        const result = legendShow({ position: 'right' })(config);
        const grid = result.grid as GridOption;

        expect(grid.right).to.be.a('number').and.greaterThan(0);
      });

      it('adapts right grid depending on the longest series name', () => {
        const config: ECConfig = { series: [{ name: 'Revenue', type: 'bar' }] };
        const result = legendShow({ position: 'right' })(config);
        const grid = result.grid as GridOption;

        const configWithLongerName: ECConfig = { series: [{ name: 'Revenue and Costs', type: 'bar' }] };
        const resultWithLongerName = legendShow({ position: 'right' })(configWithLongerName);
        const gridWithLongerName = resultWithLongerName.grid as GridOption;

        expect(gridWithLongerName.right).to.be.greaterThan(grid.right as number);
      });
    });

    it('merges custom legendOptions on top of position defaults', () => {
      const result = legendShow({ legendOptions: { left: 16 }, position: 'top' })({});
      const legend = result.legend as LegendComponentOption;

      expect(legend.top).to.equal(0);
      expect(legend.left).to.equal(16);
    });

    it('merges custom gridOptions on top of the computed grid offset', () => {
      const config: ECConfig = { series: [{ name: 'A', type: 'line' }] };
      const result = legendShow({ gridOptions: { left: 24 }, position: 'top' })(config);
      const grid = result.grid as GridOption;

      expect(grid.top).to.equal(80);
      expect(grid.left).to.equal(24);
    });

    it('supports array legendOptions and gridOptions', () => {
      const result = legendShow({
        gridOptions: [{ right: 32 }, { left: 120 }],
        legendOptions: [{ right: 8 }, { bottom: 12, orient: 'horizontal' }],
        position: 'right',
      })({});

      const legends = result.legend as Array<LegendComponentOption>;
      const grids = result.grid as Array<GridOption>;

      expect(legends).to.have.length(2);
      expect(legends[0].right).to.equal(8);
      expect(legends[0].top).to.equal('middle');
      expect(legends[0].orient).to.equal('vertical');
      expect(legends[1].bottom).to.equal(12);

      expect(grids).to.have.length(2);
      expect(grids[0].right).to.equal(32);
      expect(grids[1].left).to.equal(120);
    });
  });
});
