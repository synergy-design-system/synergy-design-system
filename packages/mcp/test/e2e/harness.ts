import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const packageRoot = resolve(currentDirname, '../..');

export type ClientSession = {
  client: Client;
  close: () => Promise<void>;
};

/**
 * Creates an isolated MCP client session by launching the MCP server as a child process
 * and connecting to it via stdio transport.
 * @returns A session containing the connected client and a teardown function.
 */
export const createClientSession = async (): Promise<ClientSession> => {
  const transport = new StdioClientTransport({
    args: ['dist/bin/start.js'],
    command: process.execPath,
    cwd: packageRoot,
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
