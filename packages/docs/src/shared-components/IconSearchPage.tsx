/* eslint-disable max-len */
import React, {
  FC, MouseEvent, useEffect, useRef, useState,
} from 'react';
import {
  SynCombobox, SynIcon, SynInput, SynOption,
} from '@synergy-design-system/react';
import type { SynCombobox as SynComboboxType, SynInput as SynInputType } from '@synergy-design-system/components';
import { registerIconLibrary } from '../../../components/src/utilities/icon-library.js';
import { defaultIcons } from '../../../assets/src/default-icons.js';
import materialIconsMetatdata from '../materialIconsMetadata.json';
import './IconSearchPage.css';

type FontIcon = {
  name: string,
  categories: Array<string>,
  tags: Array<string>,
};

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
  const searchInput = useRef<SynInputType>(null);
  const combobox = useRef<SynComboboxType>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Array<string>>([]);

  useEffect(() => {
    registerIcons();
  }, []);

  const handleSearchTermChange = () => {
    setSearchTerm(searchInput.current?.value.toLowerCase() || '');

    // uncomment this and comment out the line above to see the delays
    // setSearchTerm(combobox.current?.value.toLowerCase() || '');
  };

  useEffect(() => {
    setCategories(getCategoriesWithIcons(searchTerm));
  }, [searchTerm]);

  return (
    <div>
      <div>
        <SynInput ref={searchInput} label="Search icons" onSynInput={handleSearchTermChange}></SynInput>
        {/* Enable following comment to check out the combobox and have a look at the delays when commenting it in */}
        {/* <SynCombobox ref={combobox} label="Search icons" clearable onSynInput={handleSearchTermChange}>
          {allIcons.map((icon) => (
            <SynOption key={icon}>
              <SynIcon slot="prefix" name={icon} library="bundled-default"></SynIcon>
              {icon}
            </SynOption>))
          }
        </SynCombobox> */}
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
                  <SynIcon data-icon-name={icon} style={{ fontSize: 'var(--syn-font-size-2x-large)' }} name={icon} library="bundled-default"></SynIcon>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
