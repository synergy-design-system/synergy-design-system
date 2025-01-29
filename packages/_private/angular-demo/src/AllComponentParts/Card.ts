import { Component } from '@angular/core';
import { SynCardComponent, SynButtonComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-card',
  standalone: true,
  imports: [
    SynButtonComponent,
    SynCardComponent,
  ],
  template: `
    <syn-card style="max-width: 400px">
      <h3>Headline</h3>
      This are some happy employees, but not just any employees. These are SICK
      employees.

      <footer slot="footer">
        <small>Optional information</small>
        <nav>
          <syn-button variant="filled" size="small">More Info</syn-button>
        </nav>
      </footer>
      <img
        slot="image"
        src="/public/card-example.jpg"
        alt="Multiple persons having lunch in SICK Academy"
      />
    </syn-card>
  `,
})
export class Card {}
