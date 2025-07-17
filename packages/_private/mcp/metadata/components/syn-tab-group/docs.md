
## Default

Tab groups organize content into a container that shows one section at a time. Tab groups make use of tabs and tab panels. Each tab must be slotted into the nav slot and its panel must refer to a tab panel of the same name.

```html
<syn-tab-group>
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-13"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="custom"
    id="syn-tab-panel-14"
    role="tabpanel"
    aria-hidden="true"
    >This is the custom tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="advanced"
    id="syn-tab-panel-15"
    role="tabpanel"
    aria-hidden="true"
    >This is the advanced tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="disabled"
    id="syn-tab-panel-16"
    role="tabpanel"
    aria-hidden="true"
    >This is the disabled tab panel.</syn-tab-panel
  >
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-21"
    tabindex="0"
    >General</syn-tab
  >
  <span slot="nav"> </span>
  <syn-tab
    slot="nav"
    panel="custom"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-22"
    tabindex="0"
    >Custom</syn-tab
  >
  <span slot="nav"> </span>
  <syn-tab
    slot="nav"
    panel="advanced"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-23"
    tabindex="0"
    >Advanced</syn-tab
  >
  <span slot="nav"> </span>
  <syn-tab
    slot="nav"
    panel="disabled"
    disabled=""
    role="tab"
    aria-disabled="true"
    aria-selected="false"
    id="syn-tab-24"
    tabindex="-1"
    >Disabled</syn-tab
  >
</syn-tab-group>

```

---

## Tabs On Start

Tabs can be shown on the starting side by setting placement to start.

```html
<syn-tab-group placement="start">
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-29"
    tabindex="0"
    >General</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="custom"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-30"
    tabindex="0"
    >Custom</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="advanced"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-31"
    tabindex="0"
    >Advanced</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="disabled"
    disabled=""
    role="tab"
    aria-disabled="true"
    aria-selected="false"
    id="syn-tab-32"
    tabindex="-1"
    >Disabled</syn-tab
  >
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-21"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="custom"
    id="syn-tab-panel-22"
    role="tabpanel"
    aria-hidden="true"
    >This is the custom tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="advanced"
    id="syn-tab-panel-23"
    role="tabpanel"
    aria-hidden="true"
    >This is the advanced tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="disabled"
    id="syn-tab-panel-24"
    role="tabpanel"
    aria-hidden="true"
    >This is the disabled tab panel.</syn-tab-panel
  >
</syn-tab-group>

```

---

## Tabs On End

Tabs can be shown on the ending side by setting placement to end.

```html
<syn-tab-group placement="end">
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-37"
    tabindex="0"
    >General</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="custom"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-38"
    tabindex="0"
    >Custom</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="advanced"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-39"
    tabindex="0"
    >Advanced</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="disabled"
    disabled=""
    role="tab"
    aria-disabled="true"
    aria-selected="false"
    id="syn-tab-40"
    tabindex="-1"
    >Disabled</syn-tab
  >
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-29"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="custom"
    id="syn-tab-panel-30"
    role="tabpanel"
    aria-hidden="true"
    >This is the custom tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="advanced"
    id="syn-tab-panel-31"
    role="tabpanel"
    aria-hidden="true"
    >This is the advanced tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="disabled"
    id="syn-tab-panel-32"
    role="tabpanel"
    aria-hidden="true"
    >This is the disabled tab panel.</syn-tab-panel
  >
</syn-tab-group>

```

---

## Closable Tabs

Add the closable attribute to a tab to show a close button. This example shows how you can dynamically remove tabs from the DOM when the close button is activated.

```html
<syn-tab-group class="tabs-closable">
  <!-- Tabs -->
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-45"
    tabindex="0"
    >General</syn-tab
  ><syn-tab
    slot="nav"
    panel="closable-1"
    closable=""
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-46"
    tabindex="0"
    >Closable 1</syn-tab
  ><syn-tab
    slot="nav"
    panel="closable-2"
    closable=""
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-47"
    tabindex="0"
    >Closable 2</syn-tab
  ><syn-tab
    slot="nav"
    panel="closable-3"
    closable=""
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-48"
    tabindex="0"
    >Closable 3</syn-tab
  >

  <!-- Tab Panels  -->
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-37"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  ><syn-tab-panel
    name="closable-1"
    id="syn-tab-panel-38"
    role="tabpanel"
    aria-hidden="true"
    >This is the first closable tab panel.</syn-tab-panel
  ><syn-tab-panel
    name="closable-2"
    id="syn-tab-panel-39"
    role="tabpanel"
    aria-hidden="true"
    >This is the second closable tab panel.</syn-tab-panel
  ><syn-tab-panel
    name="closable-3"
    id="syn-tab-panel-40"
    role="tabpanel"
    aria-hidden="true"
    >This is the third closable tab panel.</syn-tab-panel
  >
</syn-tab-group>

```

