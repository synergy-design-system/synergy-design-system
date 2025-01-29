import { LitElement, html } from 'lit';
import { type SynTabShowEvent } from '@synergy-design-system/components';
import * as DemoImports from './AllComponentParts/index.js';

const Demos = Object.entries(DemoImports);
const activeDemo = Demos.at(0)?.at(0);

/**
 * This is a demo of all the components.
 * It will render all the components in the package into a tab group.
 */
class AllComponents extends LitElement {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <syn-tab-group
        @syn-tab-show=${(e: SynTabShowEvent) => {
          const { name } = e.detail;
          (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

          const dialog = this.shadowRoot?.querySelector('syn-dialog');
          if (dialog) {
            dialog.open = name === 'Dialog';
          }
        }}
      >
        ${Demos.map(([name, Component]) => html`
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
            <div id="tab-content-${name}" style="display: contents">
              ${html`${Component()}`}
            </div>
          </syn-tab-panel>
        `)}
      </syn-tab-group>
    `;
  }
}

export const afterRenderAllComponents = async () => {
  await Promise.allSettled([
    customElements.whenDefined('syn-tab-group'),
    customElements.whenDefined('syn-accordion'),
  ]);

  if (!customElements.get('demo-all-components')) {
    customElements.define('demo-all-components', AllComponents);
  }

  const indicator = document.querySelector('syn-progress-bar#all-components');
  const container = indicator?.parentElement;

  indicator?.remove();
  container?.appendChild(document.createElement('demo-all-components'));
};
