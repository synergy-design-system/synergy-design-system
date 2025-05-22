import React, {
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import {
  SynTab,
  SynTabGroup,
  SynTabPanel,
} from '@synergy-design-system/react';

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
    className: `syn-sick-${theme}-${mode}`,
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
  <SynTabGroup>
    {themes.map(theme => (
      <React.Fragment key={theme.title}>
        <SynTabPanel name={theme.title} className={theme.className} key={`${theme.title}-panel`}>
          {theme.output}
        </SynTabPanel>
        <SynTab
          slot="nav"
          panel={theme.title}
          key={`${theme.title}-tab`}
        >
          {theme.name}
        </SynTab>
      </React.Fragment>
    ))}
  </SynTabGroup>
);
