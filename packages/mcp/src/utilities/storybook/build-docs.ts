#!/usr/bin/env node

/* eslint-disable no-console */
import { runDocsScraper } from './docs-scraper.js';
import { StaticServerManager } from './storybook-manager.js';

// Parse command line arguments
const args = process.argv.slice(2);
const type = args[0] as 'components' | 'styles' | 'all' | 'templates' || 'all';

console.log(`Starting documentation scraping for: ${type}`);

const serverManager = new StaticServerManager();

async function main() {
  try {
    // Start the static server
    console.log('Starting static file server...');
    const server = await serverManager.start();

    // Run the docs scraper
    console.log('Starting documentation scraping...');
    await runDocsScraper(type, server.url);

    console.log('Documentation scraping completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Documentation scraping failed:', error);
    process.exit(1);
  } finally {
    // Always clean up the server
    await serverManager.stop();
    console.log('✓ Server stopped');
  }
}

// Handle process termination to clean up server
process.on('SIGINT', async () => {
  console.log('\nReceived SIGINT, cleaning up...');
  await serverManager.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\nReceived SIGTERM, cleaning up...');
  await serverManager.stop();
  process.exit(0);
});

main();
