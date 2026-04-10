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

describe('setup tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns setup documentation for components package', async () => {
    const response = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'setup',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.ok(typedResponse.content.length > 0);

    const combined = typedResponse.content.map(c => c.text).join('\n');
    assert.match(combined, /Prerequisites|Icons|components/i);
  });
});
