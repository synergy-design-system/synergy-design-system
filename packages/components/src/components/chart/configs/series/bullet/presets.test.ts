import { expect } from '@open-wc/testing';
import type { ECConfig } from '../../../types.js';
import { seriesBullet } from './presets.js';
import type { BulletSeriesPresetOptions, SynergyBulletSeriesConfig } from './types.js';

describe('seriesBullet', () => {
  it('creates a default synBullet series config', () => {
    const options: BulletSeriesPresetOptions = {
      data: [{
        current: 7, end: 10, name: 'Pressure', start: 0,
      }],
    };
    const { series } = seriesBullet(options)({}) as {
      series: SynergyBulletSeriesConfig[];
    };

    expect(series).to.be.an('array').with.lengthOf(1);
    expect(series[0].type).to.equal('synBullet');
    expect(series[0].data).to.deep.equal(options.data);
  });

  it('preserves the provided series options', () => {
    const options: BulletSeriesPresetOptions = {
      barMaxWidth: 24,
      data: [{
        current: 7, end: 10, name: 'Pressure', start: 0,
      }],
      name: 'System pressure',
    };
    const { series } = seriesBullet(options)({}) as {
      series: SynergyBulletSeriesConfig[];
    };

    expect(series[0]).to.deep.include({
      barMaxWidth: 24,
      data: options.data,
      name: 'System pressure',
      type: 'synBullet',
    });
  });

  describe('config merging', () => {
    it('appends synBullet series to existing series', () => {
      const existingConfig: ECConfig = {
        series: [{ data: [1, 2, 3], name: 'Existing Line', type: 'line' }],
      };
      const result = seriesBullet({
        data: [{
          current: 7, end: 10, name: 'Pressure', start: 0,
        }],
      })(existingConfig) as {
        series: SynergyBulletSeriesConfig[];
      };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line', type: 'line' });
      expect(result.series[1].type).to.equal('synBullet');
    });

    it('does not mutate the incoming config object', () => {
      const existingConfig: ECConfig = {
        series: [{ data: [1], name: 'Existing', type: 'line' }],
      };
      const originalSeries = existingConfig.series as Array<{ name?: string; type?: string }>;

      const result = seriesBullet({
        data: [{
          current: 7, end: 10, name: 'Pressure', start: 0,
        }],
      })(existingConfig) as {
        series: SynergyBulletSeriesConfig[];
      };

      expect(originalSeries).to.have.lengthOf(1);
      expect(result.series).to.have.lengthOf(originalSeries.length + 1);
      expect(result.series[0]).to.include({ name: 'Existing', type: 'line' });
      expect(result.series[1].type).to.equal('synBullet');
    });
  });
});
