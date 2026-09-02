import { expect } from '@open-wc/testing';
import { seriesDonut } from './presets.js';
import type { DonutSeriesPresetOptions, ECConfig, SynergyDonutSeriesOption } from '../../types.js';

describe('seriesDonut', () => {
  describe('basic functionality', () => {
    it('should create series with type "synDonut"', () => {
      const options: DonutSeriesPresetOptions = {
        data: [{ value: 10 }, { value: 20 }, { value: 30 }],
      };
      const modifier = seriesDonut(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: SynergyDonutSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(1);
      expect(result.series[0]).to.have.property('type', 'synDonut');
    });

    it('should preserve provided DonutSeriesPresetOptions properties', () => {
      const options: DonutSeriesPresetOptions = {
        center: ['50%', '50%'],
        data: [
          { name: 'Apples', value: 10 },
          { name: 'Bananas', value: 20 },
        ],
        name: 'Fruit',
        radius: '80%',
      };
      const modifier = seriesDonut(options);
      const config: ECConfig = {};

      const result = modifier(config) as { series: SynergyDonutSeriesOption[] };

      expect(result.series[0]).to.deep.include({
        center: ['50%', '50%'],
        data: [
          { name: 'Apples', value: 10 },
          { name: 'Bananas', value: 20 },
        ],
        name: 'Fruit',
        radius: '80%',
        type: 'synDonut',
      });
    });
  });

  describe('array appending', () => {
    it('should append series to existing series array', () => {
      const existingConfig: ECConfig = {
        series: [
          { data: [1, 2, 3], name: 'Existing Line', type: 'line' },
        ],
      };

      const newDonutSeries: DonutSeriesPresetOptions = {
        data: [{ value: 10 }, { value: 20 }],
      };

      const modifier = seriesDonut(newDonutSeries);
      const result = modifier(existingConfig) as { series: SynergyDonutSeriesOption[] };

      expect(result.series).to.be.an('array').with.lengthOf(2);
      expect(result.series[0]).to.include({ name: 'Existing Line' });
      expect(result.series[1]).to.deep.include({
        data: [{ value: 10 }, { value: 20 }],
        type: 'synDonut',
      });
    });
  });
});
