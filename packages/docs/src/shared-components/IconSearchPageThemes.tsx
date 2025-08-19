import React, { FC, useState } from 'react';
import type { SynInputEvent, SynInput as SynInputType } from '@synergy-design-system/components';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/tab/tab.js';
import '../../../components/src/components/tab-group/tab-group.js';
import '../../../components/src/components/tab-panel/tab-panel.js';
import { IconsSearchPage } from './IconSearchPage.js';

export const THEMES = ['sick2018', 'sick2025-fill', 'sick2025-outline'] as const;
export type Themes = typeof THEMES[number];

type Props = {
  themes: Array<{ id: Themes, name: string }>;
};

export const IconSearchPageThemes: FC<Props> = ({ themes }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchTermChange = (event: SynInputEvent) => {
    setSearchTerm((event.target as SynInputType).value.toLowerCase() || '');
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{
          backgroundColor: 'var(--syn-color-neutral-0)',
          paddingTop: 'var(--syn-spacing-x-large)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <syn-input
            label="Search icons"
            onsyn-input={handleSearchTermChange}
            style={{ marginBottom: 'var(--syn-spacing-x-large)' }}
          ></syn-input>
        </div>
        <syn-tab-group>
          {themes.map(({ id, name }) => (
            <>
              <syn-tab panel={id} slot="nav">
                {name}
              </syn-tab>
              <syn-tab-panel name={id}>
                <IconsSearchPage mode={id} searchTerm={searchTerm} />
              </syn-tab-panel>
            </>
          ))}
        </syn-tab-group>
      </div>
      <style>
        {
          `
          syn-tab-group::part(nav) {
            position: sticky;
            top: var(--syn-spacing-5x-large);
            z-index: 10;
            background-color: var(--syn-color-neutral-0);
          }
          `
        }
      </style>
    </>
  );
};
