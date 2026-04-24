import assert from 'node:assert/strict';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import {
  type ClientSession,
  createClientSession,
} from '../utilities/index.ts';

const RESOURCE_URI = 'synergy://templates/list';

let session: ClientSession;

describe('templates-list resource', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('is listed in resources/list', async () => {
    const response = await session.client.listResources();
    const uris = response.resources.map(r => r.uri);
    assert.ok(uris.includes(RESOURCE_URI), `Expected ${RESOURCE_URI} in resources list`);
  });

  it('returns a flat array of templates', async () => {
    const response = await session.client.readResource({ uri: RESOURCE_URI }) as ReadResourceResult;

    assert.equal(response.contents.length, 1);
    const [content] = response.contents;
    assert.equal(content.uri, RESOURCE_URI);
    assert.equal(content.mimeType, 'application/json');
    assert.ok('text' in content, 'Expected text content');

    const templates = JSON.parse(content.text) as unknown;
    assert.ok(Array.isArray(templates), 'Expected an array');
    assert.ok(templates.length > 0, 'Expected at least one template');
  });
});
