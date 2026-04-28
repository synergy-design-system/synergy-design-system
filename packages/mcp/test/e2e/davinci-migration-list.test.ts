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

describe('davinci-migration-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns list of DaVinci components with migration docs', async () => {
    const response = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'davinci-migration-list',
    });
    const typedResponse = toToolResponse(response);

    assert.ok(Array.isArray(typedResponse.content));
    assert.equal(typedResponse.content.length, 1);

    const components = parseJsonContent<string[]>(typedResponse, 0);
    assert.ok(Array.isArray(components));
    assert.ok(components.length > 0);
  });

  it('resolves alias "components" to "basic-elements" with identical results', async () => {
    // Get list using alias "components"
    const responseWithAlias = await session.client.callTool({
      arguments: {
        package: 'components',
      },
      name: 'davinci-migration-list',
    });

    // Get list using official name "basic-elements"
    const responseWithOfficialName = await session.client.callTool({
      arguments: {
        package: 'basic-elements',
      },
      name: 'davinci-migration-list',
    });

    const typedResponseAlias = toToolResponse(responseWithAlias);
    const typedResponseOfficial = toToolResponse(responseWithOfficialName);

    const componentsAlias = parseJsonContent<string[]>(typedResponseAlias, 0);
    const componentsOfficial = parseJsonContent<string[]>(typedResponseOfficial, 0);

    // Both should return the same components
    assert.deepEqual(
      componentsAlias,
      componentsOfficial,
      'Both alias and official name should return identical component lists',
    );
  });

  it('resolves alias "charts" to "dashboard-elements"', async () => {
    // Get list using alias "charts"
    const responseWithAlias = await session.client.callTool({
      arguments: {
        package: 'charts',
      },
      name: 'davinci-migration-list',
    });

    // Get list using official name "dashboard-elements"
    const responseWithOfficialName = await session.client.callTool({
      arguments: {
        package: 'dashboard-elements',
      },
      name: 'davinci-migration-list',
    });

    const typedResponseAlias = toToolResponse(responseWithAlias);
    const typedResponseOfficial = toToolResponse(responseWithOfficialName);

    const chartsAlias = parseJsonContent<string[]>(typedResponseAlias, 0);
    const chartsOfficial = parseJsonContent<string[]>(typedResponseOfficial, 0);

    // Both should return the same results
    assert.deepEqual(
      chartsAlias,
      chartsOfficial,
      'Both "charts" alias and "dashboard-elements" should return identical results',
    );
  });
});
