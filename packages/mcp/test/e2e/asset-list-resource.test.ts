import assert from 'node:assert/strict';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import type { ReadResourceResult } from '@modelcontextprotocol/sdk/types.js';
import { encodeToToon } from '../../src/utilities/compression.ts';
import {
  type ClientSessionOptions,
  type ClientSession,
  createClientSession,
} from '../utilities/index.ts';

const RESOURCE_URI = 'synergy://assets/list';

let session: ClientSession;

const createSession = (options: ClientSessionOptions = {}): Promise<ClientSession> => createClientSession(options);

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-resource-test-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

describe('asset-list resource', () => {
  before(async () => {
    session = await createSession();
  });

  after(async () => {
    await session.close();
  });

  it('is listed in resources/list', async () => {
    const response = await session.client.listResources();
    const uris = response.resources.map(r => r.uri);
    assert.ok(uris.includes(RESOURCE_URI), `Expected ${RESOURCE_URI} in resources list`);
  });

  it('returns a flat array of icon sets', async () => {
    const response = await session.client.readResource({ uri: RESOURCE_URI }) as ReadResourceResult;

    assert.equal(response.contents.length, 1);
    const [content] = response.contents;
    assert.equal(content.uri, RESOURCE_URI);
    assert.equal(content.mimeType, 'application/json');
    assert.ok('text' in content, 'Expected text content');

    const assets = JSON.parse(content.text) as unknown;
    assert.ok(Array.isArray(assets), 'Expected an array');
    assert.ok(assets.length > 0, 'Expected at least one asset');
  });

  it('returns toon payload when compression is enabled', async () => {
    const baselineResponse = await session.client.readResource({ uri: RESOURCE_URI }) as ReadResourceResult;
    assert.equal(baselineResponse.contents.length, 1);
    const [baselineContent] = baselineResponse.contents;
    assert.ok('text' in baselineContent, 'Expected baseline text content');
    const parsedToJson = JSON.parse(baselineContent.text) as unknown;

    const configPath = await writeTempConfig({ compression: 'toon' });
    const compressedSession = await createSession({
      configPath,
    });

    try {
      const response = await compressedSession.client.readResource({ uri: RESOURCE_URI }) as ReadResourceResult;

      assert.equal(response.contents.length, 1);
      const [content] = response.contents;
      assert.equal(content.uri, RESOURCE_URI);
      assert.equal(content.mimeType, 'application/json');
      assert.ok('text' in content, 'Expected text content');

      const expectedToon = await encodeToToon(parsedToJson);
      assert.equal(content.text, expectedToon);
    } finally {
      await compressedSession.close();
      await unlink(configPath).catch(() => {
        // Ignore cleanup errors in tests.
      });
    }
  });
});
