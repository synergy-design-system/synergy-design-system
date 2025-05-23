import { Component } from '@angular/core';
import { SynTabGroupComponent, SynTabComponent, SynTabPanelComponent } from '@synergy-design-system/angular';
import { CommonModule, type NgComponentOutlet } from '@angular/common';
import { type SynTabShowEvent } from '@synergy-design-system/components';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'demos-component',
  standalone: true,
  imports: [
    CommonModule,
    SynTabGroupComponent,
    SynTabComponent,
    SynTabPanelComponent,
  ],
  templateUrl: './demos.component.html',
})
export class DemosComponent {
  activeDemo = '';

  demos: Array<[string, typeof NgComponentOutlet]> = [];


  constructor(private route: ActivatedRoute) {
    const routeDemos = this.route.snapshot.data['demos'];
    if (routeDemos) {
      this.demos = routeDemos;
    }
    this.activeDemo = this.demos[0]?.[0] || '';
  }

  handleTabShow = (e: SynTabShowEvent) => {
    const { name } = e.detail;
    (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

    const dialog = document.querySelector('syn-dialog');
    if (dialog) {
      dialog.open = name === 'Dialog';
    }
  }
}
