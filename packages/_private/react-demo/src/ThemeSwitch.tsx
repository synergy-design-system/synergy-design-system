import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';
import type { SynSelect } from '@synergy-design-system/components';
import { useState } from 'react';

export const ThemeSwitch = () => {
  const [currentMode, setCurrentMode] = useState('light_mode');

return (
  <syn-select
    onsyn-change={e => {
      const value = (e.target as SynSelect).value as string;
      setCurrentMode(value.includes('light') ? 'light_mode' : 'dark_mode');
      setThemeFromOptionString(value);
    }}
    placeholder="Select theme to use"
    size="small"
    value="2018-light"
  >
    <syn-icon name={currentMode} slot="prefix" style={{color: 'var(--syn-color-warning-500)'}}></syn-icon>

    {Object
      .entries(getAvailableThemes())
      .map(([key, theme]) => (
        <syn-optgroup label={`${theme.title}`} key={key}>
          {theme.modes.map(mode => (
            <syn-option value={`${theme.name}-${mode}`} key={mode}>
              <syn-icon name={mode.includes('light') ? 'light_mode' : 'dark_mode'} slot="prefix" style={{color: 'var(--syn-color-warning-500)'}}></syn-icon>
              {theme.title}
              -
              {mode}
            </syn-option>
          ))}
        </syn-optgroup>
      ))}
  </syn-select>
)};
