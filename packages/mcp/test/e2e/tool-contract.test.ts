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

const INTENT_RESOURCE_URI = 'synergy://intent-categories/list';

let session: ClientSession;

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-tool-contract-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

describe('tool contract', () => {
  before(async () => {
    session = await createClientSession();
  });

  after(async () => {
    await session.close();
  });

  it('exposes expected tool names via listTools', async () => {
    const result = await session.client.listTools();
    const names = result.tools.map((tool) => tool.name);

    const expected = [
      'asset-info',
      'asset-list',
      'component-cluster-list',
      'component-info',
      'component-list',
      'davinci-migration-info',
      'davinci-migration-list',
      'migration-info',
      'migration-list',
      'setup',
      'styles-info',
      'styles-list',
      'template-info',
      'template-list',
      'token-info',
      'tokens-list',
    ];

    expected.forEach((name) => {
      assert.ok(names.includes(name), `Expected tool "${name}" to be registered.`);
    });

    const notExpected = [
      'intent-categories-list',
      'intent-component-guide',
      'intent-component-validate',
      'intent-options',
      'intent-task-recommendations',
    ];

    notExpected.forEach((name) => {
      assert.ok(!names.includes(name), `Did not expect experimental tool "${name}" to be registered by default.`);
    });
  });

  it('does not expose intent resources via listResources by default', async () => {
    const result = await session.client.listResources();
    const uris = result.resources.map((resource) => resource.uri);

    assert.ok(!uris.includes(INTENT_RESOURCE_URI), `Did not expect intent resource "${INTENT_RESOURCE_URI}" to be registered by default.`);
  });
});

describe('tool contract (experimental intent tools enabled)', () => {
  let configuredSession: ClientSession;
  let configPath: string;

  before(async () => {
    configPath = await writeTempConfig({
      experimentalFeatures: {
        intentTools: true,
      },
    });
    configuredSession = await createClientSession({ configPath });
  });

  after(async () => {
    await configuredSession.close();
    await unlink(configPath).catch(() => {
      /* ignore cleanup errors */
    });
  });

  it('exposes intent tool names via listTools', async () => {
    const result = await configuredSession.client.listTools();
    const names = result.tools.map((tool) => tool.name);

    const expectedIntentTools = [
      'intent-categories-list',
      'intent-component-guide',
      'intent-component-validate',
      'intent-options',
      'intent-task-recommendations',
    ];

    expectedIntentTools.forEach((name) => {
      assert.ok(names.includes(name), `Expected intent tool "${name}" to be registered.`);
    });
  });

  it('exposes intent resources via listResources', async () => {
    const result = await configuredSession.client.listResources();
    const uris = result.resources.map((resource) => resource.uri);

    assert.ok(uris.includes(INTENT_RESOURCE_URI), `Expected intent resource "${INTENT_RESOURCE_URI}" to be registered.`);
  });
});
