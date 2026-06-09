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
} from '../utilities/index.ts';

let session: ClientSession;

describe('create-spritesheet prompt', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns instructions for creating a sprite sheet', async () => {
    const result = await session.client.getPrompt({
      arguments: {
        folder: 'src/icons',
        name: 'custom-icons',
      },
      name: 'create-spritesheet',
    });

    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0]?.role, 'assistant');

    const promptText = result.messages[0]?.content.type === 'text'
      ? result.messages[0].content.text
      : '';

    assert.match(promptText, /You are working with a Synergy Design System project./);
    assert.match(promptText, /Generate an SVG sprite sheet for all synergy icons used in the folder "src\/icons"./);
    assert.match(promptText, /registerIconLibrary\('custom-icons',/);
  });
});
