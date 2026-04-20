/* eslint-disable @typescript-eslint/no-misused-promises */
import { randomUUID } from 'node:crypto';
import {
  type Server as HttpServer,
  createServer as createHttpServer,
} from 'node:http';
import {
  type Server as HttpsServer,
  createServer as createHttpsServer,
} from 'node:https';
import { readFileSync } from 'node:fs';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { McpRuntimeConfig } from '../utilities/config.js';
import type { TransportInstance } from './index.js';

type NodeServer = HttpServer | HttpsServer;

/**
 * Creates an HTTP or HTTPS transport for the MCP server.
 * Serves the MCP protocol on a fixed /mcp endpoint.
 * Each client session gets its own transport + server instance,
 * tracked by the mcp-session-id header.
 *
 * @param serverFactory A factory function that creates a new MCP server instance per session
 * @param config The runtime configuration with interface, port, and optional TLS settings
 * @returns A transport instance
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function createHttpTransport(
  serverFactory: () => McpServer,
  config: McpRuntimeConfig,
): Promise<TransportInstance> {
  const { host, port, tls } = config;
  const hasValidTls = tls?.keyPath && tls?.certPath;

  // Read TLS files if HTTPS is enabled
  let keyContent: Buffer | undefined;
  let certContent: Buffer | undefined;

  if (hasValidTls) {
    try {
      keyContent = readFileSync(tls.keyPath!);
      certContent = readFileSync(tls.certPath!);
    } catch (error) {
      throw new Error(
        `Failed to read TLS files: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Create the appropriate server
  let nodeServer: NodeServer;
  let protocol = 'http';

  if (hasValidTls && keyContent && certContent) {
    protocol = 'https';
    nodeServer = createHttpsServer({
      cert: certContent,
      key: keyContent,
    });
  } else {
    nodeServer = createHttpServer();
  }

  // Session store: maps mcp-session-id -> transport for that client
  const sessions = new Map<string, StreamableHTTPServerTransport>();

  // Create request handler that routes to the transport
  nodeServer.on('request', async (req, res) => {
    // Route only /mcp requests to the transport
    const url = req.url || '/';
    if (!url.startsWith('/mcp')) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found\n');
      return;
    }

    try {
      const sessionId = req.headers['mcp-session-id'] as string | undefined;

      if (sessionId) {
        // Route to existing session
        const existing = sessions.get(sessionId);
        if (!existing) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            error: { code: -32000, message: 'Unknown session ID' },
            id: null,
            jsonrpc: '2.0',
          }));
          return;
        }
        await existing.handleRequest(req, res);
        return;
      }

      // New client — create a dedicated server + transport pair
      const newServer = serverFactory();
      const transport = new StreamableHTTPServerTransport({
        onsessioninitialized: sid => {
          sessions.set(sid, transport);
        },
        sessionIdGenerator: () => randomUUID(),
      });

      transport.onclose = () => {
        if (transport.sessionId) {
          sessions.delete(transport.sessionId);
        }
      };

      await newServer.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      // Only write error response if headers haven't been sent yet
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error\n');
      }
      process.stderr.write(
        `[synergy-mcp] HTTP handler error: ${error instanceof Error ? error.message : String(error)}\n`,
      );
    }
  });

  return {
    start: async () => new Promise((resolve, reject) => {
      nodeServer.on('error', (error) => {
        if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
          reject(
            new Error(`Port ${port} is already in use. Please choose a different port.`),
          );
        } else {
          reject(new Error(`Server error: ${error instanceof Error ? error.message : String(error)}`));
        }
      });

      nodeServer.on('listening', () => {
        process.stdout.write(
          `[synergy-mcp] ✓ ${protocol.toUpperCase()} server started at ${protocol}://${host}:${port}\n`,
        );
        process.stdout.write(`[synergy-mcp] ✓ MCP endpoint: ${protocol}://${host}:${port}/mcp\n`);
        resolve();
      });

      nodeServer.listen(port, host);
    }),

    stop: async () => new Promise((resolve, reject) => {
      nodeServer.close((error) => {
        if (error) {
          reject(error);
        } else {
          process.stdout.write('[synergy-mcp] ✓ Server stopped\n');
          resolve();
        }
      });
    }),
  };
}
