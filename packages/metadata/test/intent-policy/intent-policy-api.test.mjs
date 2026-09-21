import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('intent policy api (separate from integration tests)', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const metadataPackageDir = path.resolve(__dirname, '..', '..');

  /**
   * @returns {Promise<typeof import('../../dist/index.js')>}
   */
  const loadPublicApi = async () => {
    const modulePath = path.join(metadataPackageDir, 'dist', 'index.js');
    return import(modulePath);
  };

  const createFixtureDataDir = async () => {
    // Use the actual built metadata directory for integration testing
    return {
      cleanup: async () => {
        // No cleanup needed for actual metadata directory
      },
      dataDir: path.resolve(metadataPackageDir, 'data'),
    };
  };

  it('lists intent categories and intents via explicit opt-in API', async () => {
    const { listIntentCategories, listIntents } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const categories = await listIntentCategories({ dataDir: fixture.dataDir });
      assert.strictEqual(categories.errors, undefined);
      assert.ok(categories.data.map((entry) => entry.id).includes('action'));
      assert.ok(categories.data.map((entry) => entry.id).includes('structure'));

      const actionIntents = await listIntents({ category: 'action' }, { dataDir: fixture.dataDir });
      assert.strictEqual(actionIntents.errors, undefined);
      assert.ok(actionIntents.data.every((entry) => entry.category === 'action'));
      assert.ok(actionIntents.data.map((entry) => entry.id).includes('action.submit'));
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves property-based intent presets for syn-button', async () => {
    const { resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await resolveIntent({
        target: { id: 'component:syn-button', kind: 'component', name: 'syn-button' },
        intent: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data?.architecture, 'Intent Policy Layer');
      assert.strictEqual(response.data?.process, 'Intent Resolution');
      assert.strictEqual(response.data?.output, 'Usage Pattern / Preset');
      assert.strictEqual(response.data?.pattern.structure?.component, 'syn-button');
      assert.ok(Array.isArray(response.data?.pattern.structure?.config?.propRules));
      const submitRule = response.data?.pattern.structure?.config?.propRules?.find(r => r.prop === 'type');
      assert.strictEqual(submitRule?.value, 'submit');
      const hrefRule = response.data?.pattern.structure?.config?.propRules?.find(r => r.prop === 'href');
      assert.strictEqual(hrefRule?.kind, 'forbidden');
    } finally {
      await fixture.cleanup();
    }
  });

  it('resolves structural usage patterns for confirmation dialogs', async () => {
    const { resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const response = await resolveIntent({
        target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
        intent: 'structure.confirmation',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(response.errors, undefined);
      assert.notStrictEqual(response.data, null);
      assert.strictEqual(response.data?.pattern.structure?.component, 'syn-dialog');
      assert.strictEqual(response.data?.pattern.structure?.children?.[0]?.slot, 'footer');
      const confirmButton = response.data?.pattern.structure?.children?.[0]?.children?.[1];
      assert.strictEqual(confirmButton?.component, 'syn-button');
      const variantRule = confirmButton?.config?.propRules?.find(r => r.prop === 'variant');
      assert.strictEqual(variantRule?.value, 'filled');
    } finally {
      await fixture.cleanup();
    }
  });

  it('returns deterministic errors for unknown or incompatible queries', async () => {
    const { getTargetCapabilities, resolveIntent } = await loadPublicApi();
    const fixture = await createFixtureDataDir();

    try {
      const unknownComponent = await getTargetCapabilities({id: 'component:syn-unknown', kind: 'component', name: 'syn-unknown'}, { dataDir: fixture.dataDir });
      assert.strictEqual(unknownComponent.data, null);
      assert.strictEqual(unknownComponent.errors?.[0]?.code, 'NOT_FOUND');

      const incompatible = await resolveIntent({
        target: { id: 'component:syn-dialog', kind: 'component', name: 'syn-dialog' },
        intent: 'action.submit',
      }, {
        dataDir: fixture.dataDir,
      });

      assert.strictEqual(incompatible.data, null);
      assert.strictEqual(incompatible.errors?.[0]?.code, 'INVALID_QUERY');
    } finally {
      await fixture.cleanup();
    }
  });
});
