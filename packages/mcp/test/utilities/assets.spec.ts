import { getAssetsMetaData } from '../../src/utilities/assets.js';

describe('when using the assets metadata utilities', () => {
  describe('getAssetsMetaData', () => {
    it('should return the correct metadata for a given asset', async () => {
      const metadata = await getAssetsMetaData();
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('README.md');
      expect(filesThatAreRead).toContain('CHANGELOG.md');
    });
  });
});
