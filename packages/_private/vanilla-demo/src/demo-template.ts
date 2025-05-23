import { LitElement, TemplateResult, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { RegressionFns, Regressions } from './all-components-regressions.js';

/**
 * This is a demo template of all the components.
 * It will render all the components in the package into a tab group.
 */
class DemoTemplate extends LitElement {
  @property({ attribute: false })
    demos: Array<[string, (args: RegressionFns) => TemplateResult<1>]> = [];

  @property({ attribute: false })
    regressions!: Regressions;

  render() {
    const activeDemo = this.demos[0]?.[0] || '';

    return html`
    ${this.demos.length === 0 ? html`<span> There are no demos available.</span>` : html`
     <syn-tab-group>
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
            <div id="tab-content-${name}">
              ${html`${Component((this.regressions && this.regressions.has(name)) ? (this.regressions.get(name) || []) : [])}`}
            </div>
          </syn-tab-panel>
        `)}
      </syn-tab-group>
    `}
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
