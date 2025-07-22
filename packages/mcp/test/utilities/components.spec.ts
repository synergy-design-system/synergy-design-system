import type { Framework } from '../../src/utilities/config.js';
import {
  getAvailableComponents,
  getInfoForComponent,
  getStaticMetaDataForFramework,
} from '../../src/utilities/components.js';

describe('when using the components metadata utilities', () => {
  describe('getStaticMetaDataForFramework', () => {
    it('should return the correct metadata for vanilla if the framework parameter is not provided', async () => {
      const metadata = await getStaticMetaDataForFramework();
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('README.md');
      expect(filesThatAreRead).toContain('CHANGELOG.md');
    });

    ([
      'angular',
      'react',
      'vue',
    ] as Framework[]).forEach((framework) => {
      it(`should return the correct metadata for the "${framework}" framework`, async () => {
        const metadata = await getStaticMetaDataForFramework(framework);
        expect(metadata).not.toHaveLength(0);

        const filesThatAreRead = metadata.map(file => file!.filename);
        expect(filesThatAreRead).toContain('README.md');
        expect(filesThatAreRead).not.toContain('CHANGELOG.md');
        expect(filesThatAreRead).toContain('LIMITATIONS.md');
      });
    });
  });

  describe('getInfoForComponent', () => {
    it('should return the correct metadata for a component in vanilla if no framework is provided', async () => {
      const metadata = await getInfoForComponent('syn-button');
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('component.ts');
      expect(filesThatAreRead).toContain('component.styles.ts');
      expect(filesThatAreRead).toContain('component.custom.styles.ts');
    });

    it('should return the correct metadata for a component in vanilla', async () => {
      const metadata = await getInfoForComponent('syn-button', 'vanilla');
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('component.ts');
      expect(filesThatAreRead).toContain('component.styles.ts');
      expect(filesThatAreRead).toContain('component.custom.styles.ts');
    });

    it('should return the vanilla metadata for a component if the framework is unknown', async () => {
      const metadata = await getInfoForComponent('syn-button', 'unknown' as Framework);
      expect(metadata).not.toHaveLength(0);

      const filesThatAreRead = metadata.map(file => file!.filename);
      expect(filesThatAreRead).toContain('component.ts');
      expect(filesThatAreRead).toContain('component.styles.ts');
      expect(filesThatAreRead).toContain('component.custom.styles.ts');
    });

    ([
      'angular',
      'react',
      'vue',
    ] as Framework[]).forEach((framework) => {
      it(`should return the correct metadata for the "${framework}" framework`, async () => {
        const metadata = await getInfoForComponent('syn-button', framework);
        expect(metadata).not.toHaveLength(0);

        const filesThatAreRead = metadata.map(file => file!.filename);
        expect(filesThatAreRead).toContain('component.ts');
        expect(filesThatAreRead).toContain('component.styles.ts');
        expect(filesThatAreRead).toContain('component.custom.styles.ts');

        const dynamicFrameworkFile = framework === 'vue'
          ? 'component.vue'
          : `component.${framework}.ts`;

        expect(filesThatAreRead).toContain(dynamicFrameworkFile);
      });
    });
  });

  describe('getAvailableComponents', () => {
    it('should return a list of available components', async () => {
      const metadata = await getAvailableComponents();
      expect(metadata).not.toHaveLength(0);

      expect(metadata).toContain('syn-button');
      expect(metadata).toContain('syn-card');
      expect(metadata.length).toBeGreaterThan(10);
    });
  });
});
