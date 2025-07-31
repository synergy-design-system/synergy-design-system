#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from '../server.js';
import { getVersion } from '../utilities/version.js';

/**
 * Parses command line arguments and returns the action to take
 */
export const parseCommandLineArgs = (args: string[] = process.argv.slice(2)) => {
  if (args.includes('--version') || args.includes('-v')) {
    return { action: 'version' as const };
  }

  if (args.includes('--help') || args.includes('-h')) {
    return { action: 'help' as const };
  }

  return { action: 'continue' as const };
};

/**
 * Handles command line arguments and exits if necessary
 */
export const handleCommandLineArgs = () => {
  const result = parseCommandLineArgs();

  if (result.action === 'version') {
    const version = getVersion();
    process.stdout.write(`Synergy Design System MCP Server v${version}\n`);
    process.exit(0);
  }

  if (result.action === 'help') {
    const version = getVersion();
    process.stdout.write(`Synergy Design System MCP Server v${version}

USAGE:
    syn-mcp [OPTIONS]

DESCRIPTION:
    Model Context Protocol (MCP) server for the Synergy Design System.
    Provides tools for LLMs to interact with Synergy components, design tokens,
    styles, and framework-specific guidance.

OPTIONS:
    -h, --help       Show this help message and exit
    -v, --version    Show version information and exit

EXAMPLES:
    syn-mcp                    # Start the MCP server
    syn-mcp --version          # Show version
    syn-mcp --help             # Show this help

ABOUT:
    This server provides the following tools for LLMs:
    • Component information and documentation
    • Framework-specific guidance (React, Vue, Angular, Vanilla)
    • Design tokens and styling information
    • Asset and icon information
    • Migration guides from DaVinci to Synergy
    • Template and pattern information

    For more information, visit:
    https://github.com/synergy-design-system/synergy-design-system

`);
    process.exit(0);
  }
};

handleCommandLineArgs();

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
