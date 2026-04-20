import assert from 'node:assert/strict';
import { request as httpsRequest } from 'node:https';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  after,
  before,
  describe,
  it,
} from 'node:test';
import {
  type HttpClientSession,
  type HttpServerHandle,
  createHttpMcpClient,
  startHttpServer,
} from '../utilities/index.ts';

const fixturesDir = resolve(dirname(fileURLToPath(import.meta.url)), '../fixtures');

// ---------------------------------------------------------------------------
// HTTP transport tests — one server shared across all HTTP suites
// ---------------------------------------------------------------------------

describe('http transport', () => {
  let httpServer: HttpServerHandle;

  before(async () => {
    httpServer = await startHttpServer({ port: 9120 });
  });

  after(async () => {
    await httpServer.stop();
  });

  describe('basic connectivity', () => {
    let session: HttpClientSession;

    before(async () => {
      session = await createHttpMcpClient(new URL('http://127.0.0.1:9120/mcp'));
    });

    after(async () => {
      await session.close();
    });

    it('responds to listTools', async () => {
      const result = await session.client.listTools();
      assert.ok(Array.isArray(result.tools), 'listTools should return an array');
      assert.ok(result.tools.length > 0, 'server should expose at least one tool');
    });

    it('can call a tool over HTTP', async () => {
      const result = await session.client.callTool({
        arguments: {},
        name: 'component-list',
      });
      assert.ok(result.content, 'callTool should return content');
    });
  });

  describe('routing', () => {
    it('GET /health returns 404', async () => {
      const res = await fetch('http://127.0.0.1:9120/health');
      assert.equal(res.status, 404);
    });

    it('GET / returns 404', async () => {
      const res = await fetch('http://127.0.0.1:9120/');
      assert.equal(res.status, 404);
    });
  });

  describe('session isolation', () => {
    let sessionA: HttpClientSession;
    let sessionB: HttpClientSession;

    before(async () => {
      // Two separate clients connect to the same server — each gets its own session
      [sessionA, sessionB] = await Promise.all([
        createHttpMcpClient(new URL('http://127.0.0.1:9120/mcp')),
        createHttpMcpClient(new URL('http://127.0.0.1:9120/mcp')),
      ]);
    });

    after(async () => {
      await Promise.all([sessionA.close(), sessionB.close()]);
    });

    it('two concurrent clients can call tools independently', async () => {
      const [resultA, resultB] = await Promise.all([
        sessionA.client.listTools(),
        sessionB.client.listTools(),
      ]);

      assert.ok(Array.isArray(resultA.tools));
      assert.ok(Array.isArray(resultB.tools));
      assert.deepEqual(
        resultA.tools.map(t => t.name),
        resultB.tools.map(t => t.name),
        'both clients should see the same tool set',
      );
    });
  });
});

describe('http transport host override', () => {
  let httpServer: HttpServerHandle;

  before(async () => {
    httpServer = await startHttpServer({ host: '0.0.0.0', port: 9122 });
  });

  after(async () => {
    await httpServer.stop();
  });

  it('accepts connections when bound to all IPv4 interfaces', async () => {
    const session = await createHttpMcpClient(new URL('http://127.0.0.1:9122/mcp'));

    try {
      const result = await session.client.listTools();
      assert.ok(Array.isArray(result.tools), 'listTools should return an array');
      assert.ok(result.tools.length > 0, 'server should expose at least one tool');
    } finally {
      await session.close();
    }
  });
});

// ---------------------------------------------------------------------------
// HTTPS transport tests — one server shared across all HTTPS suites
// ---------------------------------------------------------------------------

describe('https transport', () => {
  let httpsServer: HttpServerHandle;
  const httpsPort = 9121;
  const keyPath = resolve(fixturesDir, 'server.key');
  const certPath = resolve(fixturesDir, 'server.crt');

  before(async () => {
    httpsServer = await startHttpServer({
      port: httpsPort,
      tlsCertPath: certPath,
      tlsKeyPath: keyPath,
    });
  });

  after(async () => {
    await httpsServer.stop();
  });

  describe('basic connectivity', () => {
    it('MCP initialize POST over HTTPS returns a valid result', async () => {
      // Send a real MCP initialize request over HTTPS using self-signed cert
      const body = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
          capabilities: {},
          clientInfo: { name: 'test', version: '1.0.0' },
          protocolVersion: '2024-11-05',
        },
      });

      const responseText = await new Promise<string>((resolveBody, rejectBody) => {
        const req = httpsRequest(
          {
            headers: {
              Accept: 'application/json, text/event-stream',
              'Content-Length': Buffer.byteLength(body),
              'Content-Type': 'application/json',
            },
            hostname: '127.0.0.1',
            method: 'POST',
            path: '/mcp',
            port: httpsPort,
            rejectUnauthorized: false,
          },
          res => {
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => chunks.push(chunk));
            res.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
          },
        );
        req.on('error', rejectBody);
        req.write(body);
        req.end();
      });

      // Response is SSE — extract the data line
      const dataLine = responseText.split('\n').find(l => l.startsWith('data:'));
      assert.ok(dataLine, 'response should contain an SSE data line');
      const parsed = JSON.parse(dataLine.slice('data:'.length).trim()) as {
        id: number;
        jsonrpc: string;
        result: { protocolVersion: string; serverInfo: { name: string } };
      };
      assert.equal(parsed.jsonrpc, '2.0');
      assert.equal(parsed.id, 1);
      assert.ok(parsed.result?.serverInfo?.name, 'should include serverInfo');
    });
  });

  describe('TLS verification', () => {
    it('raw HTTPS request returns a JSON-RPC error, not a TLS failure', async () => {
      // A raw GET is not a valid MCP request, but we should receive a JSON-RPC
      // error — not a connection/TLS error — proving TLS is terminating correctly.
      const body = await new Promise<string>((resolveBody, rejectBody) => {
        const req = httpsRequest(
          {
            hostname: '127.0.0.1',
            method: 'GET',
            path: '/mcp',
            port: httpsPort,
            rejectUnauthorized: false,
          },
          res => {
            const chunks: Buffer[] = [];
            res.on('data', (chunk: Buffer) => chunks.push(chunk));
            res.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
          },
        );
        req.on('error', rejectBody);
        req.end();
      });

      const parsed = JSON.parse(body) as { jsonrpc: string; error: { code: number } };
      assert.equal(parsed.jsonrpc, '2.0');
      assert.ok(typeof parsed.error?.code === 'number', 'should include a JSON-RPC error code');
    });
  });
});
