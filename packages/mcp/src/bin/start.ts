#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer, handleCommandLineArgs } from '../server.js';

// Handle command line arguments first
handleCommandLineArgs();

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
