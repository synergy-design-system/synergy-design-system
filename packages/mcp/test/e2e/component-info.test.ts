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
  expectSelectiveExample,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('component-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns component information with rules', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'vanilla',
      },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.ok(typedResponse.content.length >= 2);

    const [rulesContent, infoContent] = typedResponse.content;
    assert.equal(rulesContent.type, 'text');
    assert.match(rulesContent.text, /Rules for chatbots and llms/i);

    assert.equal(infoContent.type, 'text');
    assert.match(infoContent.text, /syn-button|button/i);
  });

  it('returns framework-specific rules when framework is provided', async () => {
    const response = await session.client.callTool({
      arguments: {
        component: 'syn-button',
        framework: 'react',
      },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(typedResponse.content.length >= 2);
    const allText = typedResponse.content.map((c) => c.text).join('\n');
    assert.match(allText, /react/i);
  });

  it('advertises the example ID layer constraint', async () => {
    const tools = await session.client.listTools();
    const componentInfo = tools.tools.find(tool => tool.name === 'component-info');
    assert.match(JSON.stringify(componentInfo?.inputSchema), /exampleId/);
    assert.match(JSON.stringify(componentInfo?.inputSchema), /requires layer/);
    const schema = JSON.parse(JSON.stringify(componentInfo?.inputSchema)) as { allOf: unknown[] };
    assert.deepEqual(schema.allOf, [{
      if: { properties: { exampleId: { minLength: 1 } }, required: ['exampleId'] },
      then: { properties: { layer: { const: 'examples' } }, required: ['layer'] },
    }]);
  });

  it('returns a selected example and reports unknown IDs', async () => {
    await expectSelectiveExample(
      session,
      'component-list-examples',
      'component-info',
      { component: 'syn-chart' },
      { layer: 'examples' },
    );
  });

  it('treats an empty example ID like an omitted ID for every layer', async () => {
    for (const layer of [undefined, 'examples', 'interface', 'full', 'rules']) {
      const args = { component: 'syn-button', ...(layer ? { layer } : {}) };
      const omitted = await session.client.callTool({ arguments: args, name: 'component-info' });
      const empty = await session.client.callTool({ arguments: { ...args, exampleId: '' }, name: 'component-info' });
      assert.notEqual(empty.isError, true);
      assert.deepEqual(empty.content, omitted.content);
    }
  });

  it('rejects example IDs without an explicit examples layer', async () => {
    for (const layer of [undefined, 'interface', 'full', 'rules']) {
      const response = await session.client.callTool({
        arguments: { component: 'syn-button', exampleId: 'some-id', ...(layer ? { layer } : {}) },
        name: 'component-info',
      });
      assert.equal(response.isError, true);
      assert.match(JSON.stringify(response.content), /exampleId requires layer: examples/);
    }
  });
});
