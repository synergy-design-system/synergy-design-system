import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { toToolResponse } from './assertions.ts';
import type { ClientSession } from './harness.ts';

type ExampleEntry = { description: string; id: string; title: string };

const readExamples = (response: unknown): ExampleEntry[] => {
  const result = JSON.parse(toToolResponse(response).content[0].text) as { examples: ExampleEntry[] };
  assert.ok(result.examples.length > 1);
  assert.ok(result.examples[0].id && result.examples[0].title);
  assert.equal(typeof result.examples[0].description, 'string');
  return result.examples;
};

export const expectIndividuallyRegisteredExampleTool = async (
  register: (server: McpServer) => void,
  name: string,
  args: Record<string, string>,
): Promise<void> => {
  const server = new McpServer({ name: 'example-test', version: '1.0.0' });
  const client = new Client({ name: 'example-client', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  register(server);
  try {
    await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
    assert.deepEqual((await client.listTools()).tools.map(tool => tool.name), [name]);
    readExamples(await client.callTool({ arguments: args, name }));
  } finally {
    await client.close();
    await server.close();
  }
};

export const expectSelectiveExample = async (
  session: ClientSession,
  list: string,
  info: string,
  args: Record<string, string>,
  infoArgs: Record<string, string> = {},
): Promise<void> => {
  const listing = await session.client.callTool({ arguments: args, name: list });
  const exampleId = readExamples(listing)[0].id;
  const selected = toToolResponse(await session.client.callTool({
    arguments: { ...args, ...infoArgs, exampleId },
    name: info,
  }));
  const all = toToolResponse(await session.client.callTool({
    arguments: { ...args, ...infoArgs },
    name: info,
  }));
  const selectedText = selected.content.map(entry => entry.text).join('\n');
  const allText = all.content.map(entry => entry.text).join('\n');
  assert.match(selectedText, /```html/);
  assert.ok(selectedText.length < allText.length);
  const missing = toToolResponse(await session.client.callTool({
    arguments: { ...args, ...infoArgs, exampleId: 'not-an-example' },
    name: info,
  }));
  const missingText = missing.content.map(entry => entry.text).join('\n');
  assert.match(missingText, /not found/i);
  assert.ok(missingText.includes(list));
  const recovery = JSON.parse(missing.content.at(-1)?.text ?? '{}') as {
    availableExampleIds: string[];
  };
  assert.ok(recovery.availableExampleIds.includes(exampleId));
};
