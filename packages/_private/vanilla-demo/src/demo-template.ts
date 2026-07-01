import {
  LitElement,
  type TemplateResult,
  html,
  unsafeCSS,
} from 'lit';
import { property } from 'lit/decorators.js';
import demoTemplateCss from '@synergy-design-system/demo-utilities/styles/demo-template.css?inline';
import type { RegressionFns, Regressions } from './all-components-regressions.js';

/**
 * This is a demo template of all the components.
 * It will render all the components in the package into a tab group.
 */
class DemoTemplate extends LitElement {
  static styles = [unsafeCSS(demoTemplateCss)];

  @property({ attribute: false })
  demos: Array<[string, (args: RegressionFns) => TemplateResult<1>]> = [];

  @property({ attribute: false })
  regressions!: Regressions;

  @property({ attribute: false })
  activeDemo = '';

  connectedCallback() {
    super.connectedCallback();
    this.activeDemo = this.demos[0]?.[0] || '';
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('demos')) {
      this.activeDemo = this.demos[0]?.[0] || '';
    }
  }

  private handleTabShow = (e: Event) => {
    const { name } = (e as CustomEvent<{ name: string }>).detail;
    const demoNames = new Set(this.demos.map(([demoName]) => demoName));
    if (!demoNames.has(name)) {
      return;
    }

    (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

    const dialog = document.querySelector('syn-dialog');
    if (dialog) {
      dialog.open = name === 'Dialog';
    }

    this.activeDemo = name;
  };

  render() {
    const activeDemo = this.activeDemo || this.demos[0]?.[0] || '';

    if (this.demos.length === 0) {
      return html`<span> There are no demos available.</span>`;
    }

    return html`
     <syn-tab-group class="demo-tab-group" placement="end" @syn-tab-show=${this.handleTabShow}>
        ${this.demos.map(([name, Component]) => html`
          <syn-tab
            ?active=${name === activeDemo}
            id="tab-${name}"
            panel=${name}
            slot="nav"
          >
            ${name}
          </syn-tab>
          <syn-tab-panel
            ?active=${name === activeDemo}
            name=${name}
          >
            ${name === activeDemo ? html`
              <div id="tab-content-${name}">
                <h1 class="syn-heading--3x-large">${name}</h1>
                <syn-divider></syn-divider>
                ${html`${Component((this.regressions && this.regressions.has(name)) ? (this.regressions.get(name) || []) : [])}`}
              </div>
            ` : null}
          </syn-tab-panel>
        `)}
      </syn-tab-group>
    `;
  }
}

export const afterRenderDemoTemplate = async ({ id, demos, regressions }: {
  id: string;
  demos: Array<[string, (args: RegressionFns) => TemplateResult<1>]>;
  regressions?: Regressions;
}) => {
  await Promise.allSettled([
    customElements.whenDefined('syn-tab-group'),
    customElements.whenDefined('syn-accordion'),
  ]);

  if (!customElements.get('demo-template')) {
    customElements.define('demo-template', DemoTemplate);
  }

  const indicator = document.querySelector(`syn-progress-bar#${id}`);
  const container = indicator?.parentElement;

  indicator?.remove();
  const demoTemplate = document.createElement('demo-template') as DemoTemplate;
  demoTemplate.demos = demos;

  if (regressions) {
    demoTemplate.regressions = regressions;
  }

  container?.appendChild(demoTemplate);
};
