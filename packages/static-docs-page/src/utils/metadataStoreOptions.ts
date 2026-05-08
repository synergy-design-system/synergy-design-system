import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { MetadataStoreOptions } from '@synergy-design-system/metadata';

const candidateDataDirs = [
	process.env.SYNERGY_METADATA_DATA_DIR,
	resolve(process.cwd(), 'packages/metadata/data'),
	resolve(process.cwd(), '../metadata/data'),
].filter((candidate): candidate is string => Boolean(candidate));

const dataDir = candidateDataDirs.find((candidate) => existsSync(candidate));

export const metadataStoreOptions: MetadataStoreOptions = dataDir ? { dataDir } : {};