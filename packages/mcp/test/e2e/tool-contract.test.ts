import assert from 'node:assert/strict';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
} from '../utilities/index.ts';

const INTENT_RESOURCE_URI = 'synergy://intent-categories/list';

let session: ClientSession;

describe('tool contract', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('exposes expected tool names via listTools', async () => {
    const result = await session.client.listTools();
    const names = result.tools.map((tool) => tool.name);

    const expected = [
      'asset-info',
      'asset-list',
      'component-cluster-list',
      'component-info',
      'component-list',
      'davinci-migration-info',
      'davinci-migration-list',
      'migration-info',
      'migration-list',
      'setup',
      'styles-info',
      'styles-list',
      'template-info',
      'template-list',
      'token-info',
      'tokens-list',
    ];

    expected.forEach((name) => {
      assert.ok(names.includes(name), `Expected tool "${name}" to be registered.`);
    });

    const expectedIntentTools = [
      'intent-categories-list',
      'intent-component-guide',
      'intent-component-validate',
      'intent-options',
      'intent-task-recommendations',
    ];

    expectedIntentTools.forEach((name) => {
      assert.ok(names.includes(name), `Expected intent tool "${name}" to be registered by default.`);
    });
  });

  it('exposes intent resources via listResources by default', async () => {
    const result = await session.client.listResources();
    const uris = result.resources.map((resource) => resource.uri);

    assert.ok(uris.includes(INTENT_RESOURCE_URI), `Expected intent resource "${INTENT_RESOURCE_URI}" to be registered by default.`);
  });
});
