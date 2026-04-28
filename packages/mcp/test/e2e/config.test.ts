import assert from 'node:assert/strict';
import { writeFile, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  afterEach,
  before,
  describe,
  it,
} from 'node:test';
import {
  type ClientSession,
  createClientSession,
  expectNoRulesPreface,
  expectRulesPreface,
  parseJsonContent,
  toToolResponse,
} from '../utilities/index.ts';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-test-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('config: default behavior (no --config)', () => {
  let session: ClientSession;
  before(async () => {
    session = await createClientSession();
  });
  after(async () => {
    await session.close();
  });

  it('includes AI rules by default', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'asset-list',
    });
    const typedResponse = toToolResponse(response);
    expectRulesPreface(typedResponse);
  });

  it('uses vanilla as default framework in component-info', async () => {
    const response = await session.client.callTool({
      arguments: { component: 'syn-button' },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);
    // vanilla framework does not add framework-specific rules, so we expect
    // exactly the generic rules + data (≥ 2 items)
    assert.ok(typedResponse.content.length >= 2);
    const allText = typedResponse.content.map((c) => c.text).join('\n');
    // react/vue/angular-specific rule files should not appear
    assert.doesNotMatch(allText, /component-info-react|component-info-vue|component-info-angular/i);
  });
});

describe('config: includeAiRules = false', () => {
  let session: ClientSession;
  let configPath: string;

  before(async () => {
    configPath = await writeTempConfig({ includeAiRules: false });
    session = await createClientSession({ configPath });
  });
  after(async () => {
    await session.close();
    await unlink(configPath).catch(() => {/* ignore cleanup errors */});
  });

  it('omits AI rules from asset-list response', async () => {
    const response = await session.client.callTool({
      arguments: {},
      name: 'asset-list',
    });
    const typedResponse = toToolResponse(response);
    expectNoRulesPreface(typedResponse);
    // data is still present
    const groupedAssets = parseJsonContent<Record<string, unknown>>(typedResponse, 0);
    assert.ok(Object.keys(groupedAssets).length > 0);
  });

  it('omits AI rules from component-info response', async () => {
    const response = await session.client.callTool({
      arguments: { component: 'syn-button' },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);
    expectNoRulesPreface(typedResponse);
  });
});

describe('config: component-info defaults from config', () => {
  let session: ClientSession;
  let configPath: string;

  before(async () => {
    configPath = await writeTempConfig({
      tools: { componentInfo: { framework: 'react' } },
    });
    session = await createClientSession({ configPath });
  });
  after(async () => {
    await session.close();
    await unlink(configPath).catch(() => {/* ignore cleanup errors */});
  });

  it('applies configured default framework when no framework is passed', async () => {
    const response = await session.client.callTool({
      arguments: { component: 'syn-button' },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);
    assert.ok(typedResponse.content.length >= 2);
    const allText = typedResponse.content.map((c) => c.text).join('\n');
    // React-specific guidance file should be included
    assert.match(allText, /react/i);
  });

  it('explicit framework argument overrides config default', async () => {
    const response = await session.client.callTool({
      arguments: { component: 'syn-button', framework: 'angular' },
      name: 'component-info',
    });
    const typedResponse = toToolResponse(response);
    assert.ok(typedResponse.content.length >= 2);
    const allText = typedResponse.content.map((c) => c.text).join('\n');
    // Angular-specific guidance should be present, not React
    assert.match(allText, /angular/i);
    assert.doesNotMatch(allText, /component-info-react/i);
  });
});

describe('config: missing or invalid config file falls back to defaults', () => {
  describe('non-existent config path', () => {
    let session: ClientSession;
    before(async () => {
      session = await createClientSession({
        configPath: '/tmp/__does-not-exist-synergy-mcp.json',
      });
    });
    after(async () => {
      await session.close();
    });

    it('still serves requests using built-in defaults', async () => {
      const response = await session.client.callTool({
        arguments: {},
        name: 'asset-list',
      });
      const typedResponse = toToolResponse(response);
      // rules are present (default includeAiRules: true)
      expectRulesPreface(typedResponse);
    });
  });

  describe('invalid JSON config', () => {
    let session: ClientSession;
    let configPath: string;

    before(async () => {
      configPath = join(tmpdir(), `synergy-mcp-bad-${Date.now()}.json`);
      await writeFile(configPath, '{ not valid json }', 'utf8');
      session = await createClientSession({ configPath });
    });
    afterEach(() => { /* no per-test teardown needed */ });
    after(async () => {
      await session.close();
      await unlink(configPath).catch(() => {/* ignore */});
    });

    it('still serves requests using built-in defaults', async () => {
      const response = await session.client.callTool({
        arguments: {},
        name: 'asset-list',
      });
      const typedResponse = toToolResponse(response);
      expectRulesPreface(typedResponse);
    });
  });
});
