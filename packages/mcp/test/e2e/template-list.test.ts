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

describe('template-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and template names', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'template-list',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 2);

    const [rulesContent, listContent] = typedResponse.content;
    assert.equal(rulesContent.type, 'text');
    assert.match(rulesContent.text, /Rules for chatbots and llms/i);

    assert.equal(listContent.type, 'text');
    assert.match(listContent.text, /Appshell|Footer|Table/i);
  });
});
