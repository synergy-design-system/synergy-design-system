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

describe('component-category-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns available component categories', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'component-category-list',
    });

    const typedResponse = toToolResponse(response);
    const categories = parseJsonContent<Array<{
      description?: string;
      id: string;
      name: string;
    }>>(typedResponse, typedResponse.content.length - 1);

    assert.ok(Array.isArray(categories));
    assert.ok(categories.length > 0);
    assert.ok(typeof categories[0]?.id === 'string');
    assert.ok(typeof categories[0]?.name === 'string');
    if (categories[0]?.description !== undefined) {
      assert.ok(typeof categories[0].description === 'string');
    }
  });
});
