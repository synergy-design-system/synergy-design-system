import { type CollectError, createCollectError } from '../../core/errors.js';
import { type Context } from '../../core/context.js';
import { type Result, err, ok } from '../../core/result.js';
import { collectStorybookSource } from './source/collect.js';
import { type StorybookCollectedDocument, type StorybookScrapeType } from './types.js';

export async function collect(
  type: StorybookScrapeType = 'all',
  ctx?: Context,
): Promise<Result<StorybookCollectedDocument[], CollectError>> {
  try {
    const documents = await collectStorybookSource(type, ctx);
    return ok(documents);
  } catch (error) {
    return err(createCollectError('Failed to collect storybook examples', 'storybook', {
      error: error instanceof Error ? error.message : String(error),
      type,
    }));
  }
}
