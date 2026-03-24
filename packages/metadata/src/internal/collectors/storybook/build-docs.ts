#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-misused-promises */

import { runDocsScraper } from './docs-scraper.js';
import { StaticServerManager } from './storybook-manager.js';
import { createConsoleLogger } from '../../core/context.js';

const logger = createConsoleLogger('storybook');

// Parse command line arguments
const args = process.argv.slice(2);
const type = args[0] as 'components' | 'styles' | 'all' | 'templates' || 'all';

logger.info(`Starting documentation scraping for: ${type}`);

const serverManager = new StaticServerManager();

async function main() {
  try {
    // Start the static server
    logger.info('Starting static file server...');
    const server = await serverManager.start();

    // Run the docs scraper
    logger.info('Starting documentation scraping...');
    await runDocsScraper(type, server.url);

    logger.info('Documentation scraping completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Documentation scraping failed', { error: String(error) });
    process.exit(1);
  } finally {
    // Always clean up the server
    await serverManager.stop();
    logger.info('✓ Server stopped');
  }
}

// Handle process termination to clean up server
process.on('SIGINT', async () => {
  logger.info('\nReceived SIGINT, cleaning up...');
  await serverManager.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('\nReceived SIGTERM, cleaning up...');
  await serverManager.stop();
  process.exit(0);
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
