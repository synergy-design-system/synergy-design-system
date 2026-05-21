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

describe('prompt contract', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('exposes expected prompt names via listPrompts', async () => {
    const result = await session.client.listPrompts();
    const names = result.prompts.map((prompt) => prompt.name);

    assert.ok(
      names.includes('explain-component-rules'),
      'Expected prompt "explain-component-rules" to be registered.',
    );
  });
});
