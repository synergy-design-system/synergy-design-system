import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);
const packageRoot = resolve(currentDirname, '../..');

let client: Client | undefined;
let transport: StdioClientTransport | undefined;

export const startClient = async (): Promise<Client> => {
  if (client) {
    return client;
  }

  transport = new StdioClientTransport({
    args: ['dist/bin/start.js'],
    command: process.execPath,
    cwd: packageRoot,
    stderr: 'pipe',
  });

  client = new Client({
    name: 'synergy-mcp-e2e',
    version: '1.0.0',
  });

  await client.connect(transport);
  return client;
};

export const stopClient = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = undefined;
  }

  if (transport) {
    await transport.close();
    transport = undefined;
  }
};
