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
  const [currentTheme, setCurrentTheme] = useState<AllowedThemes>('synergy');
  const [currentMode, setCurrentMode] = useState<AllowedModes>('light');

  useEffect(() => {
    setTheme(currentTheme, currentMode);
  }, [currentTheme, currentMode]);
  return (
    <>
      <syn-icon-button
        label={`Experimental Theme? ${currentTheme === 'brand25' ? '✓' : '✗'}`}
        name={currentTheme === 'brand25' ? 'visibility_off' : 'visibility'}
        size="small"
        onClick={() => {
          setCurrentTheme(currentTheme === 'brand25' ? 'synergy' : 'brand25');
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
