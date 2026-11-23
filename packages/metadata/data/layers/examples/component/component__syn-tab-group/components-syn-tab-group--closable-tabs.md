## Closable Tabs

Add the closable attribute to a tab to show a close button. This example shows how you can dynamically remove tabs from the DOM when the close button is activated.

```html
<syn-tab-group class="tabs-closable">
  <!-- Tabs -->
  <syn-tab slot="nav" panel="general" active="">General</syn-tab
  ><syn-tab slot="nav" panel="closable-1" closable="">Closable 1</syn-tab
  ><syn-tab slot="nav" panel="closable-2" closable="">Closable 2</syn-tab
  ><syn-tab slot="nav" panel="closable-3" closable="">Closable 3</syn-tab>

  <!-- Tab Panels  -->
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  ><syn-tab-panel name="closable-1"
    >This is the first closable tab panel.</syn-tab-panel
  ><syn-tab-panel name="closable-2"
    >This is the second closable tab panel.</syn-tab-panel
  ><syn-tab-panel name="closable-3"
    >This is the third closable tab panel.</syn-tab-panel
  >
</syn-tab-group>

<script type="module">
  const tabGroup = document.querySelector(".tabs-closable");
  tabGroup.addEventListener("syn-close", async (event) => {
    const tab = event.target;
    const panel = tabGroup.querySelector(`syn-tab-panel[name="${tab.panel}"]`);

    // Show the previous tab if the tab is currently active
    if (tab.active) {
      tabGroup.show(tab.previousElementSibling.panel);
    }

    // Remove the tab + panel
    tab.remove();
    panel.remove();
  });
</script>
```
