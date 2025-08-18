import React, { FC, useState } from 'react';
import {
  SynInput, SynTab, SynTabGroup, SynTabPanel,
} from '@synergy-design-system/react';
import type { SynInputEvent, SynInput as SynInputType } from '@synergy-design-system/components';
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
      <div style={{
        backgroundColor: 'var(--syn-color-neutral-0)',
        paddingTop: 'var(--syn-spacing-x-large)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        <SynInput
          label="Search icons"
          onSynInput={handleSearchTermChange}
          style={{ marginBottom: 'var(--syn-spacing-x-large)' }}
        ></SynInput>
      </div>
      <SynTabGroup>
        {themes.map(({ id, name }) => (
          <>
            <SynTab panel={id} slot="nav">
              {name}
            </SynTab><SynTabPanel name={id}>
              <IconsSearchPage mode={id} searchTerm={searchTerm} />
            </SynTabPanel>
          </>
        ))}
      </SynTabGroup>
    </>
  );
};
