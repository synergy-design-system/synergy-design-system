import React, { FC, Fragment, useState } from 'react';
import type { SynInputEvent, SynInput as SynInputType } from '@synergy-design-system/components';
import '@synergy-design-system/components/components/input/input.js';
import '@synergy-design-system/components/components/tab-group/tab-group.js';
import '@synergy-design-system/components/components/tab/tab.js';
import '@synergy-design-system/components/components/tab-panel/tab-panel.js';
import { registerIconLibrary } from '../../../components/src/components/icon/library.js';
import { migrateIconName } from '../../../components/src/components/icon/library.migration.js';
import { defaultIcons as sick2018Icons } from '../../../assets/src/default-icons.js';
import { outlineIcons as sick2025Outline } from '../../../assets/src/sick2025-outline-icons.js';
import { IconsSearchPage } from './IconSearchPage.js';

registerIconLibrary('migration', {
  resolver: name => {
    const mappedName = migrateIconName(name);
    const defaultName = mappedName as keyof typeof sick2025Outline;
    return `data:image/svg+xml,${encodeURIComponent(sick2025Outline[defaultName])}`;
  },
});

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
            <Fragment key={id}>
              <syn-tab panel={id} slot="nav">
                {name}
              </syn-tab>
              <syn-tab-panel name={id}>
                <IconsSearchPage mode={id} searchTerm={searchTerm} />
              </syn-tab-panel>
            </Fragment>
          ))}

          <syn-tab panel="migration" slot="nav" active>
            Icon Migration
          </syn-tab>

          <syn-tab-panel name="migration">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 'var(--syn-spacing-large)',
              }}
            >
              {Object.entries(sick2018Icons).map(([iconName]) => (
                <div
                  style={{
                    border: '1px solid var(--syn-color-neutral-200)',
                    borderRadius: 'var(--syn-border-radius-medium)',
                    padding: 'var(--syn-spacing-large)',
                    textAlign: 'center',
                    width: '150px',
                  }}
                  key={iconName}
                >
                  <h2
                    style={{
                      fontSize: 'var(--syn-font-size-small)',
                      marginBottom: 'var(--syn-spacing-medium)',
                      textWrap: 'pretty',
                      wordBreak: 'break-word',
                    }}
                  >{iconName}</h2>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      fontSize: '30px',
                      gap: 10,
                      justifyContent: 'center',
                    }}
                  >
                    <syn-icon name={iconName} library="default" />
                    <syn-icon name={iconName} library="migration" />
                  </div>
                </div>
              ))}
            </div>
          </syn-tab-panel>

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
