#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from '../server.js';
import { handleCommandLineArgs } from '../utilities/index.js';

handleCommandLineArgs();

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
