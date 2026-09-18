import { expect } from '@open-wc/testing';
import { SynergyDonutSeriesModel } from './donut-model.js';

describe('SynergyDonutSeriesModel', () => {
  const createModel = (): SynergyDonutSeriesModel => Object.create(SynergyDonutSeriesModel.prototype) as SynergyDonutSeriesModel;

  it('normalizes primitive and configured data items', () => {
    const model = createModel();
    const data = model.getInitialData({
      data: [10, {
        label: (value) => `Item ${value}`,
        name: (value) => `Name ${value}`,
        prefixIcon: 'data:image/svg+xml;base64,icon',
        value: 20,
      }],
    });

    expect(data.count()).to.equal(2);
    expect(data.get('value', 0)).to.equal(10);
    expect(data.getRawDataItem(0)).to.deep.equal({ label: '10', value: 10 });
    expect(data.get('value', 1)).to.equal(20);
    expect(data.getRawDataItem(1)).to.deep.equal({
      label: 'Item 20',
      name: 'Name 20',
      prefixIcon: 'data:image/svg+xml;base64,icon',
      value: 20,
    });
  });

  describe('name values', () => {
    it('uses a string name', () => {
      const data = createModel().getInitialData({ data: [{ name: 'Apples', value: 10 }] });

      expect(data.getRawDataItem(0)).to.include({ name: 'Apples' });
    });

    it('omits a name when it is not set', () => {
      const data = createModel().getInitialData({ data: [{ value: 10 }] });

      expect(data.getRawDataItem(0)).to.not.have.property('name');
    });

    it('omits a name when it is explicitly undefined', () => {
      const data = createModel().getInitialData({ data: [{ name: undefined, value: 10 }] });

      expect(data.getRawDataItem(0)).to.not.have.property('name');
    });

    it('resolves a name callback with the data value', () => {
      const data = createModel().getInitialData({
        data: [{ name: (value) => `Value ${value}`, value: 10 }],
      });

      expect(data.getRawDataItem(0)).to.include({ name: 'Value 10' });
    });
  });

  describe('label values', () => {
    it('uses a string label', () => {
      const data = createModel().getInitialData({ data: [{ label: 'Apples', value: 10 }] });

      expect(data.getRawDataItem(0)).to.include({ label: 'Apples' });
    });

    it('uses the data value as a string when a label is not set', () => {
      const data = createModel().getInitialData({ data: [{ value: 10 }] });

      expect(data.getRawDataItem(0)).to.include({ label: '10' });
    });

    it('keeps an explicitly undefined label', () => {
      const data = createModel().getInitialData({ data: [{ label: undefined, value: 10 }] });

      expect(data.getRawDataItem(0)).to.have.property('label', undefined);
    });

    it('resolves a label callback with the data value', () => {
      const data = createModel().getInitialData({
        data: [{ label: (value) => `Value ${value}`, value: 10 }],
      });

      expect(data.getRawDataItem(0)).to.include({ label: 'Value 10' });
    });
  });

  it('sanitizes non-finite values and uses explicit text values', () => {
    const model = createModel();
    const data = model.getInitialData({
      data: [
        Number.NaN,
        { value: Number.POSITIVE_INFINITY },
      ],
    });

    expect(data.getRawDataItem(0)).to.deep.equal({ label: '0', value: 0 });
    expect(data.getRawDataItem(1)).to.deep.equal({ label: '0', value: 0 });
  });
});
