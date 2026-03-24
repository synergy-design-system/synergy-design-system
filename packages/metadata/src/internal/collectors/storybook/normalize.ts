import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { formatGeneratedMarkdown } from '../../core/markdown.js';
import { type Result, err, ok } from '../../core/result.js';
import { scrapingConfigByKind } from './source/configs.js';
import { type StorybookCollectedDocument, type StorybookExampleArtifact } from './types.js';

export async function normalize(
  documents: StorybookCollectedDocument[],
): Promise<Result<StorybookExampleArtifact[], NormalizeError>> {
  try {
    const artifacts = await Promise.all(documents.map(async (document) => {
      const content = await formatGeneratedMarkdown(
        scrapingConfigByKind[document.kind].formatContent(document.item, document.stories),
      );

      if (content.trim().length === 0) {
        throw new Error(`Normalized empty storybook artifact for ${document.entityId}`);
      }

      return {
        content,
        entityId: document.entityId,
        item: document.item,
        kind: document.kind,
        stories: document.stories,
      };
    }));

    return ok(artifacts);
  } catch (error) {
    return err(createNormalizeError('Failed to normalize storybook examples', 'storybook', {
      error: error instanceof Error ? error.message : String(error),
    }));
  }
}
