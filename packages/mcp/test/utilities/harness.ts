import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const packageRoot = resolve(currentDirname, '../..');

export type ClientSession = {
  client: Client;
  close: () => Promise<void>;
};

export type ClientSessionOptions = {
  configPath?: string;
  cwd?: string;
  entryPoint?: string;
};

/**
 * Creates an isolated MCP client session by launching the MCP server as a child process
 * and connecting to it via stdio transport.
 * @param options Optional session options (e.g. configPath for a custom synergy-mcp.json).
 * @returns A session containing the connected client and a teardown function.
 */
export const createClientSession = async (options: ClientSessionOptions = {}): Promise<ClientSession> => {
  const {
    configPath,
    cwd,
    entryPoint,
  } = options;

  const serverCwd = cwd ?? packageRoot;
  const serverEntryPoint = entryPoint ?? 'dist/bin/start.js';

  const transport = new StdioClientTransport({
    args: [
      serverEntryPoint,
      ...(configPath ? ['--config', configPath] : []),
    ],
    command: process.execPath,
    cwd: serverCwd,
    stderr: 'pipe',
  });

  const client = new Client({
    name: 'synergy-mcp-e2e',
    version: '1.0.0',
  });

  await client.connect(transport);
  return {
    client,
    close: async () => {
      await client.close();
      await transport.close();
    },
  };
};

// ---------------------------------------------------------------------------
// HTTP / HTTPS session
// ---------------------------------------------------------------------------

export type HttpServerHandle = {
  port: number;
  protocol: 'http' | 'https';
  stop: () => Promise<void>;
};

export type HttpClientSession = {
  client: Client;
  close: () => Promise<void>;
};

export type HttpServerOptions = {
  port?: number;
  configPath?: string;
  tlsKeyPath?: string;
  tlsCertPath?: string;
};

/**
 * Spawns the MCP server in HTTP (or HTTPS) mode and resolves once the server
 * signals it is ready. Returns a handle with the port, protocol, and a stop()
 * function to kill the process.
 */
export const startHttpServer = async (options: HttpServerOptions = {}): Promise<HttpServerHandle> => {
  const { port = 9120, configPath, tlsKeyPath, tlsCertPath } = options;
  const isHttps = !!(tlsKeyPath && tlsCertPath);
  const protocol = isHttps ? 'https' : 'http';

  const serverArgs = [
    resolve(packageRoot, 'dist/bin/start.js'),
    '--interface', 'http',
    '--port', String(port),
    ...(configPath ? ['--config', configPath] : []),
    ...(tlsKeyPath ? ['--tls-key', tlsKeyPath] : []),
    ...(tlsCertPath ? ['--tls-cert', tlsCertPath] : []),
  ];

  const child = spawn(process.execPath, serverArgs, {
    cwd: packageRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise<void>((resolveReady, rejectReady) => {
    const timeout = setTimeout(() => {
      child.kill();
      rejectReady(new Error(`HTTP server on port ${port} did not start within 5 seconds`));
    }, 5000);

    const stderrChunks: Buffer[] = [];
    child.stderr!.on('data', (chunk: Buffer) => stderrChunks.push(chunk));

    child.stdout!.on('data', (chunk: Buffer) => {
      if (String(chunk).includes('server started')) {
        clearTimeout(timeout);
        resolveReady();
      }
    });

    child.on('error', (err) => {
      clearTimeout(timeout);
      rejectReady(err);
    });

    child.on('exit', (code) => {
      clearTimeout(timeout);
      const stderr = Buffer.concat(stderrChunks).toString('utf8');
      rejectReady(new Error(`Server process exited early with code ${code}${stderr ? `\nstderr: ${stderr}` : ''}`));
    });
  });

  return {
    port,
    protocol,
    stop: () => new Promise<void>((r) => {
      if (child.exitCode !== null) {
        r(); // process already exited, nothing to do
        return;
      }
      child.once('exit', () => r());
      child.kill('SIGTERM');
    }),
  };
};

/**
 * Creates an MCP client connected to an already-running HTTP/HTTPS server.
 * For HTTPS with self-signed certs, pass `rejectUnauthorized: false`.
 */
export const createHttpMcpClient = async (
  url: URL,
  options: { rejectUnauthorized?: boolean } = {},
): Promise<HttpClientSession> => {
  const { rejectUnauthorized = true } = options;

  let fetchOption: typeof fetch | undefined;
  if (!rejectUnauthorized) {
    const { fetch: undiciFetch, Agent } = await import('undici');
    const agent = new Agent({ connect: { rejectUnauthorized: false } });
    fetchOption = (input, init) => undiciFetch(input, { ...init, dispatcher: agent }) as Promise<Response>;
  }

  const transport = new StreamableHTTPClientTransport(url, {
    ...(fetchOption ? { fetch: fetchOption } : {}),
  });

  const client = new Client({ name: 'synergy-mcp-http-e2e', version: '1.0.0' });
  await client.connect(transport);

  return {
    client,
    close: async () => {
      try { await client.close(); } catch { /* ignore */ }
      try { await transport.close(); } catch { /* ignore */ }
    },
  };
};