---

## Scrolling Tabs

When there are more tabs than horizontal space allows, the nav will be scrollable.

```html
<syn-tab-group>
  <!-- Tabs -->
  <syn-tab
    slot="nav"
    panel="tab-1"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-69"
    tabindex="0"
    >Tab 1</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-2"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-70"
    tabindex="0"
    >Tab 2</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-3"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-71"
    tabindex="0"
    >Tab 3</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-4"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-72"
    tabindex="0"
    >Tab 4</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-5"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-73"
    tabindex="0"
    >Tab 5</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-6"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-74"
    tabindex="0"
    >Tab 6</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-7"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-75"
    tabindex="0"
    >Tab 7</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-8"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-76"
    tabindex="0"
    >Tab 8</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-9"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-77"
    tabindex="0"
    >Tab 9</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-10"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-78"
    tabindex="0"
    >Tab 10</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-11"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-79"
    tabindex="0"
    >Tab 11</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-12"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-80"
    tabindex="0"
    >Tab 12</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-13"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-81"
    tabindex="0"
    >Tab 13</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-14"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-82"
    tabindex="0"
    >Tab 14</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-15"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-83"
    tabindex="0"
    >Tab 15</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-16"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-84"
    tabindex="0"
    >Tab 16</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-17"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-85"
    tabindex="0"
    >Tab 17</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-18"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-86"
    tabindex="0"
    >Tab 18</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-19"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-87"
    tabindex="0"
    >Tab 19</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-20"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-88"
    tabindex="0"
    >Tab 20</syn-tab
  >

  <!-- Tab Panels -->
  <syn-tab-panel
    name="tab-1"
    active=""
    id="syn-tab-panel-61"
    role="tabpanel"
    aria-hidden="false"
    >Tab panel 1</syn-tab-panel
  ><syn-tab-panel
    name="tab-2"
    id="syn-tab-panel-62"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 2</syn-tab-panel
  ><syn-tab-panel
    name="tab-3"
    id="syn-tab-panel-63"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 3</syn-tab-panel
  ><syn-tab-panel
    name="tab-4"
    id="syn-tab-panel-64"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 4</syn-tab-panel
  ><syn-tab-panel
    name="tab-5"
    id="syn-tab-panel-65"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 5</syn-tab-panel
  ><syn-tab-panel
    name="tab-6"
    id="syn-tab-panel-66"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 6</syn-tab-panel
  ><syn-tab-panel
    name="tab-7"
    id="syn-tab-panel-67"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 7</syn-tab-panel
  ><syn-tab-panel
    name="tab-8"
    id="syn-tab-panel-68"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 8</syn-tab-panel
  ><syn-tab-panel
    name="tab-9"
    id="syn-tab-panel-69"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 9</syn-tab-panel
  ><syn-tab-panel
    name="tab-10"
    id="syn-tab-panel-70"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 10</syn-tab-panel
  ><syn-tab-panel
    name="tab-11"
    id="syn-tab-panel-71"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 11</syn-tab-panel
  ><syn-tab-panel
    name="tab-12"
    id="syn-tab-panel-72"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 12</syn-tab-panel
  ><syn-tab-panel
    name="tab-13"
    id="syn-tab-panel-73"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 13</syn-tab-panel
  ><syn-tab-panel
    name="tab-14"
    id="syn-tab-panel-74"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 14</syn-tab-panel
  ><syn-tab-panel
    name="tab-15"
    id="syn-tab-panel-75"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 15</syn-tab-panel
  ><syn-tab-panel
    name="tab-16"
    id="syn-tab-panel-76"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 16</syn-tab-panel
  ><syn-tab-panel
    name="tab-17"
    id="syn-tab-panel-77"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 17</syn-tab-panel
  ><syn-tab-panel
    name="tab-18"
    id="syn-tab-panel-78"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 18</syn-tab-panel
  ><syn-tab-panel
    name="tab-19"
    id="syn-tab-panel-79"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 19</syn-tab-panel
  ><syn-tab-panel
    name="tab-20"
    id="syn-tab-panel-80"
    role="tabpanel"
    aria-hidden="true"
    >Tab panel 20</syn-tab-panel
  >
</syn-tab-group>

```

---

## Visual Hierarchy

To structure the Page, you can use different tab styles.

