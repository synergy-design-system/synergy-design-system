#!/usr/bin/env node

import { runDocsScraper } from './docs-scraper.js';
import { StaticServerManager } from './storybook-manager.js';
import { createConsoleLogger } from '../../core/context.js';
import { type Context } from '../../core/context.js';

const logger = createConsoleLogger('storybook');

/**
 * Orchestrate the storybook scraper: start server, run scraper, cleanup.
 * Used by both CLI and main build pipeline.
 *
 * @param type - What to scrape: 'components', 'styles', 'templates', or 'all'
 * @param ctx - Build context with logger
 * @returns true if successful, false if failed (with warning logged)
 */
export async function runStorybook(
  type: 'components' | 'styles' | 'templates' | 'all' = 'all',
  ctx?: Context,
): Promise<boolean> {
  const log = ctx?.logger ?? logger;
  const serverManager = new StaticServerManager(log);

  try {
    // Start the static server
    log.info('Starting static file server...');
    const server = await serverManager.start();

    // Run the docs scraper
    log.info('Starting documentation scraping...');
    await runDocsScraper(type, server.url, log);

    log.info('Documentation scraping completed successfully!');
    return true;
  } catch (error) {
    log.error('Documentation scraping failed', { error: String(error) });
    return false;
  } finally {
    // Always clean up the server
    await serverManager.stop();
    log.info('✓ Server stopped');
  }
}

// Only run CLI when this file is directly executed, not when imported as a module
if (process.argv[1]?.endsWith('build-docs.js') || process.argv[1]?.endsWith('build-docs.ts')) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const type = args[0] as 'components' | 'styles' | 'all' | 'templates' || 'all';

  logger.info(`Starting documentation scraping for: ${type}`);

  // Handle process termination gracefully (runStorybook handles server cleanup)
  process.on('SIGINT', () => {
    logger.info('\nReceived SIGINT, exiting...');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logger.info('\nReceived SIGTERM, exiting...');
    process.exit(0);
  });

  const success = await runStorybook(type);
  process.exit(success ? 0 : 1);
}
