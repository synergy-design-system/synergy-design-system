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

  it('resolves alias "components" to "basic-elements"', async () => {
    const listResponse = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'davinci-migration-list',
    });
    const typedList = toToolResponse(listResponse);
    const components = parseJsonContent<string[]>(typedList, 0);
    assert.ok(components.length > 0);

    // Get response using alias "components"
    const responseWithAlias = await session.client.callTool({
      arguments: {
        component: components[0],
        package: 'components',
      },
      name: 'davinci-migration-info',
    });

    // Get response using official name "basic-elements"
    const responseWithOfficialName = await session.client.callTool({
      arguments: {
        component: components[0],
        package: 'basic-elements',
      },
      name: 'davinci-migration-info',
    });

    const typedResponseAlias = toToolResponse(responseWithAlias);
    const typedResponseOfficial = toToolResponse(responseWithOfficialName);

    // Both should return the same content
    assert.deepEqual(
      typedResponseAlias.content[0].text,
      typedResponseOfficial.content[0].text,
      'Both alias and official name should return identical results',
    );
  });
});
