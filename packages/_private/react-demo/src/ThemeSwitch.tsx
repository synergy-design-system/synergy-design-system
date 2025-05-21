import { useEffect, useState } from 'react';
import { SynSwitch } from '@synergy-design-system/react';
import type {
  SynChangeEvent,
  SynSwitch as SynSwitchElement,
} from '@synergy-design-system/components';
import {
  type AllowedModes,
  type AllowedThemes,
  setTheme,
} from '@synergy-design-system/demo-utilities';

export const ThemeSwitch = () => {
  const [currentTheme, setCurrentTheme] = useState<AllowedThemes>('2018');
  const [currentMode, setCurrentMode] = useState<AllowedModes>('light');

  useEffect(() => {
    setTheme(currentTheme, currentMode);
  }, [currentTheme, currentMode]);
  return (
    <>
      <syn-icon-button
        label={`Experimental Theme? ${currentTheme === '2025' ? '✓' : '✗'}`}
        name={currentTheme === '2018' ? 'visibility_off' : 'visibility'}
        size="small"
        onClick={() => {
          setCurrentTheme(currentTheme === '2018' ? '2025' : '2018');
        }}
      />
      <SynSwitch
        size="small"
        onSynChange={(e: SynChangeEvent) => {
          const { checked } = e.target as SynSwitchElement;
          setCurrentMode(checked ? 'dark' : 'light');
        }}
      >
        {currentMode === 'dark' ? '🌙' : '🌞'}
      </SynSwitch>
    </>
  );
};
