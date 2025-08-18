import React, { FC, useState } from 'react';
import {
  SynInput, SynTab, SynTabGroup, SynTabPanel,
} from '@synergy-design-system/react';
import type { SynInputEvent, SynInput as SynInputType } from '@synergy-design-system/components';
import { IconsSearchPage } from './IconSearchPage.js';

type Props = {
  themes: Array<'sick2018' | 'sick2025'>;
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
        {themes.map((mode) => (
          <>
            <SynTab panel={mode} slot="nav">
              {mode}
            </SynTab><SynTabPanel name={mode}>
              <IconsSearchPage mode={mode} searchTerm={searchTerm} />
            </SynTabPanel>
          </>
        ))}
      </SynTabGroup>
    </>
  );
};
