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

const expectedResources = [
  'synergy://assets/list',
  'synergy://component-clusters/list',
  'synergy://components/list',
  'synergy://intent-categories/list',
  'synergy://styles/list',
  'synergy://templates/list',
];

let session: ClientSession;

describe('resource contract', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('exposes consistent discovery index metadata', async () => {
    const result = await session.client.listResources();
    expectedResources.forEach((uri) => {
      const resource = result.resources.find((entry) => entry.uri === uri);
      assert.ok(resource, `Expected resource "${uri}" to be registered.`);
      assert.match(resource.title ?? '', /^Synergy .+ index$/);
      assert.match(resource.description ?? '', /^Static JSON index of Synergy|^Static JSON index of registered Synergy/);
      assert.equal(resource.mimeType, 'application/json');
    });
  });
});
