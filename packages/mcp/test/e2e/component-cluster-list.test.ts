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
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('component-cluster-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns available component clusters', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'component-cluster-list',
    });

    const typedResponse = toToolResponse(response);
    const clusters = parseJsonContent<Array<{
      description?: string;
      id: string;
      name: string;
    }>>(typedResponse, typedResponse.content.length - 1);

    assert.ok(Array.isArray(clusters));
    assert.ok(clusters.length > 0);
    assert.ok(typeof clusters[0]?.id === 'string');
    assert.ok(typeof clusters[0]?.name === 'string');
    if (clusters[0]?.description !== undefined) {
      assert.ok(typeof clusters[0].description === 'string');
    }
  });
});