```html
<h3 class="body-medium">Default</h3>
<syn-tab-group>
  <syn-tab
    slot="nav"
    panel="tab-1"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-101"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-2"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-102"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-3"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-103"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-4"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-104"
    tabindex="0"
    >Tab item</syn-tab
  >

  <syn-tab-panel
    name="tab-1"
    active=""
    id="syn-tab-panel-93"
    role="tabpanel"
    aria-hidden="false"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-2"
    id="syn-tab-panel-94"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-3"
    id="syn-tab-panel-95"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-4"
    id="syn-tab-panel-96"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Contained</h3>
<syn-tab-group contained="">
  <syn-tab
    slot="nav"
    panel="tab-1"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-105"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-2"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-106"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-3"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-107"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-4"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-108"
    tabindex="0"
    >Tab item</syn-tab
  >

  <syn-tab-panel
    name="tab-1"
    active=""
    id="syn-tab-panel-97"
    role="tabpanel"
    aria-hidden="false"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-2"
    id="syn-tab-panel-98"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-3"
    id="syn-tab-panel-99"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-4"
    id="syn-tab-panel-100"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>
</syn-tab-group>

<h3 class="body-medium">Sharp</h3>
<syn-tab-group contained="" sharp="">
  <syn-tab
    slot="nav"
    panel="tab-1"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-109"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-2"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-110"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-3"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-111"
    tabindex="0"
    >Tab item</syn-tab
  ><syn-tab
    slot="nav"
    panel="tab-4"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-112"
    tabindex="0"
    >Tab item</syn-tab
  >

  <syn-tab-panel
    name="tab-1"
    active=""
    id="syn-tab-panel-101"
    role="tabpanel"
    aria-hidden="false"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-2"
    id="syn-tab-panel-102"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-3"
    id="syn-tab-panel-103"
    role="tabpanel"
    aria-hidden="true"
  >
    <main class="synergy-replace">Replace this slot</main>
  </syn-tab-panel>

  <syn-tab-panel
    name="tab-4"
    id="syn-tab-panel-104"
    role="tabpanel"
    aria-hidden="true"
  >
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
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-117"
    tabindex="0"
    >General</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="custom"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-118"
    tabindex="0"
    >Custom</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="advanced"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-119"
    tabindex="0"
    >Advanced</syn-tab
  >
  <syn-tab
    slot="nav"
    panel="disabled"
    disabled=""
    role="tab"
    aria-disabled="true"
    aria-selected="false"
    id="syn-tab-120"
    tabindex="-1"
    >Disabled</syn-tab
  >
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-109"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="custom"
    id="syn-tab-panel-110"
    role="tabpanel"
    aria-hidden="true"
    >This is the custom tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="advanced"
    id="syn-tab-panel-111"
    role="tabpanel"
    aria-hidden="true"
    >This is the advanced tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="disabled"
    id="syn-tab-panel-112"
    role="tabpanel"
    aria-hidden="true"
    >This is the disabled tab panel.</syn-tab-panel
  >
</syn-tab-group>

```

---

## Icons

It is also possible to a Add icon to the Tabs.

```html
<syn-tab-group>
  <syn-tab
    slot="nav"
    panel="general"
    active=""
    role="tab"
    aria-disabled="false"
    aria-selected="true"
    id="syn-tab-125"
    tabindex="0"
  >
    <syn-icon name="style" aria-hidden="true" library="default"></syn-icon>
    General
  </syn-tab>
  <syn-tab
    slot="nav"
    panel="custom"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-126"
    tabindex="0"
  >
    <syn-icon name="tune" aria-hidden="true" library="default"></syn-icon>
    Custom
  </syn-tab>
  <syn-tab
    slot="nav"
    panel="advanced"
    role="tab"
    aria-disabled="false"
    aria-selected="false"
    id="syn-tab-127"
    tabindex="0"
  >
    <syn-icon
      name="verified_user"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Advanced
  </syn-tab>
  <syn-tab
    slot="nav"
    panel="disabled"
    disabled=""
    role="tab"
    aria-disabled="true"
    aria-selected="false"
    id="syn-tab-128"
    tabindex="-1"
  >
    <syn-icon
      name="update_disabled"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    Disabled
  </syn-tab>
  <syn-tab-panel
    name="general"
    active=""
    id="syn-tab-panel-117"
    role="tabpanel"
    aria-hidden="false"
    >This is the general tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="custom"
    id="syn-tab-panel-118"
    role="tabpanel"
    aria-hidden="true"
    >This is the custom tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="advanced"
    id="syn-tab-panel-119"
    role="tabpanel"
    aria-hidden="true"
    >This is the advanced tab panel.</syn-tab-panel
  >
  <syn-tab-panel
    name="disabled"
    id="syn-tab-panel-120"
    role="tabpanel"
    aria-hidden="true"
    >This is the disabled tab panel.</syn-tab-panel
  >
</syn-tab-group>

```
