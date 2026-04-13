import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, it } from 'node:test';
import { expect } from 'chai';

describe('storybook source configs', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * Keep runtime import path dynamic for integration tests, but type it statically
   * so editor IntelliSense understands the exported symbols.
   *
   * @returns {Promise<typeof import('../../dist/internal/collectors/storybook/source/configs.js')>}
   */
  const loadStorybookSourceConfigs = async () => {
    const modulePath = path.join(
      metadataPackageDir,
      'dist',
      'internal',
      'collectors',
      'storybook',
      'source',
      'configs.js',
    );
    return import(modulePath);
  };

  it('maps component/style/template stories to expected entity ids and discovers all groups', async () => {
    const {
      componentScrapingConfig,
      stylesScrapingConfig,
      templateScrapingConfig,
    } = await loadStorybookSourceConfigs();

    expect(componentScrapingConfig.generateEntityId('syn-alert')).to.equal('component:syn-alert');
    expect(stylesScrapingConfig.generateEntityId('syn-link')).to.equal('style:syn-link');
    expect(templateScrapingConfig.generateEntityId('appshell')).to.equal('template:appshell');

    const componentItems = await componentScrapingConfig.getItems();
    const styleItems = await stylesScrapingConfig.getItems();
    const templateItems = await templateScrapingConfig.getItems();

    expect(componentItems.length).to.be.greaterThan(0);
    expect(styleItems.length).to.be.greaterThan(0);
    expect(templateItems.length).to.be.greaterThan(0);

    expect(styleItems.every((item) => stylesScrapingConfig.generateEntityId(item).startsWith('style:syn-'))).to.equal(true);
    expect(templateItems).to.include('appshell');
    expect(templateItems).to.include('forms');
  });
});
