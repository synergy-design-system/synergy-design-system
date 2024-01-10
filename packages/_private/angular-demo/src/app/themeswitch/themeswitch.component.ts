import { Component } from '@angular/core';

@Component({
  selector: 'theme-switch',
  styleUrls: ['./themeswitch.css'],
  templateUrl: './themeswitch.component.html',
})
export class ThemeSwitchComponent {

  buttonText: string = 'Switch Theme';

  switchTheme() {
    const bdy = document.body;
    const currentTheme = bdy.classList.contains('syn-theme-dark') ? 'dark' : 'light';

    if (currentTheme === 'light') {
      // Light theme
      bdy.classList.remove('syn-theme-light');
      bdy.classList.add('syn-theme-dark');
      this.buttonText = 'Switch to light theme';
    } else {
      // Dark theme
      bdy.classList.remove('syn-theme-dark');
      bdy.classList.add('syn-theme-light');
      this.buttonText = 'Switch to dark theme';
    }

    // Will toggle between light to dark
    // with each call to switchTheme
    console.log(bdy.className);
  }
}
