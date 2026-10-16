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

describe('modern stdio protocol', () => {
  let modernSession: ClientSession;

  before(async () => {
    modernSession = await createClientSession({ modern: true });
  });

  after(async () => {
    await modernSession?.close();
  });

  it('negotiates 2026-07-28 and serves tools, resources and prompts', async () => {
    const { client } = modernSession;
    assert.equal(client.getProtocolEra(), 'modern');
    assert.equal(client.getNegotiatedProtocolVersion(), '2026-07-28');
    const { tools } = await client.listTools();
    assert.ok(tools.some(tool => tool.name === 'component-list'));
    const response = await client.callTool({ arguments: {}, name: 'component-list' });
    assert.ok(response.content.length > 0);
    const { resources } = await client.listResources();
    assert.ok(resources.length > 0);
    const resource = await client.readResource({ uri: resources[0].uri });
    assert.ok(resource.contents.length > 0);
    const prompt = await client.getPrompt({
      arguments: { component: 'syn-button' },
      name: 'explain-component-rules',
    });
    assert.ok(prompt.messages.length > 0);
  });
});
