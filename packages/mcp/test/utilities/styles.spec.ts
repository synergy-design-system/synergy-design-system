import {
  getAvailableStyles,
  getStylesMetaData,
} from '../../src/utilities/styles.js';

describe('when using the styles metadata utilities', () => {
  describe('getStylesMetaData', () => {
    it('should return the correct metadata for a given style', async () => {
      const metadata = await getStylesMetaData();
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('README.md');
      expect(filesThatAreRead).toContain('CHANGELOG.md');
    });
  });

  describe('getAvailableStyles', () => {
    it('should return a list of available styles', async () => {
      const metadata = await getAvailableStyles();
      expect(metadata).not.toHaveLength(0);

      expect(metadata).toContain('link-list');
      expect(metadata).toContain('link');
      expect(metadata).toContain('tables');
      expect(metadata).toContain('typography');
    });
  });
});
