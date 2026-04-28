#!/usr/bin/env node

import { createConsoleLogger } from '../../../core/context.js';
import { type StorybookScrapeType } from './types.js';
import { collectStorybookSource } from './collect.js';

const logger = createConsoleLogger('storybook');

// Only run CLI when this file is directly executed, not when imported as a module
if (process.argv[1]?.endsWith('build-docs.js') || process.argv[1]?.endsWith('build-docs.ts')) {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const type = args[0] as StorybookScrapeType || 'all';

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

  const documents = await collectStorybookSource(type);
  logger.info(`Collected ${documents.length} storybook artifacts`);
  process.exit(0);
}
