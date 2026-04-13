#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from '../server.js';
import {
  handleCommandLineArgs,
  initializeRuntimeConfig,
  parseCommandLineArgs,
} from '../utilities/index.js';

handleCommandLineArgs();

const { configPath } = parseCommandLineArgs();
await initializeRuntimeConfig(configPath);

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
