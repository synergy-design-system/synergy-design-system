#!/usr/bin/env node
/* eslint-disable no-await-in-loop, no-console */
/**
 * Smoke test for the Synergy MCP container.
 *
 * Opens a real MCP session against a running HTTP server, lists the exposed
 * tools and calls one of them. Used by CI after `docker run`, but works against
 * any reachable MCP HTTP endpoint.
 *
 * Usage: node smoke-test.mjs [url]
 *        MCP_URL=http://127.0.0.1:9119/mcp node smoke-test.mjs
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

const url = new URL(process.argv[2] ?? process.env.MCP_URL ?? 'http://127.0.0.1:9119/mcp');
const maxAttempts = Number(process.env.MCP_SMOKE_ATTEMPTS ?? 30);
const retryDelay = Number(process.env.MCP_SMOKE_RETRY_DELAY ?? 2000);

const wait = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

const connect = async () => {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const transport = new StreamableHTTPClientTransport(url);
    const client = new Client({ name: 'synergy-mcp-smoke-test', version: '1.0.0' });

    try {
      await client.connect(transport);
      console.log(`✅ Connected to ${url.href} (attempt ${attempt}/${maxAttempts})`);
      return { client, transport };
    } catch (error) {
      lastError = error;
      console.log(`⏳ Waiting for MCP server at ${url.href} (attempt ${attempt}/${maxAttempts})`);
      await Promise.allSettled([transport.close()]);
      await wait(retryDelay);
    }
  }

  throw new Error(`Could not connect to ${url.href} after ${maxAttempts} attempts: ${lastError}`);
};

const run = async () => {
  const { client, transport } = await connect();

  try {
    const { tools } = await client.listTools();

    if (!Array.isArray(tools) || tools.length === 0) {
      throw new Error('Server did not expose any tools');
    }

    console.log(`✅ Server exposes ${tools.length} tools`);

    if (!tools.some((tool) => tool.name === 'component-list')) {
      throw new Error(`Expected tool "component-list" to be present, got: ${tools.map((tool) => tool.name).join(', ')}`);
    }

    const result = await client.callTool({ arguments: {}, name: 'component-list' });

    if (!result.content || result.isError) {
      throw new Error(`Calling "component-list" failed: ${JSON.stringify(result)}`);
    }

    console.log('✅ Tool call "component-list" returned content');
    console.log('✅ MCP container smoke test passed');
  } finally {
    await Promise.allSettled([client.close(), transport.close()]);
  }
};

try {
  await run();
} catch (error) {
  console.error(`❌ MCP container smoke test failed: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
