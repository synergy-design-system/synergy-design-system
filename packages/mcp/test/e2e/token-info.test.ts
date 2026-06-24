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

describe('token-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns raw token file content and rules', async () => {
    const response = await session.client.callTool({
      arguments: {
        theme: 'sick2025-light',
        tokenScope: 'components',
        type: 'css',
      },
      name: 'token-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 2);

    const [rulesContent, listContent] = typedResponse.content;
    assert.equal(rulesContent.type, 'text');
    assert.match(rulesContent.text, /Rules for chatbots and llms/i);

    assert.equal(listContent.type, 'text');
    assert.match(listContent.text, /--syn-input-color/i);
  });

  it('returns chart tokens when tokenScope is "charts"', async () => {
    const response = await session.client.callTool({
      arguments: {
        theme: 'sick2025-light',
        tokenScope: 'charts',
        type: 'css',
      },
      name: 'token-info',
    });
    const typedResponse = toToolResponse(response);
    const listContent = typedResponse.content[1];

    assert.equal(listContent.type, 'text');
    assert.match(listContent.text, /--syn-chart-categorical-/i);
  });

  it('falls back to sick2025-light when sick2018-light is requested with tokenScope "charts"', async () => {
    const sick2018Response = await session.client.callTool({
      arguments: {
        theme: 'sick2018-light',
        tokenScope: 'charts',
        type: 'css',
      },
      name: 'token-info',
    });
    const sick2025Response = await session.client.callTool({
      arguments: {
        theme: 'sick2025-light',
        tokenScope: 'charts',
        type: 'css',
      },
      name: 'token-info',
    });

    const sick2018Typed = toToolResponse(sick2018Response);
    const sick2025Typed = toToolResponse(sick2025Response);

    // Both should return the same token content since sick2018 falls back to sick2025
    const sick2018Content = sick2018Typed.content.map((c) => c.text).join('\n');
    const sick2025Content = sick2025Typed.content.map((c) => c.text).join('\n');
    assert.equal(sick2018Content, sick2025Content);
  });

  it('falls back to sick2025-dark when sick2018-dark is requested with tokenScope "charts"', async () => {
    const sick2018Response = await session.client.callTool({
      arguments: {
        theme: 'sick2018-dark',
        tokenScope: 'charts',
        type: 'css',
      },
      name: 'token-info',
    });
    const sick2025Response = await session.client.callTool({
      arguments: {
        theme: 'sick2025-dark',
        tokenScope: 'charts',
        type: 'css',
      },
      name: 'token-info',
    });

    const sick2018Typed = toToolResponse(sick2018Response);
    const sick2025Typed = toToolResponse(sick2025Response);

    const sick2018Content = sick2018Typed.content.map((c) => c.text).join('\n');
    const sick2025Content = sick2025Typed.content.map((c) => c.text).join('\n');
    assert.equal(sick2018Content, sick2025Content);
  });
});
