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
});
