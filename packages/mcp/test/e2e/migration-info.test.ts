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

describe('migration-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns migration document details by filename', async () => {
    const response = await session.client.callTool({
      arguments: {
        filename: 'index.md',
        synergyPackage: 'components',
      },
      name: 'migration-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const payload = parseJsonContent<{ filename?: string }>(typedResponse, 0);
    assert.equal(payload.filename, 'index.md');
  });
});
