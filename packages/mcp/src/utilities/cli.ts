import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

/**
 * Gets the current version of the MCP server.
 * @returns The version string from package.json
 */
export const getVersion = () => {
  const filename = fileURLToPath(import.meta.url);
  const directoryName = dirname(filename);
  const packageJsonPath = join(directoryName, '..', '..', 'package.json');
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
    version: string;
  };

  return packageJson.version;
};

/**
 * Parsed command line arguments
 */
export interface ParsedArgs {
  action: 'version' | 'help' | 'continue';
  configPath?: string;
  host?: string;
  interface?: 'stdio' | 'http';
  logPath?: string | null;
  port?: number;
  tlsKeyPath?: string;
  tlsCertPath?: string;
}

/**
 * Parses command line arguments and returns the action to take
 */
// eslint-disable-next-line complexity
export const parseCommandLineArgs = (args: string[] = process.argv.slice(2)): ParsedArgs => {
  if (args.includes('--version') || args.includes('-v')) {
    return { action: 'version' as const };
  }

  if (args.includes('--help') || args.includes('-h')) {
    return { action: 'help' as const };
  }

  const result: ParsedArgs = { action: 'continue' as const };

  const configIndex = args.indexOf('--config');
  if (configIndex >= 0 && configIndex + 1 < args.length) {
    result.configPath = args[configIndex + 1];
  }

  const interfaceIndex = args.indexOf('--interface');
  if (interfaceIndex >= 0 && interfaceIndex + 1 < args.length) {
    const value = args[interfaceIndex + 1];
    if (value === 'stdio' || value === 'http') {
      result.interface = value;
    } else {
      throw new Error(`Invalid --interface value: "${value}". Must be "stdio" or "http".`);
    }
  }

  const portIndex = args.indexOf('--port');
  if (portIndex >= 0 && portIndex + 1 < args.length) {
    const portValue = args[portIndex + 1];
    const port = parseInt(portValue, 10);
    if (Number.isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid --port value: "${portValue}". Must be an integer between 1 and 65535.`);
    }
    result.port = port;
  }

  const hostIndex = args.indexOf('--host');
  if (hostIndex >= 0 && hostIndex + 1 < args.length) {
    const hostValue = args[hostIndex + 1]?.trim();
    if (!hostValue) {
      throw new Error('Invalid --host value. Must be a non-empty host or IP address.');
    }
    result.host = hostValue;
  }

  const logIndex = args.indexOf('--log');
  if (logIndex >= 0 && logIndex + 1 < args.length) {
    const rawValue = args[logIndex + 1]?.trim();
    if (!rawValue) {
      throw new Error('Invalid --log value. Must be a non-empty directory path, "false" or "null".');
    }

    const normalized = rawValue.toLowerCase();
    result.logPath = normalized === 'false' || normalized === 'null'
      ? null
      : rawValue;
  }

  const tlsKeyIndex = args.indexOf('--tls-key');
  if (tlsKeyIndex >= 0 && tlsKeyIndex + 1 < args.length) {
    result.tlsKeyPath = args[tlsKeyIndex + 1];
  }

  const tlsCertIndex = args.indexOf('--tls-cert');
  if (tlsCertIndex >= 0 && tlsCertIndex + 1 < args.length) {
    result.tlsCertPath = args[tlsCertIndex + 1];
  }

  return result;
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
    -h, --help              Show this help message and exit
    -v, --version           Show version information and exit
    --config <path>         Path to a synergy-mcp.json configuration file
    --interface <type>      Server interface: stdio (default) or http
    --host <address>        HTTP bind address (default: 127.0.0.1)
    --port <number>         HTTP server port (default: 9119, used with --interface http)
    --log <value>           Tool-call logs directory path, or "false"/"null" to disable
    --tls-key <path>        Path to TLS private key file (enables HTTPS)
    --tls-cert <path>       Path to TLS certificate file (enables HTTPS)

EXAMPLES:
    syn-mcp                              # Start the MCP server via stdio (default)
    syn-mcp --version                    # Show version
    syn-mcp --help                       # Show this help
    syn-mcp --config ./synergy-mcp.json  # Start with a custom config
    syn-mcp --interface http             # Start HTTP server on port 9119
    syn-mcp --interface http --port 3000 # Start HTTP server on port 3000
    syn-mcp --interface http --host 0.0.0.0  # Listen on all IPv4 interfaces
    syn-mcp --log ./logs                  # Write tool-call logs to ./logs
    syn-mcp --log false                   # Disable tool-call logging
    syn-mcp --interface http --tls-key ./key.pem --tls-cert ./cert.pem  # Start HTTPS server

CONFIGURATION FILE:
    A synergy-mcp.json file can specify interface, port, host, and TLS settings:

    {
      "interface": "http",
      "port": 3000,
      "host": "0.0.0.0",
      "logging": {
        "localFile": {
          "path": "./logs"
        }
      },
      "tls": {
        "keyPath": "./key.pem",
        "certPath": "./cert.pem"
      }
    }

    CLI flags override config file values.

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
