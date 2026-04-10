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

describe('davinci-migration-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns list of DaVinci components with migration docs', async () => {
    const response = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'davinci-migration-list',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const components = parseJsonContent<string[]>(typedResponse, 0);
    assert.ok(Array.isArray(components));
    assert.ok(components.length > 0);
  });
});
