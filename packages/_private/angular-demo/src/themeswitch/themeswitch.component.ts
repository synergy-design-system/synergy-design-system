import { Component } from '@angular/core';
import type { SynChangeEvent, SynSwitch as SynSwitchElement } from '@synergy-design-system/components';
import {
  type AllowedModes,
  type AllowedThemes,
  setTheme,
} from '@synergy-design-system/demo-utilities';

@Component({
  selector: 'theme-switch',
  styleUrls: ['./themeswitch.component.css'],
  standalone: false,
  templateUrl: './themeswitch.component.html',
})
export class ThemeSwitchComponent {

  currentTheme: AllowedThemes = '2018';
  currentMode: AllowedModes = 'light';

  constructor() {
    setTheme(this.currentTheme, this.currentMode);
  }

  setCurrentTheme() {
    this.currentTheme = this.currentTheme === '2025' ? '2018' : '2025';
    setTheme(this.currentTheme, this.currentMode);
  }

  setCurrentMode(e: SynChangeEvent) {
    const { checked } = e.target as SynSwitchElement;
    this.currentMode = checked ? 'dark' : 'light';
    setTheme(this.currentTheme, this.currentMode);
  }
}
