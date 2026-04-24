import {
  type ScrapedStory, type StorybookArtifactKind, type StorybookCollectedDocument, type StorybookScrapeType,
} from './source/types.js';

export type {
  ScrapedStory, StorybookArtifactKind, StorybookCollectedDocument, StorybookScrapeType,
};

export interface StorybookExampleArtifact {
  content: string;
  entityId: string;
  item: string;
  kind: StorybookArtifactKind;
  stories: ScrapedStory[];
}
