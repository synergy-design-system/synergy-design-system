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
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('davinci-migration-info tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns migration section for a known DaVinci component', async () => {
    const listResponse = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'davinci-migration-list',
    });
    const typedList = toToolResponse(listResponse);
    const components = parseJsonContent<string[]>(typedList, 0);
    assert.ok(components.length > 0);

    const response = await session.client.callTool({
      arguments: {
        component: components[0],
        package: 'components',
      },
      name: 'davinci-migration-info',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);
    assert.ok(typedResponse.content[0].text.length > 0);
  });
});
