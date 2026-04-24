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
  expectRulesPreface,
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

let session: ClientSession;

describe('component-list tool', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('returns rules and component names', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'component-list',
    });
    const typedResponse = toToolResponse(response);

    assert.equal(typedResponse.content.length, 2);

    expectRulesPreface(typedResponse);
    const componentNames = parseJsonContent<string[]>(typedResponse, 1);
    assert.ok(Array.isArray(componentNames));
    assert.ok(componentNames.includes('syn-button'));
  });

  it('can filter by category', async () => {
    const clustersResponse = await session.client.callTool({
      arguments: {
      },
      name: 'component-category-list',
    });

    const typedClustersResponse = toToolResponse(clustersResponse);
    const clustersIndex = typedClustersResponse.content.length - 1;
    const clusters = parseJsonContent<Array<{ id: string }>>(typedClustersResponse, clustersIndex);
    assert.ok(Array.isArray(clusters));
    assert.ok(clusters.length > 0);

    const targetCluster = clusters[0]?.id;
    assert.ok(typeof targetCluster === 'string' && targetCluster.length > 0);

    const filteredResponse = await session.client.callTool({
      arguments: {
        cluster: targetCluster,
      },
      name: 'component-list',
    });

    const typedFiltered = toToolResponse(filteredResponse);
    assert.equal(typedFiltered.content.length, 2);

    const filteredNames = parseJsonContent<string[]>(typedFiltered, 1);
    assert.ok(Array.isArray(filteredNames));
    assert.ok(filteredNames.length > 0);
    assert.ok(filteredNames.every((name) => name.startsWith('syn-')));
  });

  it('returns available clusters when an unknown cluster is requested', async () => {
    const response = await session.client.callTool({
      arguments: {
        category: 'components-by-tag/does-not-exist',
      },
      name: 'component-list',
    });

    const typedResponse = toToolResponse(response);
    const payloadIndex = typedResponse.content.length - 1;
    const payload = parseJsonContent<{ availableClusters: string[]; error: string }>(typedResponse, payloadIndex);
    assert.ok(payload.error.includes('Unknown cluster'));
    assert.ok(Array.isArray(payload.availableClusters));
    assert.ok(payload.availableClusters.length > 0);
  });
});
