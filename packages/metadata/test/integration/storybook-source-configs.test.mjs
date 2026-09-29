import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

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

    assert.strictEqual(componentScrapingConfig.generateEntityId('syn-alert'), 'component:syn-alert');
    assert.strictEqual(stylesScrapingConfig.generateEntityId('syn-link'), 'style:syn-link');
    assert.strictEqual(templateScrapingConfig.generateEntityId('appshell'), 'template:appshell');

    const componentItems = await componentScrapingConfig.getItems();
    const styleItems = await stylesScrapingConfig.getItems();
    const templateItems = await templateScrapingConfig.getItems();

    assert.ok(componentItems.length > 0);
    assert.ok(styleItems.length > 0);
    assert.ok(templateItems.length > 0);

    assert.ok(styleItems.every((item) => stylesScrapingConfig.generateEntityId(item).startsWith('style:syn-')));
    assert.deepStrictEqual(componentScrapingConfig.generateStoryIds('syn-accordion'), ['components-syn-accordion--docs']);
    assert.deepStrictEqual(componentScrapingConfig.generateStoryIds('syn-alert'), ['components-syn-alert--docs']);

    const chartStoryIds = componentScrapingConfig.generateStoryIds('syn-chart');
    assert.ok(chartStoryIds.length > 0);
    assert.ok(chartStoryIds.includes('charts-syn-chart--docs'));

    assert.deepStrictEqual(componentScrapingConfig.generateStoryIds('syn-spinner'), ['components-syn-spinner--docs']);
    assert.ok(templateItems.includes('appshell'));
    assert.ok(templateItems.includes('forms'));
  });
});
