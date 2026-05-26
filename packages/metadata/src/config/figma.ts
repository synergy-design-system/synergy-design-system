const DEFAULT_FIGMA_FILE_KEY = 'bZFqk9urD3NlghGUKrkKCR';
const DEFAULT_FIGMA_FILE_NAME = 'Synergy-Digital-Design-System';

const NODE_ID_PATTERN = /^-?\d+(?:[:-]-?\d+)$/;

const trimToUndefined = (value: string | undefined): string | undefined => value?.trim() || undefined;

const getFigmaFileKey = (): string => trimToUndefined(process.env.SYNERGY_METADATA_FIGMA_FILE_KEY)
  ?? DEFAULT_FIGMA_FILE_KEY;

const getFigmaFileName = (): string => trimToUndefined(process.env.SYNERGY_METADATA_FIGMA_FILE_NAME)
  ?? DEFAULT_FIGMA_FILE_NAME;

const isFigmaUrl = (value: string): boolean => /^https?:\/\//i.test(value.trim());

const normalizeNodeId = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = decodeURIComponent(value.trim()).replace(/:/g, '-');
  return NODE_ID_PATTERN.test(normalized) ? normalized : undefined;
};

export const extractFigmaNodeId = (reference: string | undefined): string | undefined => {
  const trimmed = trimToUndefined(reference);
  if (!trimmed) {
    return undefined;
  }

  if (!isFigmaUrl(trimmed)) {
    return normalizeNodeId(trimmed);
  }

  try {
    const url = new URL(trimmed);
    return normalizeNodeId(url.searchParams.get('node-id') ?? undefined);
  } catch {
    return undefined;
  }
};

const getFigmaDocsBaseUrl = (): string => trimToUndefined(process.env.SYNERGY_METADATA_FIGMA_DOCS_BASE_URL)
  ?? `https://www.figma.com/file/${getFigmaFileKey()}/${getFigmaFileName()}`;

const getFigmaComponentBaseUrl = (): string => trimToUndefined(process.env.SYNERGY_METADATA_FIGMA_COMPONENT_BASE_URL)
  ?? `https://www.figma.com/design/${getFigmaFileKey()}/${getFigmaFileName()}`;

export const buildFigmaDocsUrl = (reference: string | undefined): string | undefined => {
  const trimmed = trimToUndefined(reference);
  if (!trimmed) {
    return undefined;
  }

  if (isFigmaUrl(trimmed)) {
    return trimmed;
  }

  const nodeId = normalizeNodeId(trimmed);
  if (!nodeId) {
    return undefined;
  }

  return `${getFigmaDocsBaseUrl()}?type=design&node-id=${nodeId}`;
};

export const buildFigmaComponentUrl = (reference: string | undefined): string | undefined => {
  const trimmed = trimToUndefined(reference);
  if (!trimmed) {
    return undefined;
  }

  if (isFigmaUrl(trimmed)) {
    return trimmed;
  }

  const nodeId = normalizeNodeId(trimmed);
  if (!nodeId) {
    return undefined;
  }

  return `${getFigmaComponentBaseUrl()}?node-id=${nodeId}`;
};
