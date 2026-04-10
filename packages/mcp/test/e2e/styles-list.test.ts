import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { type Client } from '@modelcontextprotocol/sdk/client/index.js';
import { startClient, stopClient } from './harness.ts';

let client: Client;

before(async () => {
  client = await startClient();
});

after(async () => {
  await stopClient();
});

test('styles-list returns rules and style names over stdio', async () => {
  const response = await client.callTool({
    name: 'styles-list',
    arguments: {},
  });

  assert.ok(Array.isArray(response.content));
  assert.equal(response.content.length, 2);

  const [rulesContent, listContent] = response.content;
  assert.equal(rulesContent.type, 'text');
  assert.match(rulesContent.text, /Rules for chatbots and llms/i);

  assert.equal(listContent.type, 'text');
  const styleNames = JSON.parse(listContent.text) as string[];
  assert.ok(Array.isArray(styleNames));
  assert.ok(styleNames.includes('syn-body'));
});
