import {
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
});
