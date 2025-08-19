import React, {
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import '@synergy-design-system/components/components/tab-group/tab-group.js';
import '@synergy-design-system/components/components/tab/tab.js';
import '@synergy-design-system/components/components/tab-panel/tab-panel.js';

type ThemeTab = {
  className: string;
  mode?: 'dark' | 'light';
  name: string;
  output?: ReactNode;
  title: string;
};

interface TokensForThemesProps {
  themes: ThemeTab[];
}

export const getThemesForComponent = (
  themesNames: string[] = ['2018', '2025'],
  outputGenerator?: (theme: ThemeTab) => ReactNode,
): ThemeTab[] => themesNames.map(themeName => {
  // We support getting either a theme name or a split name.
  const [theme, mode = 'light'] = themeName.split('-');

  const data = {
    className: `syn-sick${theme}-${mode}`,
    name: `SICK ${theme} ${mode}`,
    title: themeName,
  };

  return {
    ...data,
    output: outputGenerator ? outputGenerator(data) : (<></>),
  };
});

export const TokensForThemes: FC<PropsWithChildren<TokensForThemesProps>> = ({
  themes,
}) => (
  <>
    <syn-tab-group>
      {themes.map(theme => (
        <React.Fragment key={theme.title}>
          {/* Disable the TOC table of storybook, as all headings of each tab appear.. */}
          <syn-tab-panel name={theme.title} className={`${theme.className} toc-ignore`} key={`${theme.title}-panel`}>
            {theme.output}
          </syn-tab-panel>
          <syn-tab
            slot="nav"
            panel={theme.title}
            key={`${theme.title}-tab`}
          >
            {theme.name}
          </syn-tab>
        </React.Fragment>
      ))}
    </syn-tab-group>
    <style>
      {`
        syn-tab-group::part(nav) {
          background-color: var(--syn-color-neutral-0);
          padding-top: var(--syn-spacing-medium);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        
      `}
    </style>
  </>
);
