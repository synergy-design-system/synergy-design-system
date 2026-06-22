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

describe('tokens-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns token types and themes', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'tokens-list',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const payload = parseJsonContent<{
      defaults: {
        tokenInfo: {
          theme: string;
          tokenScope: string;
          type: string;
        };
      };
      supportedScopes: string[];
      supportedTypes: string[];
      themes: string[];
    }>(typedResponse, 0);

    assert.ok(Array.isArray(payload.supportedTypes));
    assert.ok(payload.supportedTypes.includes('css'));
    assert.ok(Array.isArray(payload.themes));

    assert.ok(Array.isArray(payload.supportedScopes));
    assert.ok(payload.supportedScopes.includes('components'));
    assert.ok(payload.supportedScopes.includes('charts'));

    assert.ok(payload.defaults?.tokenInfo);
    assert.equal(payload.defaults.tokenInfo.theme, 'sick2025-light');
    assert.equal(payload.defaults.tokenInfo.tokenScope, 'components');
    assert.equal(payload.defaults.tokenInfo.type, 'css');
  });
});
