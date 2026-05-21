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

describe('explain-component-rules prompt', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules markdown for a known component', async () => {
    const result = await session.client.getPrompt({
      arguments: {
        component: 'syn-accordion',
      },
      name: 'explain-component-rules',
    });

    assert.equal(result.messages.length, 2);
    assert.equal(result.messages[0]?.role, 'assistant');
    assert.equal(result.messages[1]?.role, 'assistant');

    const promptText = result.messages[1]?.content.type === 'text'
      ? result.messages[1].content.text
      : '';

    assert.match(promptText, /# syn-accordion/);
    assert.match(promptText, /## Common Use Cases/);
    assert.match(promptText, /## Usage Guidelines/);
    assert.match(promptText, /## Accessibility/);
    assert.ok(!promptText.includes('relevantLayerCode'));
  });
});
