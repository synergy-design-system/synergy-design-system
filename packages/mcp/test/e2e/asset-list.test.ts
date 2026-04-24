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
  expectRulesPreface,
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('asset-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and grouped iconsets', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'asset-list',
    });
    const typedResponse = toToolResponse(response);

    assert.equal(typedResponse.content.length, 2);

    expectRulesPreface(typedResponse);
    const groupedAssets = parseJsonContent<Record<string, unknown>>(typedResponse, 1);
    assert.equal(typeof groupedAssets, 'object');
    assert.ok(Object.keys(groupedAssets).length > 0);
  });
});
