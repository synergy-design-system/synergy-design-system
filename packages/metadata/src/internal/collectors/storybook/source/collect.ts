import { runDocsScraper } from './docs-scraper.js';
import { StaticServerManager } from './storybook-manager.js';
import { createConsoleLogger } from '../../../core/context.js';
import { type Context } from '../../../core/context.js';
import { type StorybookCollectedDocument, type StorybookScrapeType } from './types.js';

const logger = createConsoleLogger('storybook');

export async function collectStorybookSource(
  type: StorybookScrapeType = 'all',
  ctx?: Context,
): Promise<StorybookCollectedDocument[]> {
  const log = ctx?.logger ?? logger;
  const serverManager = new StaticServerManager(log);

  try {
    log.info('Starting static file server...');
    const server = await serverManager.start();

    log.info('Starting documentation scraping...');
    const documents = await runDocsScraper(type, server.url, log);

    log.info('Documentation scraping completed successfully!');
    return documents;
  } finally {
    await serverManager.stop();
    log.info('✓ Server stopped');
  }
}
