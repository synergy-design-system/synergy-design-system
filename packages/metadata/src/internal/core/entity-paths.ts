import {
  basename,
  dirname,
  extname,
  join,
} from 'node:path';

const ENTITY_ID_SEPARATOR = ':';
const FILESYSTEM_ID_SEPARATOR = '__';

/**
 * Encode a canonical entity ID for use in filesystem paths.
 */
export const encodeEntityIdForPath = (entityId: string): string => entityId.replaceAll(
  ENTITY_ID_SEPARATOR,
  FILESYSTEM_ID_SEPARATOR,
);

/**
 * Decode an encoded filesystem entity ID back to canonical form.
 */
export const decodeEntityIdFromPath = (encodedEntityId: string): string => encodedEntityId.replaceAll(
  FILESYSTEM_ID_SEPARATOR,
  ENTITY_ID_SEPARATOR,
);

/**
 * Convert a metadata relative path (for example data/core/... or layers/...)
 * into a filesystem path rooted at dataDir while encoding the entity-id segment.
 */
export const toEntityFilePath = (dataDir: string, metadataPath: string): string => {
  const relativePath = metadataPath.replace(/^data\//, '');
  const fileName = basename(relativePath);
  const extension = extname(fileName);
  const nameWithoutExtension = extension.length > 0
    ? fileName.slice(0, -extension.length)
    : fileName;
  const encodedName = `${encodeEntityIdForPath(nameWithoutExtension)}${extension}`;

  return join(dataDir, dirname(relativePath), encodedName);
};
