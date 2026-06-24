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

  it('returns instructions with default values', async () => {
    const result = await session.client.getPrompt({
      arguments: {},
      name: 'create-spritesheet',
    });

    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0]?.role, 'assistant');

    const promptText = result.messages[0]?.content.type === 'text'
      ? result.messages[0].content.text
      : '';

    assert.match(promptText, /You are working with a Synergy Design System project./);
    assert.match(promptText, /Generate an SVG sprite sheet for all synergy icons used in the entire project\./);
    assert.match(promptText, /registerIconLibrary\('default',/);
    assert.match(promptText, /<syn-icon name="star"><\/syn-icon>/);
  });

  it('returns instructions with a non-default path', async () => {
    const result = await session.client.getPrompt({
      arguments: {
        name: 'custom-icons',
        path: 'src/icons',
      },
      name: 'create-spritesheet',
    });

    assert.equal(result.messages.length, 1);
    assert.equal(result.messages[0]?.role, 'assistant');

    const promptText = result.messages[0]?.content.type === 'text'
      ? result.messages[0].content.text
      : '';

    assert.match(promptText, /You are working with a Synergy Design System project./);
    assert.match(promptText, /Generate an SVG sprite sheet for all synergy icons used in src\/icons\./);
    assert.match(promptText, /registerIconLibrary\('custom-icons',/);
    assert.match(promptText, /<syn-icon library="custom-icons" name="star"><\/syn-icon>/);
  });
});
