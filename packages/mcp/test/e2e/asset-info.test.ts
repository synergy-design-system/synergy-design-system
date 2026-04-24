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

describe('asset-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and filtered icon data', async () => {
    const response = await session.client.callTool({
      arguments: {
        filter: 'home',
        iconset: 'current',
        limit: 5,
      },
      name: 'asset-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 2);

    const [rulesContent] = typedResponse.content;
    assert.equal(rulesContent.type, 'text');
    assert.match(rulesContent.text, /Rules for chatbots and llms/i);

    const groupedIcons = parseJsonContent<Record<string, unknown>>(typedResponse, 1);
    assert.equal(typeof groupedIcons, 'object');
  });
});
