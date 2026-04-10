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
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('token-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns raw token file content', async () => {
    const response = await session.client.callTool({
      arguments: {
        theme: 'sick2025-light',
        type: 'css',
      },
      name: 'token-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.ok(typedResponse.content.length > 0);
    assert.ok(typedResponse.content[0].text.length > 0);
  });
});
