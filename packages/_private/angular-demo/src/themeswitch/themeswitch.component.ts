import { Component } from '@angular/core';
import type { SynChangeEvent, SynSelect } from '@synergy-design-system/components';
import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'theme-switch',
  styleUrls: ['./themeswitch.component.css'],
  standalone: false,
  templateUrl: './themeswitch.component.html',
})
export class ThemeSwitchComponent {

  currentMode = 'light_mode';

  availableThemes = getAvailableThemes();

  setCurrentTheme(e: SynChangeEvent) {
    const value = (e.target as SynSelect).value as string;
    setThemeFromOptionString(value);
    this.currentMode = value.includes('light') ? 'light_mode' : 'dark_mode';
  }
}
