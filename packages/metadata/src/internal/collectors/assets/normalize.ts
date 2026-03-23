/**
 * Normalizer: Transform raw assets data to canonical CoreEntity records.
 *
 * Produces:
 *   1 setup entity         — setup:assets-package (package docs + exports)
 *   3 icon set entities    — asset:sick2018-icons, asset:sick2025-icons-fill, asset:sick2025-icons-outline
 *   2 logo entities        — asset:sick2018-logos, asset:sick2025-logos
 *   2 system-icon entities — asset:sick2018-system-icons, asset:sick2025-system-icons
 *
 * Icon set entities embed a compact `custom.icons` dictionary keyed by icon name.
 * Each entry carries optional `categories` and `tags` from the Material Symbols metadata
 * and an optional `materialSource` attribution field (only when metadata was loaded).
 * SVG files are NOT referenced as sources and are never copied to data/layers.
 */

import { type Result, ok } from '../../core/result.js';
import { type NormalizeError, createNormalizeError } from '../../core/errors.js';
import { type CoreEntity } from '../../schemas/index.js';
import { type AssetsRaw } from './collect.js';

type IconEntry = {
  categories?: string[];
  tags?: string[];
};

const buildIconsDict = (
  iconNames: string[],
  taxonomyByIconName: ReadonlyMap<string, { categories: string[]; tags: string[] }>,
): Record<string, IconEntry> => {
  const icons: Record<string, IconEntry> = {};
  for (const name of iconNames) {
    const taxonomy = taxonomyByIconName.get(name);
    if (!taxonomy) {
      icons[name] = {};
      continue;
    }
    const entry: IconEntry = {};
    if (taxonomy.categories.length > 0) {
      entry.categories = taxonomy.categories;
    }
    if (taxonomy.tags.length > 0) {
      entry.tags = taxonomy.tags;
    }
    icons[name] = entry;
  }
  return icons;
};

export const normalize = (raw: AssetsRaw): Result<CoreEntity[], NormalizeError> => {
  try {
    const setupEntity: CoreEntity = {
      custom: {
        exports: raw.exportKeys,
        packageName: raw.packageName,
        packageVersion: raw.packageVersion,
      },
      id: 'setup:assets-package',
      kind: 'setup',
      layers: {},
      name: 'Assets Package',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: raw.setupSources,
      status: 'stable',
      tags: ['assets', 'setup'],
    };

    // Set-level icon registry entities (contain count + JS source + compact icons dict)
    const sick2018IconsEntity: CoreEntity = {
      custom: {
        exportName: 'sick2018Icons',
        iconCount: raw.sick2018IconNames.length,
        icons: buildIconsDict(raw.sick2018IconNames, raw.taxonomyByIconName),
        theme: 'sick2018',
        variant: 'all',
      },
      id: 'asset:sick2018-icons',
      kind: 'asset',
      layers: {},
      name: 'sick2018 Icons',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [raw.sick2018JsSourcePath],
      status: 'stable',
      tags: ['asset', 'icons', 'sick2018'],
    };

    const sick2025FillIconsEntity: CoreEntity = {
      custom: {
        exportName: 'sick2025FilledIcons',
        iconCount: raw.sick2025FillIconNames.length,
        icons: buildIconsDict(raw.sick2025FillIconNames, raw.taxonomyByIconName),
        theme: 'sick2025',
        variant: 'fill',
      },
      id: 'asset:sick2025-icons-fill',
      kind: 'asset',
      layers: {},
      name: 'sick2025 Icons (Fill)',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [raw.sick2025FillJsSourcePath],
      status: 'stable',
      tags: ['asset', 'fill', 'icons', 'sick2025'],
    };

    const sick2025OutlineIconsEntity: CoreEntity = {
      custom: {
        exportName: 'sick2025OutlineIcons',
        iconCount: raw.sick2025OutlineIconNames.length,
        icons: buildIconsDict(raw.sick2025OutlineIconNames, raw.taxonomyByIconName),
        theme: 'sick2025',
        variant: 'outline',
      },
      id: 'asset:sick2025-icons-outline',
      kind: 'asset',
      layers: {},
      name: 'sick2025 Icons (Outline)',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [raw.sick2025OutlineJsSourcePath],
      status: 'stable',
      tags: ['asset', 'icons', 'outline', 'sick2025'],
    };

    const sick2018LogosEntity: CoreEntity = {
      custom: {
        category: 'logos',
        files: raw.sick2018LogoFiles,
        theme: 'sick2018',
      },
      id: 'asset:sick2018-logos',
      kind: 'asset',
      layers: {},
      name: 'sick2018 Logos',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [],
      status: 'stable',
      tags: ['asset', 'logos', 'sick2018'],
    };

    const sick2025LogosEntity: CoreEntity = {
      custom: {
        category: 'logos',
        files: raw.sick2025LogoFiles,
        theme: 'sick2025',
      },
      id: 'asset:sick2025-logos',
      kind: 'asset',
      layers: {},
      name: 'sick2025 Logos',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [],
      status: 'stable',
      tags: ['asset', 'logos', 'sick2025'],
    };

    const sick2018SystemIconsEntity: CoreEntity = {
      custom: {
        category: 'system-icons',
        files: raw.sick2018SystemIconFiles,
        theme: 'sick2018',
      },
      id: 'asset:sick2018-system-icons',
      kind: 'asset',
      layers: {},
      name: 'sick2018 System Icons',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [],
      status: 'stable',
      tags: ['asset', 'sick2018', 'system-icons'],
    };

    const sick2025SystemIconsEntity: CoreEntity = {
      custom: {
        category: 'system-icons',
        files: raw.sick2025SystemIconFiles,
        theme: 'sick2025',
      },
      id: 'asset:sick2025-system-icons',
      kind: 'asset',
      layers: {},
      name: 'sick2025 System Icons',
      package: 'assets',
      relations: [],
      since: raw.packageVersion,
      sources: [],
      status: 'stable',
      tags: ['asset', 'sick2025', 'system-icons'],
    };

    return ok([
      setupEntity,
      sick2018IconsEntity,
      sick2025FillIconsEntity,
      sick2025OutlineIconsEntity,
      sick2018LogosEntity,
      sick2025LogosEntity,
      sick2018SystemIconsEntity,
      sick2025SystemIconsEntity,
    ]);
  } catch (error) {
    return {
      error: createNormalizeError('Failed to normalize assets metadata', 'assets', {
        cause: error instanceof Error ? error.message : String(error),
      }),
      ok: false,
    };
  }
};
