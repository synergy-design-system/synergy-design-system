import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { type Logger } from '../internal/core/context.js';
import { decodeEntityIdFromPath } from '../internal/core/entity-paths.js';
import { writeJsonAtomic } from '../internal/writers/fs-utils.js';
import { extractFigmaNodeId } from './figma.js';

const COMPONENT_CONNECTION_MARKER = 'Synergy Web Component Connection';
const CONNECT_PATTERN = /figma\.connect\(\s*(['"`])([^'"`]+)\1\s*,/g;
const MARKER_PATTERN = new RegExp(`//\\s*${COMPONENT_CONNECTION_MARKER}`, 'g');

type SyncSummary = {
  ambiguousCount: number;
  missingCodeConnectCount: number;
  updatedCount: number;
};

type ConnectCandidate = {
  index: number;
  nodeId: string;
};

type OverrideRecord = Record<string, unknown>;

const isPlainObject = (value: unknown): value is OverrideRecord => typeof value === 'object'
  && value !== null
  && !Array.isArray(value);

const collectConnectCandidates = (sourceText: string): ConnectCandidate[] => {
  const matches: ConnectCandidate[] = [];

  for (const match of sourceText.matchAll(CONNECT_PATTERN)) {
    const url = match[2];
    const nodeId = extractFigmaNodeId(url);
    if (!nodeId || match.index === undefined) {
      continue;
    }

    matches.push({
      index: match.index,
      nodeId,
    });
  }

  return matches;
};

const pickComponentCandidate = (sourceText: string, filePath: string): ConnectCandidate | null => {
  const candidates = collectConnectCandidates(sourceText);
  if (candidates.length === 0) {
    return null;
  }

  if (candidates.length === 1) {
    return candidates[0];
  }

  const markerIndices = Array.from(sourceText.matchAll(MARKER_PATTERN))
    .map((match) => match.index)
    .filter((index): index is number => index !== undefined);

  if (markerIndices.length === 0) {
    throw new Error(`Ambiguous code-connect mapping in ${filePath}: multiple figma.connect() calls and no component marker.`);
  }

  const markerCandidates = markerIndices
    .map((markerIndex, markerOffset) => {
      const nextMarkerIndex = markerIndices[markerOffset + 1] ?? Number.POSITIVE_INFINITY;
      return candidates.find((candidate) => candidate.index > markerIndex && candidate.index < nextMarkerIndex) ?? null;
    })
    .filter((candidate): candidate is ConnectCandidate => candidate !== null)
    .filter((candidate, index, array) => array.findIndex((entry) => entry.index === candidate.index) === index);

  if (markerCandidates.length === 1) {
    return markerCandidates[0];
  }

  throw new Error(`Ambiguous code-connect mapping in ${filePath}: found ${markerCandidates.length} component marker candidates.`);
};

const syncOverrideFile = async (
  filePath: string,
  componentId: string | undefined,
): Promise<boolean> => {
  const content = await readFile(filePath, 'utf8');
  const parsed = JSON.parse(content) as unknown;

  if (!isPlainObject(parsed)) {
    throw new Error(`Override file must contain a JSON object: ${filePath}`);
  }

  const nextOverride: OverrideRecord = { ...parsed };
  let changed = false;

  const currentDocsRef = typeof nextOverride.figmaDocsId === 'string' ? nextOverride.figmaDocsId : undefined;
  const currentLegacyRef = typeof nextOverride.figmaComponentId === 'string' ? nextOverride.figmaComponentId : undefined;
  const migratedLegacyDocsRef = currentDocsRef ?? currentLegacyRef;

  if (migratedLegacyDocsRef !== currentDocsRef) {
    nextOverride.figmaDocsId = migratedLegacyDocsRef;
    changed = true;
  }

  if (componentId) {
    if (currentLegacyRef !== componentId) {
      nextOverride.figmaComponentId = componentId;
      changed = true;
    }
  } else if (migratedLegacyDocsRef === currentLegacyRef && currentLegacyRef !== undefined) {
    delete nextOverride.figmaComponentId;
    changed = true;
  }

  if (!changed) {
    return false;
  }

  await writeJsonAtomic(filePath, nextOverride);
  return true;
};

export async function syncCodeConnectFigmaOverrides(
  configDir: string,
  repoRoot: string,
  logger?: Logger,
): Promise<SyncSummary> {
  const overridesDir = resolve(configDir, 'overrides');
  const codeConnectDir = resolve(repoRoot, 'packages/components/code-connect/components');
  const overrideFiles = await readdir(overridesDir);

  let ambiguousCount = 0;
  let missingCodeConnectCount = 0;
  let updatedCount = 0;

  for (const fileName of overrideFiles) {
    if (!fileName.endsWith('.json')) {
      continue;
    }

    const entityId = decodeEntityIdFromPath(fileName.slice(0, -'.json'.length));
    if (!entityId.startsWith('component:')) {
      continue;
    }

    const tagName = entityId.slice('component:'.length);
    const overridePath = join(overridesDir, fileName);
    const codeConnectPath = join(codeConnectDir, `${tagName}.figma.ts`);

    let componentId: string | undefined;
    try {
      const sourceText = await readFile(codeConnectPath, 'utf8');
      componentId = pickComponentCandidate(sourceText, codeConnectPath)?.nodeId;
      if (!componentId) {
        missingCodeConnectCount += 1;
      }
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        missingCodeConnectCount += 1;
      } else {
        ambiguousCount += 1;
        logger?.warn('Skipping override sync for ambiguous code-connect file', {
          error: error instanceof Error ? error.message : String(error),
          filePath: codeConnectPath,
        });
      }
    }

    if (await syncOverrideFile(overridePath, componentId)) {
      updatedCount += 1;
    }
  }

  logger?.info('Synchronized code-connect Figma component IDs', {
    ambiguousCount,
    missingCodeConnectCount,
    updatedCount,
  });

  return {
    ambiguousCount,
    missingCodeConnectCount,
    updatedCount,
  };
}
