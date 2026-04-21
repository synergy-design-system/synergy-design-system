import assert from 'node:assert/strict';
import {
  access,
  mkdtemp,
  readFile,
  readdir,
  rm,
  unlink,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  after,
  describe,
  it,
} from 'node:test';
import {
  createClientSession,
  createHttpMcpClient,
  startHttpServer,
  toToolResponse,
} from '../utilities/index.ts';

type LoggedEvent = {
  durationMs: number;
  parameters: Record<string, unknown>;
  sessionId: string;
  success: boolean;
  timestamp: string;
  toolName: string;
  transport: 'http' | 'stdio';
};

const writeTempConfig = async (content: unknown): Promise<string> => {
  const filePath = join(tmpdir(), `synergy-mcp-logger-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(filePath, JSON.stringify(content), 'utf8');
  return filePath;
};

const listJsonFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      return listJsonFiles(fullPath);
    }
    return fullPath.endsWith('.json') ? [fullPath] : [];
  }));

  return files.flat();
};

const readLoggedEvents = async (root: string): Promise<LoggedEvent[]> => {
  const files = await listJsonFiles(root);
  const entries = await Promise.all(files.map(async (filePath) => {
    const raw = await readFile(filePath, 'utf8');
    return raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => JSON.parse(line) as LoggedEvent);
  }));

  return entries.flat();
};

const temporaryPaths: string[] = [];
after(async () => {
  await Promise.all(temporaryPaths.map(async (path) => {
    await rm(path, { force: true, recursive: true }).catch(() => {
      // Ignore cleanup errors in tests.
    });
    await unlink(path).catch(() => {
      // Ignore cleanup errors in tests.
    });
  }));
});

describe('tool call logging (local file provider)', () => {
  it('writes stdio tool calls to date/session JSON files', async () => {
    const logDir = await mkdtemp(join(tmpdir(), 'synergy-mcp-logs-'));
    temporaryPaths.push(logDir);

    const configPath = await writeTempConfig({
      logging: {
        localFile: {
          path: logDir,
        },
      },
    });
    temporaryPaths.push(configPath);

    const session = await createClientSession({ configPath });
    try {
      const response = await session.client.callTool({
        arguments: {},
        name: 'asset-list',
      });
      toToolResponse(response);
    } finally {
      await session.close();
    }

    const files = await listJsonFiles(logDir);
    assert.ok(files.some(file => file.endsWith('/stdio.json')));

    const entries = await readLoggedEvents(logDir);
    const event = entries.find(entry => entry.toolName === 'asset-list');

    assert.ok(event);
    assert.equal(event.transport, 'stdio');
    assert.equal(event.sessionId, 'stdio');
    assert.equal(event.success, true);
    assert.deepEqual(event.parameters, {});
    assert.equal(typeof event.durationMs, 'number');
    assert.ok(event.durationMs >= 0);
  });

  it('writes HTTP tool calls with HTTP session identifiers', async () => {
    const logDir = await mkdtemp(join(tmpdir(), 'synergy-mcp-http-logs-'));
    temporaryPaths.push(logDir);

    const configPath = await writeTempConfig({
      logging: {
        localFile: {
          path: logDir,
        },
      },
    });
    temporaryPaths.push(configPath);

    const port = 9200 + Math.floor(Math.random() * 300);
    const server = await startHttpServer({
      configPath,
      port,
    });

    try {
      const url = new URL(`${server.protocol}://127.0.0.1:${server.port}/mcp`);
      const clientSession = await createHttpMcpClient(url);
      try {
        const response = await clientSession.client.callTool({
          arguments: {},
          name: 'asset-list',
        });
        toToolResponse(response);
      } finally {
        await clientSession.close();
      }
    } finally {
      await server.stop();
    }

    const entries = await readLoggedEvents(logDir);
    const event = entries.find(entry => entry.toolName === 'asset-list' && entry.transport === 'http');

    assert.ok(event);
    assert.notEqual(event.sessionId, 'stdio');
    assert.equal(event.success, true);
    assert.deepEqual(event.parameters, {});
    assert.equal(typeof event.durationMs, 'number');
    assert.ok(event.durationMs >= 0);
  });

  it('does not write logs when local file logging is disabled', async () => {
    const baseDir = await mkdtemp(join(tmpdir(), 'synergy-mcp-disabled-'));
    const logDir = join(baseDir, 'logs');
    temporaryPaths.push(baseDir);

    const configPath = await writeTempConfig({
      logging: {
        localFile: {
          path: null,
        },
      },
    });
    temporaryPaths.push(configPath);

    const session = await createClientSession({ configPath });
    try {
      const response = await session.client.callTool({
        arguments: {},
        name: 'asset-list',
      });
      toToolResponse(response);
    } finally {
      await session.close();
    }

    await assert.rejects(async () => access(logDir));
  });
});
