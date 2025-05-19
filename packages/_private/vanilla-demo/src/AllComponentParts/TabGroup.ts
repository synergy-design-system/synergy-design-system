import { html } from 'lit';

export const TabGroup = (regressions: Array< () => void> = []) => {
  regressions.forEach((regression) => {
    regression();
  });

  return html`
    <syn-tab-group contained>
      <syn-tab-panel name="general">
        This is the general tab panel.
      </syn-tab-panel>
      <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
      <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
      <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
      <syn-tab slot="nav" panel="general">General</syn-tab>
      <syn-tab slot="nav" panel="disabled" disabled>Disabled</syn-tab>
      <syn-tab slot="nav" panel="custom">Custom</syn-tab>
      <syn-tab slot="nav" panel="advanced" active>Advanced</syn-tab>
    </syn-tab-group>
    <syn-button>Add Tab</syn-button>
  `;
};
