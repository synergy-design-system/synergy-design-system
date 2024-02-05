import { useState } from 'react';
import {
  type SynChangeEvent,
  SynSwitch,
} from '@synergy-design-system/react';
import type { SynSwitch as SynSwitchElement } from '@synergy-design-system/components';

export const ThemeSwitch = () => {
  const [currentTheme, setCurrentTheme] = useState('🌙');
  return (
    <SynSwitch
      onSynChange={(e: SynChangeEvent) => {
        const { body } = document;
        const { checked } = e.target as SynSwitchElement;
        const theme = checked ? 'dark' : 'light';
        body.classList.remove('syn-theme-light', 'syn-theme-dark');
        body.classList.add(`syn-theme-${theme}`);

        setCurrentTheme(theme === 'light' ? '🌙' : '☀️');
      }}
    >
      {currentTheme}
    </SynSwitch>
  );
};
