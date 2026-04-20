#!/usr/bin/env node
import { createServer } from '../server.js';
import { createTransport } from '../transports/index.js';
import { getRuntimeConfig, initializeRuntimeConfig } from '../utilities/config.js';
import {
  handleCommandLineArgs,
  parseCommandLineArgs,
} from '../utilities/index.js';

try {
  handleCommandLineArgs();

  const parsedArgs = parseCommandLineArgs();
  await initializeRuntimeConfig(parsedArgs.configPath);

  // Get config from file (or defaults if not provided)
  const initialConfig = getRuntimeConfig();
  let config = { ...initialConfig };

  // Apply CLI overrides to config (CLI has highest precedence)
  if (parsedArgs.interface !== undefined) {
    config = { ...config, interface: parsedArgs.interface };
  }
  if (parsedArgs.port !== undefined) {
    config = { ...config, port: parsedArgs.port };
  }
  if (parsedArgs.tlsKeyPath !== undefined || parsedArgs.tlsCertPath !== undefined) {
    config = {
      ...config,
      tls: {
        certPath: parsedArgs.tlsCertPath ?? config.tls?.certPath,
        keyPath: parsedArgs.tlsKeyPath ?? config.tls?.keyPath,
      },
    };
  }

  const transport = await createTransport(createServer, config);
  await transport.start();
} catch (error) {
  process.stderr.write(
    `[synergy-mcp] Error: ${error instanceof Error ? error.message : String(error)}\n`,
  );
  process.exit(1);
}
