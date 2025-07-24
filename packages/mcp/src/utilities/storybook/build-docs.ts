#!/usr/bin/env node

/* eslint-disable no-console */

import { runDocsScraper } from './docs-scraper.js';

// Parse command line arguments
const args = process.argv.slice(2);
const type = args[0] as 'components' | 'styles' | 'all' | 'templates' || 'all';

console.log(`Starting documentation scraping for: ${type}`);

runDocsScraper(type)
  .then(() => {
    console.log('Documentation scraping completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Documentation scraping failed:', error);
    process.exit(1);
  });
