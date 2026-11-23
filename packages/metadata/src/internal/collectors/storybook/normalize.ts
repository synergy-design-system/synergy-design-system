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

      const ids = new Set<string>();
      const examples = await Promise.all(document.stories.map(async (story) => {
        if (!/^[a-z0-9][a-z0-9-]*$/.test(story.id) || ids.has(story.id)) {
          throw new Error(`Invalid or duplicate story ID "${story.id}" for ${document.entityId}`);
        }
        ids.add(story.id);
        return {
          content: await formatGeneratedMarkdown(
            scrapingConfigByKind[document.kind].formatContent(document.item, [story]),
          ),
          description: story.description,
          id: story.id,
          title: story.heading,
        };
      }));

      return {
        content,
        entityId: document.entityId,
        examples,
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
