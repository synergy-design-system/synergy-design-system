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
  });
});
