export const TabGroup = () => (
  <syn-tab-group contained>
    <syn-tab-panel name="example-general" active>
      This is the general tab panel.
    </syn-tab-panel>
    <syn-tab-panel name="example-custom">This is the custom tab panel.</syn-tab-panel>
    <syn-tab-panel name="example-advanced">This is the advanced tab panel.</syn-tab-panel>
    <syn-tab-panel name="example-disabled">This is the disabled tab panel.</syn-tab-panel>
    <syn-tab slot="nav" panel="example-general" active>General</syn-tab>
    <syn-tab slot="nav" panel="example-custom">Custom</syn-tab>
    <syn-tab slot="nav" panel="example-advanced">Advanced</syn-tab>
    <syn-tab slot="nav" panel="example-disabled" disabled>Disabled</syn-tab>
  </syn-tab-group>
);
