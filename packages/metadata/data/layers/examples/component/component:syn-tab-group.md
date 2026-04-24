## Default

Tab groups organize content into a container that shows one section at a time. Tab groups make use of tabs and tab panels. Each tab must be slotted into the nav slot and its panel must refer to a tab panel of the same name.

```html
<syn-tab-group>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <span slot="nav"> </span> <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <span slot="nav"> </span>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <span slot="nav"> </span>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
</syn-tab-group>
```

---

## Tabs On Start

Tabs can be shown on the starting side by setting placement to start.

```html
<syn-tab-group placement="start">
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```

---

## Tabs On End

Tabs can be shown on the ending side by setting placement to end.

```html
<syn-tab-group placement="end">
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```

---

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

---

## Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html
<syn-tab-group>
  <!-- Tabs -->
  <syn-tab slot="nav" panel="tab-1" active="">Tab 1</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab 2</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab 3</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab 4</syn-tab
  ><syn-tab slot="nav" panel="tab-5">Tab 5</syn-tab
  ><syn-tab slot="nav" panel="tab-6">Tab 6</syn-tab
  ><syn-tab slot="nav" panel="tab-7">Tab 7</syn-tab
  ><syn-tab slot="nav" panel="tab-8">Tab 8</syn-tab
  ><syn-tab slot="nav" panel="tab-9">Tab 9</syn-tab
  ><syn-tab slot="nav" panel="tab-10">Tab 10</syn-tab
  ><syn-tab slot="nav" panel="tab-11">Tab 11</syn-tab
  ><syn-tab slot="nav" panel="tab-12">Tab 12</syn-tab
  ><syn-tab slot="nav" panel="tab-13">Tab 13</syn-tab
  ><syn-tab slot="nav" panel="tab-14">Tab 14</syn-tab
  ><syn-tab slot="nav" panel="tab-15">Tab 15</syn-tab
  ><syn-tab slot="nav" panel="tab-16">Tab 16</syn-tab
  ><syn-tab slot="nav" panel="tab-17">Tab 17</syn-tab
  ><syn-tab slot="nav" panel="tab-18">Tab 18</syn-tab
  ><syn-tab slot="nav" panel="tab-19">Tab 19</syn-tab
  ><syn-tab slot="nav" panel="tab-20">Tab 20</syn-tab>

  <!-- Tab Panels -->
  <syn-tab-panel name="tab-1" active="">Tab panel 1</syn-tab-panel
  ><syn-tab-panel name="tab-2">Tab panel 2</syn-tab-panel
  ><syn-tab-panel name="tab-3">Tab panel 3</syn-tab-panel
  ><syn-tab-panel name="tab-4">Tab panel 4</syn-tab-panel
  ><syn-tab-panel name="tab-5">Tab panel 5</syn-tab-panel
  ><syn-tab-panel name="tab-6">Tab panel 6</syn-tab-panel
  ><syn-tab-panel name="tab-7">Tab panel 7</syn-tab-panel
  ><syn-tab-panel name="tab-8">Tab panel 8</syn-tab-panel
  ><syn-tab-panel name="tab-9">Tab panel 9</syn-tab-panel
  ><syn-tab-panel name="tab-10">Tab panel 10</syn-tab-panel
  ><syn-tab-panel name="tab-11">Tab panel 11</syn-tab-panel
  ><syn-tab-panel name="tab-12">Tab panel 12</syn-tab-panel
  ><syn-tab-panel name="tab-13">Tab panel 13</syn-tab-panel
  ><syn-tab-panel name="tab-14">Tab panel 14</syn-tab-panel
  ><syn-tab-panel name="tab-15">Tab panel 15</syn-tab-panel
  ><syn-tab-panel name="tab-16">Tab panel 16</syn-tab-panel
  ><syn-tab-panel name="tab-17">Tab panel 17</syn-tab-panel
  ><syn-tab-panel name="tab-18">Tab panel 18</syn-tab-panel
  ><syn-tab-panel name="tab-19">Tab panel 19</syn-tab-panel
  ><syn-tab-panel name="tab-20">Tab panel 20</syn-tab-panel>
</syn-tab-group>
```

---

## Visual Hierarchy

To structure the Page, you can use different tab styles.

```html
<h3 class="body-medium">Default</h3>
<syn-tab-group>
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Contained</h3>
<syn-tab-group contained="">
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Sharp</h3>
<syn-tab-group contained="" sharp="">
  <syn-tab slot="nav" panel="tab-1" active="">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-2">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-3">Tab item</syn-tab
  ><syn-tab slot="nav" panel="tab-4">Tab item</syn-tab>

  <syn-tab-panel name="tab-1" active="">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-2">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-3">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel name="tab-4">
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<style>
  .synergy-replace {
    border: 1px dashed #9747ff;
    border-radius: var(--syn-border-radius-small);
    color: #9747ff;
    font: var(--syn-body-small-bold);
    height: var(--syn-spacing-x-large);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .body-medium:first-of-type {
    margin-top: 0;
  }

  .body-medium {
    font: var(--syn-body-medium-bold);
    color: var(--syn-color-neutral-1000);
    margin-top: var(--syn-spacing-2x-large);
    margin-bottom: var(--syn-spacing-large);
  }
</style>
```

---

## Manual Activation

When focused, keyboard users can press Left or Right to select the desired tab. By default, the corresponding tab panel will be shown immediately (automatic activation). You can change this behavior by setting activation="manual" which will require the user to press Space or Enter before showing the tab panel (manual activation).

```html
<syn-tab-group activation="manual">
  <syn-tab slot="nav" panel="general" active="">General</syn-tab>
  <syn-tab slot="nav" panel="custom">Custom</syn-tab>
  <syn-tab slot="nav" panel="advanced">Advanced</syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">Disabled</syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```

---

## Icons

It is also possible to a Add icon to the Tabs.

```html
<syn-tab-group>
  <syn-tab slot="nav" panel="general" active="">
    <syn-icon name="style"></syn-icon>
    General
  </syn-tab>
  <syn-tab slot="nav" panel="custom">
    <syn-icon name="tune"></syn-icon>
    Custom
  </syn-tab>
  <syn-tab slot="nav" panel="advanced">
    <syn-icon name="verified_user"></syn-icon>
    Advanced
  </syn-tab>
  <syn-tab slot="nav" panel="disabled" disabled="">
    <syn-icon name="update_disabled"></syn-icon>
    Disabled
  </syn-tab>
  <syn-tab-panel name="general" active=""
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel name="custom">This is the custom tab panel.</syn-tab-panel>
  <syn-tab-panel name="advanced">This is the advanced tab panel.</syn-tab-panel>
  <syn-tab-panel name="disabled">This is the disabled tab panel.</syn-tab-panel>
</syn-tab-group>
```
