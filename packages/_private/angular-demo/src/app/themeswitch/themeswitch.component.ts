import { Component } from '@angular/core';

@Component({
  selector: 'theme-switch',
  styleUrls: ['./themeswitch.css'],
  templateUrl: './themeswitch.component.html',
})
export class ThemeSwitchComponent {

  buttonText: string = 'Switch Theme';

  switchTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('syn-theme-dark') ? 'dark' : 'light';

    if (currentTheme === 'light') {
      // Light theme
      body.classList.remove('syn-theme-light');
      body.classList.add('syn-theme-dark');
      this.buttonText = 'Switch to light theme';
    } else {
      // Dark theme
      body.classList.remove('syn-theme-dark');
      body.classList.add('syn-theme-light');
      this.buttonText = 'Switch to dark theme';
    }
  }
}
