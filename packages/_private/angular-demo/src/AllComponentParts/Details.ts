import { Component } from '@angular/core';
import { SynDetailsComponent } from '@synergy-design-system/angular';

@Component({
  selector: 'demo-details',
  standalone: true,
  imports: [
    SynDetailsComponent,
  ],
  template: `
    <syn-details summary="Toggle Me" contained>
      <h3>Subheadline</h3>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </syn-details>
  `,
})
export class Details {}
