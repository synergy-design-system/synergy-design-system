import {
  getStructuredMetaData,
  getStructuredMetaDataForComponent,
} from '../../src/utilities/metadata.js';

describe('when using the metadata utilities', () => {
  describe('getStructuredMetaData', () => {
    it('should return the correct metadata for a given asset', async () => {
      const metadata = await getStructuredMetaData('../../test/utilities/testdata');
      expect(metadata).toHaveLength(2);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('README.md');
      expect(filesThatAreRead).toContain('Othercontent.ts');
    });
  });

  describe('getStructuredMetaDataForComponent', () => {
    it('should return the correct metadata for a given component without applied filter', async () => {
      const metadata = await getStructuredMetaDataForComponent('syn-button');
      expect(metadata.length).toBeGreaterThan(3);

      const filesThatAreRead = metadata.map(file => file!.filename);

      // Check for the defaults
      expect(filesThatAreRead).toContain('component.angular.ts');
      expect(filesThatAreRead).toContain('component.react.ts');
      expect(filesThatAreRead).toContain('component.ts');
      expect(filesThatAreRead).toContain('component.vue');
    });

    it('should return the correct metadata for a given component with a custom filter applied', async () => {
      const metadata = await getStructuredMetaDataForComponent(
        'syn-button',
        (filename) => filename.endsWith('.ts') && !filename.includes('angular'),
      );
      expect(metadata.length).toBeGreaterThan(3);

      const filesThatAreRead = metadata.map(file => file!.filename);

      // Check for the defaults
      expect(filesThatAreRead).not.toContain('component.angular.ts');
      expect(filesThatAreRead).toContain('component.react.ts');
      expect(filesThatAreRead).toContain('component.ts');
      expect(filesThatAreRead).not.toContain('component.vue');
    });
  });
});
