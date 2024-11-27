/* eslint-disable max-len */
import React, {
  FC, MouseEvent, useEffect, useRef, useState,
} from 'react';
import '../../../components/src/components/icon/icon.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/combobox/combobox.js';
import { type SynCombobox, type SynInput } from '@synergy-design-system/components';
import { registerIconLibrary } from '../../../components/src/utilities/icon-library.js';
import { defaultIcons } from '../../../assets/src/default-icons.js';
import materialIconsMetatdata from '../materialIconsMetadata.json';
import './IconSearchPage.css';

type FontIcon = {
  name: string,
  categories: Array<string>,
  tags: Array<string>,
};

// Make sure ts is not sad about custom elements
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      ['syn-icon']: unknown;
      ['syn-input']: unknown;
      ['syn-combobox']: unknown;
      ['syn-option']: unknown;
    }
  }
}

const filterForCategory = (category: string) => (icon: FontIcon) => icon.categories && icon.categories.includes(category);

const filterForSearchTerm = (searchTerm: string) => (icon: FontIcon) => (searchTerm === '' || icon.name.includes(searchTerm) || !!(icon.tags && icon.tags.some(tag => tag.includes(searchTerm))));

const getIconsForCategoryAndSearchTerm = (category: string, searchTerm: string): string[] => materialIconsMetatdata.icons
  .filter(filterForCategory(category))
  .filter(filterForSearchTerm(searchTerm))
  .map((icon: FontIcon) => icon.name);

const getAllIcons = () => materialIconsMetatdata.icons.map((icon: FontIcon) => icon.name);

const getCategoriesWithIcons = (searchTerm: string): string[] => {
  const categories = new Set<string>();
  materialIconsMetatdata.icons.forEach((icon: FontIcon) => {
    if (filterForSearchTerm(searchTerm)(icon)) {
      icon.categories.forEach((category: string) => categories.add(category));
    }
  });
  return Array.from(categories);
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
  registerIconLibrary('bundled-default', {
    mutator: svg => svg.setAttribute('fill', 'currentColor'),
    resolver: (name) => {
      if (name in defaultIcons) {
        const defaultName = name as keyof typeof defaultIcons;
        return `data:image/svg+xml,${encodeURIComponent(defaultIcons[defaultName])}`;
      }
      return '';
    },
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const allIcons = getAllIcons();

export const IconsSearchPage: FC = () => {
  const searchInput = useRef<SynInput>(null);
  const combobox = useRef<SynCombobox>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Array<string>>([]);

  useEffect(() => {
    registerIcons();

    searchInput.current?.addEventListener('syn-input', () => {
      setSearchTerm(searchInput.current?.value.toLowerCase() || '');
    });
    combobox.current?.addEventListener('syn-input', () => {
      setSearchTerm(combobox.current?.value.toLowerCase() || '');
    });
  }, []);

  useEffect(() => {
    setCategories(getCategoriesWithIcons(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      <div>
        <syn-input ref={searchInput} label="Search icons"></syn-input>
        {/* Enable following comment to check out the combobox and have a look at the delays when commenting it in */}
        {/* <syn-combobox ref={combobox} label="Search icons" clearable >
          {allIcons.map((icon) => (
            <syn-option key={icon}>
              <syn-icon slot="prefix" name={icon} library="bundled-default"></syn-icon>
              {icon}
            </syn-option>))}
        </syn-combobox> */}
        {categories.map((category) => (
          <div key={category}>
            <h2 style={{ marginTop: 'var(--syn-spacing-3x-large)' }} id={category}>{category}</h2>
            <div style={{
              columnGap: 'var(--syn-spacing-small)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 150px)', rowGap: 'var(--syn-spacing-x-large)',
            }}>
              {getIconsForCategoryAndSearchTerm(category, searchTerm).map((icon) => (
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
                  <syn-icon data-icon-name={icon} style={{ fontSize: 'var(--syn-font-size-2x-large)' }} name={icon} library="bundled-default"></syn-icon>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
