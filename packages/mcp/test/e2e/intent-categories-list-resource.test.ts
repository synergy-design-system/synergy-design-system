import assert from 'node:assert/strict';
import { unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
} from '../utilities/index.ts';

const RESOURCE_URI = 'synergy://intent-categories/list';

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-intent-resource-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

describe('intent-categories-list resource (default config)', () => {
  let session: ClientSession;

  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('is not listed when intent tools are disabled', async () => {
    const response = await session.client.listResources();
    const uris = response.resources.map((resource) => resource.uri);
    assert.ok(!uris.includes(RESOURCE_URI), `Did not expect ${RESOURCE_URI} in resources list`);
  });
});

describe('intent-categories-list resource (experimental intent tools enabled)', () => {
  let session: ClientSession;
  let configPath: string;

  before(async () => {
    configPath = await writeTempConfig({
      experimentalFeatures: {
        intentTools: true,
      },
    });
    session = await createClientSession({ configPath });
  });

  after(async () => {
    await session.close();
    await unlink(configPath).catch(() => {
      /* ignore cleanup errors */
    });
  });

  it('is listed in resources/list', async () => {
    const response = await session.client.listResources();
    const uris = response.resources.map((resource) => resource.uri);
    assert.ok(uris.includes(RESOURCE_URI), `Expected ${RESOURCE_URI} in resources list`);
  });

  it('returns intent categories payload as JSON', async () => {
    const response = await session.client.readResource({ uri: RESOURCE_URI });

    assert.equal(response.contents.length, 1);
    const [content] = response.contents;
    assert.equal(content.uri, RESOURCE_URI);
    assert.equal(content.mimeType, 'application/json');
    assert.ok('text' in content, 'Expected text content');

    const payload = JSON.parse(content.text) as unknown;

    if (Array.isArray(payload)) {
      assert.ok(payload.length > 0, 'Expected at least one intent category');
      assert.ok((payload as Array<{ id?: string }>).some((entry) => entry.id === 'action'));
      return;
    }

    assert.ok(payload && typeof payload === 'object', 'Expected object payload');
    const maybeData = (payload as Record<string, unknown>).data;
    assert.ok(Array.isArray(maybeData), 'Expected payload.data to be an array');

    const data = maybeData as Array<{ id?: string }>;
    assert.ok(data.length > 0, 'Expected at least one intent category');
    assert.ok(data.some((entry) => entry.id === 'action'));
  });
});
