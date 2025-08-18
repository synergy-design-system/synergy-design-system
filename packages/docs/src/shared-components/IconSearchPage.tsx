/* eslint-disable max-len */
import React, {
  FC, MouseEvent, useEffect, useState,
} from 'react';
import { SynIcon } from '@synergy-design-system/react';
import { registerIconLibrary } from '@synergy-design-system/components/utilities/icon-library.js';
import { defaultIcons as sick2018Icons } from '../../../assets/src/default-icons.js';
import { outlineIcons as sick2025Outline } from '../../../assets/src/sick2025-outline-icons.js';
import { filledIcons as sick2025Filled } from '../../../assets/src/sick2025-filled-icons.js';
// The new material symbols metadata can be found here: https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true
import materialIconsMetadata from '../materialSymbolsMetadata.json' with { type: 'json' };
import { THEMES, Themes } from './IconSearchPageThemes.js';

type FontIcon = {
  name: string,
  categories: Array<string>,
  tags: Array<string>,
};

type MaterialIconsMetadata = {
  icons: Array<FontIcon>
};

const getBundledIconsForMode = (mode: Themes) => {
  switch (mode) {
  case 'sick2025-fill':
    return sick2025Filled;
  case 'sick2025-outline':
    return sick2025Outline;
  case 'sick2018':
  default:
    return sick2018Icons;
  }
};

const mapIconData = (icons: Record<string, string>, mode: Themes) => Object.keys(icons).map((iconName) => {
  let customIconsName = iconName;
  // Unfortunately we need a special handling for the sick2025_filled icons, as the naming is different from the other icons. They have a suffix of "_fill" in the name.
  if (mode === 'sick2025-fill') {
    customIconsName = customIconsName.replace(/_fill$/, ''); // Remove the "_fill" suffix only if it's at the end
  }
  // Sometimes there are two types of icon with the same name. The first one is always the new Material Symbols version, the second one is the old Material Icons version.
  // We just take the new version
  const metadata = ((materialIconsMetadata as MaterialIconsMetadata)?.icons || []).find((icon: FontIcon) => (icon.name === customIconsName));
  return {
    categories: metadata ? metadata.categories : ['No category'],
    name: iconName,
    tags: metadata ? metadata.tags : [],
  };
});

const getIconsforMode = (mode: Themes): FontIcon[] => {
  switch (mode) {
  case 'sick2025-fill':
    return mapIconData(sick2025Filled, mode);
  case 'sick2025-outline':
    return mapIconData(sick2025Outline, mode);
  case 'sick2018':
  default:
    return mapIconData(sick2018Icons, mode);
  }
};

const filterForCategory = (category: string) => (icon: FontIcon) => icon.categories && icon.categories.includes(category);

const filterForSearchTerm = (searchTerm: string) => (icon: FontIcon) => (searchTerm === '' || icon.name.includes(searchTerm) || !!(icon.tags && icon.tags.some(tag => tag.includes(searchTerm))));

const getIconsForCategoryAndSearchTerm = (icons: FontIcon[]) => (category: string, searchTerm: string): string[] => icons
  .filter(filterForCategory(category))
  .filter(filterForSearchTerm(searchTerm))
  .map((icon: FontIcon) => icon.name);

const getCategoriesWithIcons = (icons: FontIcon[]) => (searchTerm: string): string[] => {
  const categories = new Set<string>();
  icons.forEach((icon: FontIcon) => {
    if (filterForSearchTerm(searchTerm)(icon)) {
      icon.categories.forEach((category: string) => categories.add(category));
    }
  });
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};

const copyToClipboard = async (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  try {
    const value = target.dataset.iconName || '';
    await navigator.clipboard.writeText(value);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Could not copy value to clipboard. Error was:', e);
  }
};

const registerIcons = () => {
  THEMES.forEach((theme) => {
    const bundledIcons = getBundledIconsForMode(theme);
    registerIconLibrary(theme, {
      mutator: svg => svg.setAttribute('fill', 'currentColor'),
      resolver: (name) => {
        if (name in bundledIcons) {
          const defaultName = name as keyof typeof bundledIcons;
          return `data:image/svg+xml,${encodeURIComponent(bundledIcons[defaultName])}`;
        }
        return '';
      },
    });
  });
};

type Props = {
  mode: Themes;
  searchTerm: string;
};

export const IconsSearchPage: FC<Props> = ({ mode = 'sick2018', searchTerm = '' }) => {
  const [categories, setCategories] = useState<Array<string>>([]);
  const [iconsCache, setIconsCache] = useState<Array<FontIcon>>([]);

  useEffect(() => {
    registerIcons();
  }, []);

  useEffect(() => {
    setIconsCache(getIconsforMode(mode));
  }, [mode]);

  useEffect(() => {
    setCategories(getCategoriesWithIcons(iconsCache)(searchTerm));
  }, [searchTerm, iconsCache]);

  return (
    <>
      <div style={{ marginTop: 'calc(var(--syn-spacing-2x-large)*-1)' }}>
        {categories.map((category) => (
          <div key={category}>
            <h2 style={{ marginTop: 'var(--syn-spacing-3x-large)' }} id={category}>{category}</h2>
            <div style={{
              columnGap: 'var(--syn-spacing-small)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 150px)', rowGap: 'var(--syn-spacing-x-large)',
            }}>
              {getIconsForCategoryAndSearchTerm(iconsCache)(category, searchTerm).map((icon) => (
                <div
                  key={icon}
                  style={{
                    alignItems: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column',
                  }}
                  data-icon-name={icon}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={copyToClipboard}
                >
                  <span data-icon-name={icon} style={{ fontSize: 'var(--syn-font-size-x-small)' }}>{icon}</span>
                  <SynIcon data-icon-name={icon} style={{ fontSize: 'var(--syn-font-size-2x-large)' }} name={icon} library={mode}></SynIcon>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
