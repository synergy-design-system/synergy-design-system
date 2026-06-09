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

describe('create-spritesheet tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('creates a sprite sheet for a given set of icons', async () => {
    const response = await session.client.callTool({
      arguments: {
        icons: ['home', 'settings', 'user'],
      },
      name: 'create-spritesheet',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const [spriteSheetContent] = typedResponse.content;
    assert.equal(spriteSheetContent.type, 'text');
    assert.match(spriteSheetContent.text, /<svg/i);
  });
});
