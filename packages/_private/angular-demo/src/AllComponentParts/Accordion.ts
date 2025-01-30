import { Component } from '@angular/core';
import { SynAccordionComponent } from '@synergy-design-system/angular/components/accordion';
import { SynDetailsComponent } from '@synergy-design-system/angular/components/details';

@Component({
  selector: 'demo-accordion',
  standalone: true,
  imports: [
    SynAccordionComponent,
    SynDetailsComponent,
  ],
  template: `
    <syn-accordion>
      <syn-details summary="First" open>
        <h3>Subheadline</h3>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </syn-details>
      <syn-details summary="Second">
        <h3>Subheadline</h3>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </syn-details>
      <syn-details summary="Third">
        <h3>Subheadline</h3>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </syn-details>
    </syn-accordion>
  `,
})
export class Accordion {}
