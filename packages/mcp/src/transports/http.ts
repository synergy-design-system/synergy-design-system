/* eslint-disable complexity */
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
import { toNodeHandler } from '@modelcontextprotocol/node';
import {
  type McpServer,
  WebStandardStreamableHTTPServerTransport,
  createMcpHandler,
  isLegacyRequest,
} from '@modelcontextprotocol/server';
import { getMetadataInfo, getSynergyLogo } from '@synergy-design-system/metadata';
import { runWithLoggingContext } from '../utilities/logging-context.js';
import type { McpRuntimeConfig } from '../utilities/config.js';
import type { TransportInstance } from './index.js';

type NodeServer = HttpServer | HttpsServer;

/**
 * Creates an HTTP or HTTPS transport for the MCP server.
 * Serves the MCP protocol on a fixed /mcp endpoint.
 * Legacy clients use isolated sessions tracked by the mcp-session-id header.
 * Modern clients use a fresh server instance for each request.
 *
 * @param serverFactory A factory function that creates a new MCP server instance per session
 * @param config The runtime configuration with interface, port, and optional TLS settings
 * @returns A transport instance
 */
export async function createHttpTransport(
  serverFactory: () => McpServer,
  config: McpRuntimeConfig,
): Promise<TransportInstance> {
  const { host, port, tls } = config;
  const hasValidTls = tls?.keyPath && tls?.certPath;

  // Resolve metadata version info once at startup for use in response headers
  let metadataVersion: string | undefined;
  let metadataBuildDate: string | undefined;
  try {
    const info = await getMetadataInfo();
    metadataVersion = info.version;
    metadataBuildDate = info.builtAt;
  } catch {
    process.stderr.write('[synergy-mcp] Warning: could not read metadata version info\n');
  }

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
  const sessions = new Map<string, WebStandardStreamableHTTPServerTransport>();

  const reportError = (error: Error) => {
    process.stderr.write(`[synergy-mcp] HTTP handler error: ${error.message}\n`);
  };

  const modern = createMcpHandler(serverFactory, { legacy: 'reject', onerror: reportError });

  const handleMcpRequest = toNodeHandler({
    fetch: async (request, options) => {
      if (!await isLegacyRequest(request, options?.parsedBody)) {
        return runWithLoggingContext(
          { sessionId: `request-${randomUUID()}`, transport: 'http' },
          async () => modern.fetch(request, options),
        );
      }

      const sessionId = request.headers.get('mcp-session-id');
      if (sessionId) {
        const existing = sessions.get(sessionId);
        if (!existing) {
          return Response.json({
            error: { code: -32000, message: 'Unknown session ID' },
            id: null,
            jsonrpc: '2.0',
          }, { status: 400 });
        }
        return runWithLoggingContext(
          { sessionId, transport: 'http' },
          async () => existing.handleRequest(request, options),
        );
      }

      const newServer = serverFactory();
      const transport = new WebStandardStreamableHTTPServerTransport({
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
      return runWithLoggingContext(
        { sessionId: transport.sessionId ?? 'pending-http', transport: 'http' },
        async () => transport.handleRequest(request, options),
      );
    },
  }, {
    onerror: reportError,
  });

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

    // Expose metadata version info on every /mcp response
    if (metadataVersion !== undefined) {
      res.setHeader('x-synergy-metadata-version', metadataVersion);
    }
    if (metadataBuildDate !== undefined) {
      res.setHeader('x-synergy-metadata-build-date', metadataBuildDate);
    }

    try {
      await handleMcpRequest(req, res);
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
        if (!config.silent) {
          process.stdout.write(`${getSynergyLogo()}`);
          process.stdout.write(
            `[synergy-mcp] ✓ ${protocol.toUpperCase()} server started at ${protocol}://${host}:${port}\n`,
          );
          process.stdout.write(`[synergy-mcp] ✓ MCP endpoint: ${protocol}://${host}:${port}/mcp\n`);
        }
        resolve();
      });

      nodeServer.listen(port, host);
    }),

    stop: async () => {
      await modern.close();
      await Promise.all([...sessions.values()].map(transport => transport.close()));
      return new Promise((resolve, reject) => {
        nodeServer.close(error => {
          if (error) {
            reject(error);
          } else {
            if (!config.silent) {
              process.stdout.write('[synergy-mcp] ✓ Server stopped\n');
            }
            resolve();
          }
        });
      });
    },
  };
}
