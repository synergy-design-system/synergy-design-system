#!/usr/bin/env node

import { createConsoleLogger } from '../../core/context.js';
import { type Context } from '../../core/context.js';
import { collect } from './collect.js';
import { normalize } from './normalize.js';
import { type StorybookArtifactKind, type StorybookScrapeType } from './types.js';
import { writeStorybookArtifacts } from './write.js';

const logger = createConsoleLogger('storybook');

const getOutputDir = (): string => process.env.SYNERGY_METADATA_OUTPUT_DIR?.trim() || 'data';

const getKindsToSync = (type: StorybookScrapeType): StorybookArtifactKind[] => {
  switch (type) {
    case 'components':
      return ['component'];
    case 'styles':
      return ['style'];
    case 'templates':
      return ['template'];
    case 'all':
      return ['component', 'style', 'template'];
    default:
      return ['component', 'style', 'template'];
  }
};

const toScrapeType = (value: string | undefined): StorybookScrapeType => {
  if (value === 'components' || value === 'styles' || value === 'templates' || value === 'all') {
    return value;
  }

  return 'all';
};

export async function runStorybook(
  type: StorybookScrapeType = 'all',
  ctx?: Context,
): Promise<boolean> {
  const collectResult = await collect(type, ctx);
  if (!collectResult.ok) {
    const log = ctx?.logger ?? logger;
    log.error('Storybook collection failed', collectResult.error);
    return false;
  }

  const normalizeResult = await normalize(collectResult.value);
  if (!normalizeResult.ok) {
    const log = ctx?.logger ?? logger;
    log.error('Storybook normalization failed', normalizeResult.error);
    return false;
  }

  try {
    await writeStorybookArtifacts(
      normalizeResult.value,
      ctx?.workspaceRoot ?? process.cwd(),
      getOutputDir(),
      getKindsToSync(type),
    );
    return true;
  } catch (error) {
    const log = ctx?.logger ?? logger;
    log.error('Storybook artifact write failed', { error: String(error) });
    return false;
  }
}

if (process.argv[1]?.endsWith('build-docs.js') || process.argv[1]?.endsWith('build-docs.ts')) {
  const args = process.argv.slice(2);
  const type = toScrapeType(args[0]);

  logger.info(`Starting documentation scraping for: ${type}`);

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
