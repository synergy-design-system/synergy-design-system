import { Component } from '@angular/core';
import type { SynChangeEvent, SynSwitch as SynSwitchElement } from '@synergy-design-system/components';

@Component({
  selector: 'theme-switch',
  templateUrl: './themeswitch.component.html',
})
export class ThemeSwitchComponent {

  currentTheme: string = '🌙';

  switchTheme(e: SynChangeEvent) {
    const { body } = document;
    const { checked } = e.target as SynSwitchElement;
    const theme = checked ? 'dark' : 'light';
    body.classList.remove('syn-theme-light', 'syn-theme-dark');
    body.classList.add(`syn-theme-${theme}`);

    this.currentTheme = theme === 'light' ? '🌙' : '☀️';
  }
}
