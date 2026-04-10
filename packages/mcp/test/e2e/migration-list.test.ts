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

describe('migration-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns migration document index', async () => {
    const response = await session.client.callTool({
      arguments: {
        synergyPackage: 'components',
      },
      name: 'migration-list',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const entries = parseJsonContent<Array<{ filename: string }>>(typedResponse, 0);
    assert.ok(Array.isArray(entries));
    assert.ok(entries.some(entry => entry.filename === 'index.md'));
  });
});
