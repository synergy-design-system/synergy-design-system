# DaVinci to Synergy web-component migration

## Introduction

Your UI uses DaVinci elements, like basic-elements and/or core-elements and you want to know how to migrate to Synergy? Then this is the right place for you!

Synergy uses the same base technology (CustomElements) as DaVinci elements. However, due to Synergies different architecture and methodologies the migration process cannot be automated and needs some manual work.

The table below shows which DaVinci element can be replaced by which Synergy component.

This guide doesn't cover 100% of all use-cases, but should cover most of it. For strongly customized UIs a deeper look into the documentation is still necessary.

## Should I migrate to Synergy?

Absolutely!

Synergy will give you a more modern and brand-conform look, more flexible components, more consistency, better accessibility, better scalability, smaller footprint, better DX, better UX, better API, ...

Synergy is a replacement for DaVinci elements as well as for the [SICK Design System](https://brand.sick.com/hub/14).

## Versions

The migration guide is based on

- basic-elements 7.2.3
- core-elements 5.0.1
- synergy 2.8.1

Newer major versions of synergy (>=3.0.0) might have a modified API. In those cases consult this document: https://synergy-design-system.github.io/?path=/docs/packages-components-breaking-changes--docs

## General changes

Things which apply to all elements.

- All html element tags are prefixed with "syn-" instead of "davinci-"
- Event handling
  - All events are prefixed with `syn-` (e.g. `syn-change`)
  - In general, `CustomEvents` do not provide additional `details`. If you want to obtain the changed data access the desired property of the `event.target` instead. E.g. `document.querySelector('syn-input').addEventListener('syn-change', (e) => e.target.value)`
- All input elements have 3 different sizes
- Composition is favored over attributes
- Icon assets separated from components
- Revised color palette
- Introduced accessibility to fulfill the new requirements of the [European accessibility act](https://ec.europa.eu/social/main.jsp?catId=1202&intPageId=5581&langId=en) which will be mandatory from June 28th, 2025 on
- Introduced [shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts) which allows styling element internals
- Native framework support for Angular, Vue and React
- Form elements
  - Form support out of the box (no such thing as `basic-elements-ng-form` is necessary anymore). Just use the shipped wrapper components (e.g. @synergy-design-system/angular).
  - Added support for all shared html form elements in the html spec. Added attributes `form`, `required`, `value`, `name`.

## Component comparison

All are in alphabetic order.

### davinci-accordion

| davinci-accordion                                       | syn-accordion                                           |
| ------------------------------------------------------- | ------------------------------------------------------- |
| <img src="accordion_davinci.png" style="width: 300px;"> | <img src="accordion_synergy.png" style="width: 300px;"> |

#### Examples

```html
<davinci-accordion multiple>
  <davinci-accordion-item open label="Item 1"
    >Some content</davinci-accordion-item
  >
  <davinci-accordion-item label="Item 2"></davinci-accordion-item>
  <davinci-accordion-item label="Item 3"></davinci-accordion-item>
  <davinci-accordion-item label="Item 4"></davinci-accordion-item>
</davinci-accordion>

<!-- will become -->
<syn-accordion>
  <syn-details summary="Item 1" open>Some content</syn-details>
  <syn-details summary="Item 2"></syn-details>
  <syn-details summary="Item 3"></syn-details>
  <syn-details summary="Item 4"></syn-details>
</syn-accordion>
```

#### Attribute changes

- removed "multiple". Use "close-others" instead
- added size

#### Slot changes

- default: accepts `syn-details` instead of `davinci-accordion-item`

### davinci-accordion-item

| davinci-accordion-item                                       | syn-details                                           |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| <img src="accordion_item_davinci.png" style="width: 100px;"> | <img src="details_synergy.png" style="width: 100px;"> |

#### Examples

```html
<davinci-accordion-item label="Item 1">Some content</davinci-accordion-item>

<!-- will become -->
<syn-details summary="Item 1">Some content</syn-details>
```

#### Attribute changes

- removed "icon" and "iconSrc". Put icons into "summary"-slot instead
- removed "label". Use "summary" instead
- added "summary"

#### Slot changes

- added "summary"
- added "expand-icon" and "collapse-icon"

### davinci-auto-suggest

| davinci-auto-suggest                                        | syn-combobox                                            |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| <img src="auto_suggest_davinci.png" style="width: 150px;"/> | <img src="combobox_synergy.png" style="width: 120px;"/> |

#### Examples

```html
<davinci-auto-suggest label="Colors">
  <davinci-option value="Yellow">Yellow</davinci-option>
  <davinci-option value="Grey">Grey</davinci-option>
  <davinci-option value="Green">Green</davinci-option>
  <davinci-option value="Blue">Blue</davinci-option>
  <davinci-option value="Red">Red</davinci-option>
</davinci-auto-suggest>

<!-- will become -->
<syn-combobox label="Colors">
  <syn-option value="Yellow">Yellow</syn-option>
  <syn-option value="Grey">Grey</syn-option>
  <syn-option value="Green">Green</syn-option>
  <syn-option value="Blue">Blue</syn-option>
  <syn-option value="Red">Red</syn-option>
</syn-combobox>
```

#### Attribute changes

- Renamed "expanded" to "open
- Renamed "contentRenderer" to "getOption"
- Removed "icon" and "iconSrc". Use the prefix/suffix slots instead
- Removed "loading". Use the suffix slot for adding a spinner
- Removed "error" and "warning"
- Removed "wide-list". Could be achieved via changing the css property `width` of the ::part(listbox)
- Removed "data". Use the syn-option in the default slot
- Removed "min-length". Use the "filter" function instead
- Added "clearable"
- Added "required"
- Added "help-text"
- Added "size"
- Added "placeholder"
- Added "filter"

#### Event changes

- added "syn-change", "syn-input", "syn-clear", "syn-hide", ...

### davinci-balloon

| davinci-balloon                                       | syn-tooltip                                           |
| ----------------------------------------------------- | ----------------------------------------------------- |
| <img src="balloon_davinci.png" style="width: 150px;"> | <img src="tooltip_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-button
  id="mybutton"
  onMouseEnter="document.querySelector('#myBalloon').show = true;"
  onClick="document.querySelector('#myBalloon').show = false;"
  >Hover Me</davinci-button
>

<davinci-balloon id="myBalloon" position="right" for="mybutton"
  >This is a balloon</davinci-balloon
>

<!-- will become -->
<syn-tooltip content="This is a tooltip" placement="right">
  <syn-button>Hover me</syn-button>
</syn-tooltip>
```

#### Attribute changes

- removed "position". Use "placement" instead
- removed "alignment"
- removed "for". Use the default slot instead
- removed "type". Use css-part instead.
- removed "headline". Use the default slot instead to insert html
- removed "show". Use the "show" method instead
- removed "modal"
- removed "icon"
- added "position"
- added "content"
- added "distance"
- added "trigger"
- added "hoist"
- added "skidding"

#### Slot changes

- the default slot contains the target element

### davinci-breadcrumb

| davinci-breadcrumb                                       | syn-breadcrumb                                           |
| -------------------------------------------------------- | -------------------------------------------------------- |
| <img src="breadcrumb_davinci.png" style="width: 150px;"> | <img src="breadcrumb_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-breadcrumb>
  <davinci-breadcrumb-item href="/home" label="Home"></davinci-breadcrumb-item>
  <davinci-breadcrumb-item
    href="/search"
    label="Search"
  ></davinci-breadcrumb-item>
</davinci-breadcrumb>

<!-- will become -->
<syn-breadcrumb>
  <syn-breadcrumb-item href="/home">Home</syn-breadcrumb-item>
  <syn-breadcrumb-item href="/search">Search</syn-breadcrumb-item>
</syn-breadcrumb>
```

#### Attribute changes

- added "label" which is used for screen readers

#### Slot changes

- default: accepts `syn-breadcrumb-item` instead of `davinci-breadcrumb-item`
- added "separator" which is used to change the icon used between breadcrumb-items

### davinci-breadcrumb-item

| davinci-breadcrumb-item                                      | syn-breadcrumb-item                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="breadcrumb_item_davinci.png" style="width: 60px;"> | <img src="breadcrumb_item_synergy.png" style="width: 80px;"> |

#### Examples

```html
<davinci-breadcrumb-item href="/home" label="Home"></davinci-breadcrumb-item>

<!-- will become -->
<syn-breadcrumb-item href="/home">
  Home
  <syn-icon slot="prefix" name="home"></syn-icon>
</syn-breadcrumb-item>
```

#### Attribute changes

- removed "label". Use default slot instead
- added "target" and "rel" to specify the click behavior

#### Slot changes

- added "default" for the content
- added "prefix" and "suffix" e.g. for icons
- added "separator" for changing the icon between itemss

### davinci-button

| davinci-button                                       | syn-button                                           |
| ---------------------------------------------------- | ---------------------------------------------------- |
| <img src="button_davinci.png" style="width: 100px;"> | <img src="button_synergy.png" style="width: 110px;"> |

#### Examples

##### Primary

```html
<davinci-button type="primary" onclick="console.log('clicked')"
  >Click me</davinci-button
>

<!-- will become -->
<syn-button variant="filled" onclick="console.log('clicked')"
  >Click me</syn-button
>
```

#### Attribute changes

- "type"
  - has been renamed to "variant"
  - "type" is now used according to the HTML button `type` attribute (e.g. `button`, `submit`).
  - reduced number of possible values due to accessibility reasons. If styles are needed, they can be set via css-part. Keep in mind, that also the `:hover` and `:active` states need to be adapted then
  - if there is a need of using a "variant" which is not available in Synergy please get in touch with us so we can provide alternatives and also collect valid use-cases
- removed "icon" and "iconSrc". Use the prefix/suffix slots instead
- removed "toggle". Use `syn-radio-button` instead as soon as it is available.
- added: "href", "target", "download", etc

##### Icon

```html
<davinci-button icon="action/cached">Reload</davinci-button>

<!-- will become -->
<syn-button variant="filled"
  >Reload<syn-icon slot="suffix" name="refresh"></syn-icon
></syn-button>
```

### davinci-callout

| davinci-callout                                       | syn-alert                                           |
| ----------------------------------------------------- | --------------------------------------------------- |
| <img src="callout_davinci.png" style="width: 130px;"> | <img src="alert_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-callout type="success">
  <em>Whoooohoo!</em> you got it!
</davinci-callout>

<!-- will become -->

<div style="width:350px">
  <syn-alert variant="success" open>
    <syn-icon slot="icon" name="check_circle"></syn-icon>
    <em>Whoooohoo!</em> you got it!
  </syn-alert>
</div>
```

#### Attribute changes

- Removed "type". Use "variant" for the color and the "icon" slot for the icon instead
- Removed "inline"
- Added "variant". Values are slightly different to callout's "type"
- Added "duration"

#### Event changes

- Removed "remove". Use "syn-hide" instead
- Added "syn-show", "syn-hide"

#### Slot changes

- Added "icon"

### davinci-checkbox

| davinci-checkbox                                       | syn-checkbox                                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| <img src="checkbox_davinci.png" style="width: 100px;"> | <img src="checkbox1_synergy.png" style="width: 100px;"><br><img src="checkbox2_synergy.png" style="width: 130px;"> |

#### Examples

```html
<davinci-checkbox checked onchange="(e)=>console.log(e.detail)">Toggle</davinci-checkbox>

<!-- will become -->
<syn-checkbox checked">Toggle</syn-checkbox>
<script>
document.querySelector("syn-checkbox").addEventListener("syn-change", (e)=>console.log(e.target.checked))
</script>
```

#### Attribute changes

- added "indeterminate"
- added "required"

#### Event changes

- added `syn-change`, `syn-input`, ...

### davinci-collapse

| davinci-collapse                                       | syn-details                                           |
| ------------------------------------------------------ | ----------------------------------------------------- |
| <img src="collapse_davinci.png" style="width: 100px;"> | <img src="details_synergy.png" style="width: 100px;"> |

#### Examples

```html
<davinci-collapse open collapsed-title="Show me" expanded-title="Show me">
  some text or html
</davinci-collapse>

<!-- will become -->
<syn-details open summary="Show me"> some text or html </syn-details>
```

#### Attribute changes

- removed "prepend-icon"
- Removed "collapsed-title" and "expanded-title". Use "summary" instead
- added "summary". For html content the "summary"-slot can be used instead
- added "contained" for a different visual experience
- added "size"

#### Event changes

- removed "open-state-change". Use "syn-after-show", "syn-after-hide" instead
- added "syn-show", "syn-hide", "syn-after-show", "syn-after-hide"

### davinci-core-drawer-navigation

| davinci-core-drawer-navigation                                 | syn-side-nav                                          |
| -------------------------------------------------------------- | ----------------------------------------------------- |
| <img src="drawernavigation_davinci.png" style="width: 150px;"> | <img src="sidenav_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-core-drawer-navigation>
  <davinci-core-drawer-navigation-item
    data-icon="action/home"
    label="Home"
    route="/"
  >
  </davinci-core-drawer-navigation-item>
  <davinci-core-drawer-navigation-item
    data-icon="action/search"
    label="Search"
    route="/search"
  >
  </davinci-core-drawer-navigation-item>
  <davinci-core-drawer-navigation-item
    data-icon="social/person"
    label="User"
    route="/user"
    expanded
    active
  >
    <davinci-core-drawer-navigation-item
      data-icon="action/bug_report"
      label="Bugs"
      route="/bugreports"
    >
    </davinci-core-drawer-navigation-item>
    <davinci-core-drawer-navigation-item label="Logout" route="/user/logout">
    </davinci-core-drawer-navigation-item>
  </davinci-core-drawer-navigation-item>
  <davinci-core-drawer-navigation-item
    data-icon="action/bug_report"
    label="Bugs"
    route="/bugreports"
  >
  </davinci-core-drawer-navigation-item>
</davinci-core-drawer-navigation>

<!-- will become -->

<syn-side-nav>
  <syn-nav-item>
    <syn-icon name="home" slot="prefix"></syn-icon>
    Home
  </syn-nav-item>
  <syn-nav-item divider>
    <syn-icon name="search" slot="prefix"></syn-icon>
    Search
  </syn-nav-item>
  <syn-nav-item divider open>
    <syn-icon name="person" slot="prefix"></syn-icon>
    User
    <syn-nav-item slot="children">
      <syn-icon name="bug_report" slot="prefix"></syn-icon>
      Bugs
    </syn-nav-item>
    <syn-nav-item slot="children"> Logout </syn-nav-item>
  </syn-nav-item>
  <syn-nav-item divider>
    <syn-icon name="bug_report" slot="prefix"></syn-icon>
    Bugs
  </syn-nav-item>
</syn-side-nav>
```

#### Attribute changes

- removed "expanded". use "open" instead
- added "open"
- added "rail"
- added "no-focus-trapping"

#### Event changes

- removed "expanded". use "syn-show" and "syn-hide" instead
- added syn-show, syn-hide, syn-after-show, syn-after-hide

#### Slot changes

- default: removed support for "davinci-core-drawer-navigation-item"
- default: added support for "syn-nav-item"
- added "footer": support for "syn-nav-item"

### davinci-core-drawer-navigation-item

| davinci-core-drawer-navigation-item                                | syn-nav-item                                          |
| ------------------------------------------------------------------ | ----------------------------------------------------- |
| <img src="drawernavigationitem_davinci.png" style="width: 150px;"> | <img src="navitem_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-core-drawer-navigation-item
  data-icon="action/home"
  label="Home"
  route="/"
>
  <davinci-core-drawer-navigation-item label="User" route="/user">
  </davinci-core-drawer-navigation-item>
</davinci-core-drawer-navigation-item>

<!-- will become -->

<syn-nav-item divider>
  <syn-icon name="home" slot="prefix"></syn-icon>
  Home
  <syn-nav-item slot="children" href="/user"> User </syn-nav-item>
</syn-nav-item>
```

#### Attribute changes

- removed "label". use default slot instead
- removed "route". use "href" instead
- removed "expanded". use "open" instead
- removed "icon". use "prefix" slot instead
- removed "active". use "current" instead
- added "href"
- added "divider"
- added "current"

#### Event changes

- removed "navigate"
- added syn-show, syn-hide

#### Slot changes

- default: removed support for "davinci-core-drawer-navigation-item"
- default: refers to the item label
- added "prefix", "suffix" for adding icons
- added "children" for nested items (`syn-nav-item`)

### davinci-core-header

| davinci-core-header                                  | syn-header                                           |
| ---------------------------------------------------- | ---------------------------------------------------- |
| <img src="header_davinci.png" style="width: 270px;"> | <img src="header_synergy.png" style="width: 250px;"> |

#### Examples

```html
<davinci-core-header app-name="My App" apps user menu></davinci-core-header>

<!-- will become -->

<syn-header label="App Name">
  <nav slot="meta-navigation">
    <syn-icon-button color="neutral" name="apps" label="Apps"></syn-icon-button>
    <syn-icon-button
      color="neutral"
      name="account_circle"
      label="Account"
    ></syn-icon-button>
    <syn-icon-button
      color="neutral"
      name="more_vert"
      label="More"
    ></syn-icon-button>
  </nav>
</syn-header>
```

#### Attribute changes

- Removed all attributes (use "meta-navigation" slot instead)
- Added "show-burger-menu"

#### Event changes

- removed "pane-toggle"
- removed "button-click"
- added "syn-burger-menu-open"
- added "syn-burger-menu-closed"
- added "syn-burger-menu-hidden"

### davinci-core-header2

| davinci-core-header2                                  | syn-header                                           |
| ----------------------------------------------------- | ---------------------------------------------------- |
| <img src="header2_davinci.png" style="width: 250px;"> | <img src="header_synergy.png" style="width: 250px;"> |

#### Examples

```html
<davinci-core-header2 app-name="My App">
  <davinci-core-header-button
    icon="navigation"
    slot="left"
  ></davinci-core-header-button>
  <davinci-core-header-button icon="apps"></davinci-core-header-button>
  <davinci-core-header-button icon="user"></davinci-core-header-button>
  <davinci-flyout-menu>
    <davinci-flyout-menu-item label="settings"></davinci-flyout-menu-item>
    <davinci-flyout-menu-item label="language"></davinci-flyout-menu-item>
    <davinci-flyout-menu-item label="user"></davinci-flyout-menu-item>
  </davinci-flyout-menu>
</davinci-core-header2>

<!-- will become -->

<syn-header label="My App">
  <nav slot="meta-navigation">
    <syn-icon-button color="neutral" name="apps" label="Apps"></syn-icon-button>
    <syn-icon-button
      color="neutral"
      name="account_circle"
      label="Account"
    ></syn-icon-button>
    <syn-dropdown distance="10">
      <syn-icon-button
        slot="trigger"
        color="neutral"
        name="more_vert"
        label="More"
      ></syn-icon-button>
      <syn-menu>
        <syn-menu-item>setting</syn-menu-item>
        <syn-menu-item>language</syn-menu-item>
        <syn-menu-item>user</syn-menu-item>
      </syn-menu>
    </syn-dropdown>
  </nav>
</syn-header>
```

#### Attribute changes

- Removed all attributes (use "meta-navigation" slot instead)
- Added "show-burger-menu"

#### Event changes

- added "syn-burger-menu-open"
- added "syn-burger-menu-closed"
- added "syn-burger-menu-hidden"

### davinci-core-header-button

Use the `syn-icon-button` instead

### davinci-core-header-popout

| davinci-core-header-popout                                  | syn-dropdown                                           |
| ----------------------------------------------------------- | ------------------------------------------------------ |
| <img src="headerpopdown_davinci.png" style="width: 200px;"> | <img src="dropdown_synergy.png" style="width: 200px;"> |

#### Examples

```html
<button id="ButtonID">open popdown</button>
<davinci-core-header-popdown autoclose target="#ButtonID">
  <h1>My Content</h1>
  <p>Some more text ...</p>
</davinci-core-header-popdown>

<!-- will become -->
<syn-dropdown>
  <button slot="trigger">open dropdown</button>
  <h1>My Content</h1>
  <p>Some more text ...</p>
</syn-dropdown>
```

#### Attribute changes

- removed "target". Use "trigger" slot instead
- added "placement", "distance", ...

#### Slot changes

- added "trigger"

### davinci-core-navigation

| davinci-core-navigation                                  | syn-prio-nav                                          |
| -------------------------------------------------------- | ----------------------------------------------------- |
| <img src="navigation_davinci.png" style="width: 250px;"> | <img src="prionav_synergy.png" style="width: 250px;"> |

#### Examples

```html
<davinci-core-navigation>
  <davinci-core-navigation-item active route="/domains"
    >Domains</davinci-core-navigation-item
  >
  <davinci-core-navigation-item route="/projects"
    >Projects</davinci-core-navigation-item
  >
  <davinci-core-navigation-item route="/trainings"
    >Trainings</davinci-core-navigation-item
  >
</davinci-core-navigation>
<!-- will become -->
<syn-prio-nav>
  <syn-nav-item href="/domains" current horizontal>Domains</syn-nav-item>
  <syn-nav-item href="/projects" horizontal>Projects</syn-nav-item>
  <syn-nav-item href="/trainings" horizontal>Trainings</syn-nav-item>
</syn-prio-nav>
```

#### Attribute changes

- Removed "type"

#### Slot changes

- default: removed support for `davinci-core-navigation-item`
- default: added support for `syn-nav-item`

### davinci-core-navigation-item

| davinci-core-navigation-item                                 | syn-nav-item                                              |
| ------------------------------------------------------------ | --------------------------------------------------------- |
| <img src="navigationitem_davinci.png" style="width: 100px;"> | <img src="navitemhorz_synergy.png" style="width: 100px;"> |

#### Examples

```html
<davinci-core-navigation-item active route="/domains"
  >Domains</davinci-core-navigation-item
>
<!-- will become -->
<syn-nav-item href="/domains" current horizontal>Domains</syn-nav-item>´
```

#### Attribute changes

- Removed "type"
- Removed "active". use "current" instead
- Removed "route". use "href" instead
- Added "href"
- Added "horizontal"
- Added "current"

#### Slot changes

- added "prefix", "suffix"
- added "children"

### davinci-dnd-file-chooser

Availability: milestone "Input 2"

| davinci-dnd-file-chooser                                     | syn-file                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| <img src="dndfilechooser_davinci.png" style="width: 150px;"> | <img src="dndfilechooser_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-dnd-file-chooser accept=".jpg, .png"></davinci-dnd-file-chooser>
<script>
  const fileInput = document.querySelector("davinci-dnd-file-chooser");
  fileInput.addEventListener("change", e => {
    console.log("New files:", e.detail);
  });
</script>

<!-- will become -->
<syn-file multiple accept=".jpg, .png" droparea></syn-file>
<script>
  const fileInput = document.querySelector("syn-file");
  fileInput.addEventListener("syn-change", e => {
    console.log("New files:", e.target.files);
  });
</script>
```

#### Attribute changes

- Removed "label-browse"
- Removed "label-drop"
- Added "label"
- Added "help-text"
- Added "size"
- Added "droparea"
- Added "capture"
- Added "form"
- Added "required"
- Added "hide-value"
- Added "multiple"
- Added "name"
- Added "value"

#### Event changes

- Added "syn-change", "syn-input", "syn-error", "syn-blur", "syn-focus"

### davinci-dropdown

| davinci-dropdown                                       | syn-select                                           |
| ------------------------------------------------------ | ---------------------------------------------------- |
| <img src="dropdown_davinci.png" style="width: 120px;"> | <img src="select_synergy.png" style="width: 120px;"> |

#### Examples

```html
<davinci-drop-down onchange="(e)=>console.log(e.detail)">
  <davinci-option value="1">One</davinci-option>
  <davinci-option value="2">Two</davinci-option>
  <davinci-option value="3">Three</davinci-option>
</davinci-drop-down>

<!-- will become -->
<syn-select>
  <syn-option value="1">One</syn-option>
  <syn-option value="2">Two</syn-option>
  <syn-option value="3">Three</syn-option>
</syn-select>
<script>
  document
    .querySelector("syn-select")
    .addEventListener("syn-change", e => console.log(e.target.value));
</script>
```

#### Attribute changes

- Changed "value": space is not allowed anymore to select a value. A space is used to separate values in case "multiple" is set
- Added "clearable"
- Added "required"
- Added "max-options-visible"
- Added "multiple". If enabled it replaces the `davinci-multi-select`.
- Removed "editable". User cannot type characters anymore.
- Removed "icon" and "iconSrc". Use the prefix/suffix slots instead

#### Event changes

- added "syn-change", "syn-input", "syn-clear", "syn-hide", ...

### davinci-dropdown (editable)

| davinci-dropdown (editable)                            | syn-combobox                                           |
| ------------------------------------------------------ | ------------------------------------------------------ |
| <img src="combobox_davinci.png" style="width: 120px;"> | <img src="combobox_synergy.png" style="width: 120px;"> |

#### Examples

```html
<davinci-drop-down id="colors" label="Colors" editable></davinci-drop-down>

<script>
  const colors = ["Yellow", "Grey", "Green", "Blue", "Red"];
  const dropdown = document.querySelector("#colors");
  dropdown.data = colors;

  dropdown.addEventListener("input", function (event) {
    dropdown.expanded = true;
    dropdown.data = colors.filter(function (value) {
      return value.toLowerCase().indexOf(event.detail.toLowerCase()) >= 0;
    });
  });
</script>

<!-- will become -->
<syn-combobox label="Colors">
  <syn-option value="Yellow">Yellow</syn-option>
  <syn-option value="Grey">Grey</syn-option>
  <syn-option value="Green">Green</syn-option>
  <syn-option value="Blue">Blue</syn-option>
  <syn-option value="Red">Red</syn-option>
</syn-combobox>
```

#### Attribute changes

- Renamed "expanded" to "open
- Renamed "contentRenderer" to "getOption"
- Removed "editable". The user can type in the input on default
- Removed "icon" and "iconSrc". Use the prefix/suffix slots instead
- Removed "loading". Use the suffix slot for adding a spinner
- Removed "error" and "warning"
- Removed "wide-list". Could be achieved via changing the css property `width` of the ::part(listbox)
- Removed "data". Use the syn-option in the default slot
- Added "clearable"
- Added "required"
- Added "help-text"
- Added "size"
- Added "placeholder"
- Added "filter"

#### Event changes

- added "syn-change", "syn-input", "syn-clear", "syn-hide", ...

### davinci-file-chooser

| davinci-file-chooser                                      | syn-file                                                  |
| --------------------------------------------------------- | --------------------------------------------------------- |
| <img src="filechooser_davinci.png" style="width: 100px;"> | <img src="filechooser_synergy.png" style="width: 190px;"> |

#### Examples

```html
<davinci-file-chooser multiple accept=".jpg, .png"
  >Choose files</davinci-file-chooser
>
<script>
  const fileInput = document.querySelector("davinci-file-chooser");
  fileInput.addEventListener("change", e => {
    console.log("New files:", e.detail);
  });
</script>

<!-- will become -->
<syn-file multiple accept=".jpg, .png"></syn-file>
<script>
  const fileInput = document.querySelector("syn-file");
  fileInput.addEventListener("syn-change", e => {
    console.log("New files:", e.target.files);
  });
</script>
```

#### Attribute changes

- Removed "button-type" due to accessibility and ux reasons. If other styles are needed, they can be set via css-part. Keep in mind, that also the `:hover` and `:active` states need to be adapted then. Also the "trigger" slot can be used, to add completely other content.
- Removed "icon" and "iconSrc". The button can not be visually changed and extended with icons
- Added "label"
- Added "help-text"
- Added "size"
- Added "droparea"
- Added "capture"
- Added "form"
- Added "required"
- Added "hide-value"

#### Event changes

- Added "syn-change", "syn-input", "syn-error", "syn-blur", "syn-focus"

### davinci-flexi-slider

| davinci-flexi-slider                                       | syn-range                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="flexi-slider_davinci.png" style="width: 200px;"> | <img src="flexi-slider_synergy.png" style="width: 200px;"> |

#### Examples

```html
<davinci-flexi-slider
  value="3"
  value-set="[0,3,7,15,31,63]"
></davinci-flexi-slider>

<!-- will become -->
<syn-range class="range" value="20" step="20">
  <nav slot="ticks">
    <syn-range-tick>0</syn-range-tick>
    <syn-range-tick>3</syn-range-tick>
    <syn-range-tick>7</syn-range-tick>
    <syn-range-tick>15</syn-range-tick>
    <syn-range-tick>31</syn-range-tick>
    <syn-range-tick>63</syn-range-tick>
  </nav>
</syn-range>
<style>
  .range nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```

#### Attribute changes

- Renamed "ticks" to "step"
- Removed "legend". Use the "syn-range-tick".
- Removed "legend-labels". Use the "syn-range-tick". The label can be customized.
- Removed "unit". Use the "syn-range-tick". The label can be customized with the unit.
- Removed "icon-left", "icon-right", "icon-src-left", "icon-src-right". Use the prefix/suffix slots instead.
- Removed "show-value-field". Use the prefix/suffix slots instead.
- Removed "custom-value-to-label-converter". Use the "tooltipFormatter"
- Removed "value-set". Use the "syn-range-tick".
- Added "label"
- Added "help-text"
- Added "size"
- Added "form"
- Added "name"
- Added "tooltip-placement"

#### Event changes

- Added "syn-change", "syn-input", "syn-blur", "syn-focus", "syn-invalid", "syn-move"

### davinci-flyout-menu

| davinci-flyout-menu                                      | syn-dropdown/syn-menu                                      |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="flyoutmenu_davinci.png" style="width: 150px;"> | <img src="dropdownmenu_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-flyout-menu>
  <davinci-flyout-menu-item
    icon="action/build"
    label="settings"
  ></davinci-flyout-menu-item>
  <davinci-flyout-menu-item
    icon="action/language"
    label="language"
  ></davinci-flyout-menu-item>
  <davinci-flyout-menu-item
    icon="social/person"
    label="user"
  ></davinci-flyout-menu-item>
</davinci-flyout-menu>

<!-- will become -->
<syn-dropdown>
  <syn-icon-button label="trigger" name="more_vert" slot="trigger"
    >Dropdown</syn-icon-button
  >
  <syn-menu>
    <syn-menu-item>
      settings
      <syn-icon name="build" slot="prefix"></syn-icon>
    </syn-menu-item>
    <syn-menu-item>
      language
      <syn-icon name="language" slot="prefix"></syn-icon>
    </syn-menu-item>
    <syn-menu-item>
      user
      <syn-icon name="person" slot="prefix"></syn-icon>
    </syn-menu-item>
  </syn-menu>
</syn-dropdown>
```

#### Attribute changes

- removed "left". use "placement='left' instead"
- removed "icon" and "iconSrc". Use the trigger slot instead along with a syn-icon.
- removed "icon-placeholder", "submenu-placeholder", "icon-placeholder", "external-control"
- added "placement", "stay-open-on-select", "distance", "hoist", "skidding"

#### Event changes

- removed "menu-click"
- added "syn-show", "syn-hide", ...

#### Event changes

- removed "menu-click". instead use "syn-select" on `syn-menu`
- added "syn-show", "syn-hide"

### davinci-flyout-menu-item

| davinci-flyout-menu-item                                  | syn-menu-item                                          |
| --------------------------------------------------------- | ------------------------------------------------------ |
| <img src="flyout_item_davinci.png" style="width: 200px;"> | <img src="menuitem_synergy.png" style="width: 200px;"> |

#### Examples

```html
<davinci-flyout-menu-item label="a menu-item with submenu" icon="social/person">
 <davinci-flyout-menu-item label="settings"></davinci-flyout-menu-item>
 <davinci-flyout-menu-item label="language"></davinci-flyout-menu-item>
 <davinci-flyout-menu-item label="user"></davinci-flyout-menu-item>
</davinci-flyout-menu-item>

<!-- will become -->

<syn-menu-item>
  a menu-item with submenu
  <syn-icon slot="prefix" name="person"></syn-icon>
  <syn-menu slot="submenu">
    <syn-menu-item>settings</syn-menu-item>
    <syn-menu-item>language</syn-menu-item>
    <syn-menu-item>user</syn-menu-item>
    </syn-menu></syn-menu-item>
  </syn-menu>
</syn-menu-item>
```

#### Attribute changes

- removed "icon" and "iconSrc". Use the prefix/suffix slots instead
- removed "left"
- removed "open"
- removed "label". Use default slot instead
- added "type" (e.g. 'checkbox')
- added "checked"
- added "loading"

#### Event changes

- removed "menu-click"

### davinci-icon

| davinci-icon                                     | syn-icon                                          |
| ------------------------------------------------ | ------------------------------------------------- |
| <img src="icon_davinci.png" style="width: 50px"> | <img src="icon_synergy.png" style="width: 50px;"> |

#### Examples

```html
<davinci-icon icon="social/sentiment_very_satisfied"></davinci-icon>

<!-- will become -->
<syn-icon name="sentiment_satisfied_alt"></syn-icon>
```

#### Resource loading

In contrast to DaVinci, the icons are not bundled into Synergy. Instead the developer has to make sure the icon resources are [loaded upfront](https://synergy-design-system.github.io/iframe.html?viewMode=docs&id=components-syn-icon--docs&args=#how-to-use-a-custom-icon-library).

#### Attribute changes

- removed "icon". Use "name" instead
- added "name"

### davinci-icon-ref

| davinci-icon-ref                                    | syn-icon                                             |
| --------------------------------------------------- | ---------------------------------------------------- |
| <img src="iconref_davinci.png" style="width: 50px"> | <img src="iconsrc_synergy.png" style="width: 50px;"> |

#### Examples

```html
<davinci-icon-ref
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z'/%3E%3C/svg%3E"
></davinci-icon-ref>

<!-- will become -->
<syn-icon
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z'/%3E%3C/svg%3E"
  style="font-size: 1.7rem;"
></syn-icon>
```

### davinci-link

| davinci-link                                      | syn-button                                               |
| ------------------------------------------------- | -------------------------------------------------------- |
| <img src="link_davinci.png" style="width: 100px"> | <img src="buttontext_synergy.png" style="width: 110px;"> |

#### Examples

```html
<davinci-link icon="action/favorite" href="#">Favorite!</davinci-link>

<!-- will become -->

<syn-button variant="text" href="#"
  ><syn-icon slot="prefix" name="favorite"></syn-icon>Favorite!</syn-button
>
```

#### Attributes

- Removed: "icon" and "iconSrc". Use prefix slot instead
- Removed: "inverted"
- Removed: "inside-text"

#### Slots

- Added "prefix" and "suffix"

### davinci-multi-select

| davinci-multi-select                                     | syn-select                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| <img src="multiselect_davinci.png" style="width: 100px"> | <img src="selectmultiple_synergy.png" style="width: 120px;"> |

#### Examples

```html
<davinci-multi-select onchange="(e)=>console.log(e.detail)">
  <davinci-option value="1">One</davinci-option>
  <davinci-option value="2">Two</davinci-option>
  <davinci-option value="3">Three</davinci-option>
</davinci-multi-select>

<!-- will become -->
<syn-select multiple>
  <syn-option value="1">One</syn-option>
  <syn-option value="2">Two</syn-option>
  <syn-option value="3">Three</syn-option>
</syn-select>
<script>
  document
    .querySelector("syn-select")
    .addEventListener("syn-change", e => console.log(e.target.value));
</script>
```

#### Attribute changes

- removed "editable"
- removed "error" and "warning". use part selector for styling instead or the "required" attribute in forms
- removed "data"
- removed "expanded". Use "open" instead
- Added "multiple"
- added "open"
- Added "required"
- Added "max-options-visible"

#### Event changes

- added "syn-change", "syn-input", "syn-clear", "syn-hide", ...
- removed "input"
- removed "change"
- removed "contentRenderer"

### davinci-number-input / davinci-numeric-field

| davinci-number-input                                     | syn-input                                                 |
| -------------------------------------------------------- | --------------------------------------------------------- |
| <img src="numberinput_davinci.png" style="width: 100px"> | <img src="inputnumber_synergy.png" style="width: 130px;"> |

#### Examples

##### Suffix

```html
<davinci-number-input
  label="Number input"
  value="0"
  unit-suffix="mm"
></davinci-number-input>

<!-- will become -->
<syn-input type="number" label="Number input" value="0"
  ><span slot="suffix" style="color: var(--syn-color-neutral-700)"
    >mm</span
  ></syn-input
>
```

##### Bare

```html
<davinci-number-input
  label="Number input"
  value="0"
  bare
></davinci-number-input>

<!-- will become -->
<syn-input
  class="bare"
  type="number"
  label="Number input"
  value="0"
  no-spin-buttons
  ><span slot="suffix" style="color: var(--syn-color-neutral-700)"
    >mm</span
  ></syn-input
>
```

##### Customized digits

```html
<davinci-number-input
  label="Number input"
  value="0"
  max-fraction-digits="2"
></davinci-number-input>

<!-- will become -->
<syn-input
  class="two_digits_max"
  type="number"
  label="Number input"
  value="0"
></syn-input>
<script>
  document
    .querySelector(".two_digits_max")
    .addEventListener("syn-blur", function () {
      this.value = parseFloat(this.value).toFixed(2);
    });
</script>
```

#### Attribute changes

- changed type of "value" from number to string. Use "valueAsNumber" property instead
- removed "bare". use "no-spin-buttons" instead
- removed "converter". string to number conversion has to be implemented outside of the element
- removed "error" and "warn". use part selector for styling instead or the "required" attribute in forms
- removed "unit-prefix" and "unit-suffix". use slots "prefix" and "suffix" instead
- removed "no-step-align". alignment is done the same way it is done with the default `input`element (depends on the start-value)
- removed "touch". the provided stepper buttons are already touch ready
- removed "min-fraction-digits" and "max-fraction-digits". Has to be implemented outside of the element
- added "clearable"
- added "required"
- added "no-spin-buttons"
- added "help-text"

#### Slot changes

- added "prefix" and "suffix"
- added "clear-icon"
- added "increment-number-stepper" and "decrement-number-stepper"

### davinci-popup-list

| davinci-popup-list                                     | syn-menu                                          |
| ------------------------------------------------------ | ------------------------------------------------- |
| <img src="popuplist_davinci.png" style="width: 100px"> | <img src="menu_synergy.png" style="width: 80px;"> |

```html
<davinci-popup-list></davinci-popup-list>
<script>
  let elem = document.querySelector("davinci-popup-list");
  elem.addItem("One", "1");
  elem.addItem("Two", "2");
  elem.addItem("Three", "3");
  elem.addEventListener("itemclick", event => {
    console.log(elem.getSelectedItem());
  });
</script>
<!-- will become -->
<syn-menu>
  <syn-menu-item value="1">one</syn-menu-item>
  <syn-menu-item value="2">two</syn-menu-item>
  <syn-menu-item value="3">three</syn-menu-item>
</syn-menu>

<script>
  let elem = document.querySelector("syn-menu");
  elem.addEventListener("syn-select", event => {
    console.log(event.item);
  });
</script>
```

#### Attribute changes

- removed "index". use "syn-select" event instead
- removed "show". use css "display" attribute instead
- removed "opentop". this is handled by the parent element

#### Event changes

- removed "itemclick"
- added "syn-select"

### davinci-progress-line

| davinci-progress-line                                     | syn-progress-bar                                         |
| --------------------------------------------------------- | -------------------------------------------------------- |
| <img src="progressline_davinci.png" style="width: 100px"> | <img src="progressbar_synergy.png" style="width: 100px"> |

#### Examples

```html
<davinci-progress-line percentage="33"></davinci-progress-line>

<!-- will become -->

<syn-progress-bar value="33">33%</syn-progress-bar>
```

#### Attribute changes

- changed the meaning of "label". Not used as a caption anymore but as an accessibility feature. Use a separate element instead (e.g. `<h2>`)
- removed "message". Use a separate element instead (e.g. `<p>`)
- removed "percentage". Use "value" in combination with the default slot instead
- added "value"
- added "indeterminate"

#### Slot changes

- the default slot is displayed inside the bar. Use it e.g. for displaying the percentage value

### davinci-radio-button

| davinci-radio-button                                     | syn-radio                                           |
| -------------------------------------------------------- | --------------------------------------------------- |
| <img src="radiobutton_davinci.png" style="width: 100px"> | <img src="radio_synergy.png" style="width: 110px;"> |

```html
<p><strong>This is a label</strong></p>
<davinci-toggle-group value="value1">
  <davinci-radio-button value="value1">value 1</davinci-radio-button>
  <davinci-radio-button value="value2">value 2</davinci-radio-button>
  <davinci-radio-button value="value3">value 3</davinci-radio-button>
</davinci-toggle-group>

<!-- will become -->
<syn-radio-group value="1" label="This is a label">
  <syn-radio value="1">Option</syn-radio>
  <syn-radio value="2">Option</syn-radio>
  <syn-radio value="3">Option</syn-radio>
</syn-radio-group>
```

### davinci-range-slider

| davinci-range-slider                                       | syn-range                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| <img src="range-slider_davinci.png" style="width: 200px;"> | <img src="range-slider_synergy.png" style="width: 200px;"> |

#### Examples

```html
<davinci-range-slider value="[30, 70]"></davinci-range-slider>

<!-- will become -->
<syn-range class="range" value="30 70"></syn-range>
<script type="module">
  const range = document.querySelector(".range");
  range.addEventListener("syn-move", e => {
    const { detail, target } = e;
    const values = target.valueAsArray;
    const { element, value } = detail;

    const [firstThumb, lastThumb] = target.thumbs;
    const [firstValue, lastValue] = values;

    if (element === firstThumb && value > lastValue) {
      e.preventDefault();
      target.valueAsArray = [lastValue, lastValue];
    }

    if (element === lastThumb && value < firstValue) {
      e.preventDefault();
      target.valueAsArray = [firstValue, firstValue];
    }
  });
</script>
```

#### Attribute changes

- Renamed "ticks" to "step"
- Removed "legend". Use the "syn-range-tick".
- Removed "legend-labels". Use the "syn-range-tick". The label can be customized.
- Removed "unit". Use the "syn-range-tick". The label can be customized with the unit.
- Removed "icon-left", "icon-right", "icon-src-left", "icon-src-right". Use the prefix/suffix slots instead.
- Removed "show-value-field". Use the prefix/suffix slots instead.
- Removed "custom-value-to-label-converter". Use the "tooltipFormatter"
- Removed "value-set". Use the "syn-range-tick".
- Added "label"
- Added "help-text"
- Added "size"
- Added "form"
- Added "name"
- Added "tooltip-placement"

#### Event changes

- Added "syn-change", "syn-input", "syn-blur", "syn-focus", "syn-invalid", "syn-move"

### davinci-search-field

| davinci-search-field                                        | syn-combobox                                                |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| <img src="search_field_davinci.png" style="width: 150px;"/> | <img src="search-field_synergy.png" style="width: 120px;"/> |

#### Examples

```html
<davinci-search-field id="searchfield" label="Colors"> </davinci-search-field>
<script>
  const colors = ["Yellow", "Grey", "Green", "Blue", "Red"];
  const searchField = document.getElementById("searchfield");
  searchField.addEventListener("input", function (event) {
    searchField.expanded = true;
    searchField.data = colors.filter(function (value) {
      return value.toLowerCase().indexOf(event.detail.toLowerCase()) >= 0;
    });
  });
</script>

<!-- will become -->
<syn-combobox label="Colors" clearable>
  <syn-icon name="search" slot="prefix"></syn-icon>
  <syn-option value="Yellow">Yellow</syn-option>
  <syn-option value="Grey">Grey</syn-option>
  <syn-option value="Green">Green</syn-option>
  <syn-option value="Blue">Blue</syn-option>
  <syn-option value="Red">Red</syn-option>
</syn-combobox>
```

#### Attribute changes

- Renamed "expanded" to "open
- Renamed "contentRenderer" to "getOption"
- Removed "icon" and "iconSrc". Use the prefix/suffix slots instead
- Removed "loading". Use the suffix slot for adding a spinner
- Removed "error" and "warning"
- Removed "wide-list". Could be achieved via changing the css property `width` of the ::part(listbox)
- Removed "data". Use the syn-option in the default slot
- Added "clearable"
- Added "required"
- Added "help-text"
- Added "size"
- Added "placeholder"
- Added "filter"

#### Event changes

- added "syn-change", "syn-input", "syn-clear", "syn-hide", ...

### davinci-slider

| davinci-slider                                       | syn-range                                            |
| ---------------------------------------------------- | ---------------------------------------------------- |
| <img src="slider_davinci.png" style="width: 200px;"> | <img src="slider_synergy.png" style="width: 200px;"> |

#### Examples

```html
<davinci-slider
  legend
  icon-left="av/volume_mute"
  value="50"
  icon-right="av/volume_up"
></davinci-slider>

<!-- will become -->
<syn-range class="range" max="100" min="0" value="50">
  <syn-icon name="volume_off" slot="prefix"></syn-icon>
  <syn-icon name="volume_up" slot="suffix"></syn-icon>
  <nav slot="ticks">
    <syn-range-tick>0</syn-range-tick>
    <syn-range-tick>50</syn-range-tick>
    <syn-range-tick>100</syn-range-tick>
  </nav>
</syn-range>
<style>
  .range nav {
    justify-content: space-between;
    flex-direction: row;
    display: flex;
  }
</style>
```

#### Attribute changes

- Renamed "ticks" to "step"
- Removed "legend". Use the "syn-range-tick".
- Removed "legend-labels". Use the "syn-range-tick". The label can be customized.
- Removed "unit". Use the "syn-range-tick". The label can be customized with the unit.
- Removed "icon-left", "icon-right", "icon-src-left", "icon-src-right". Use the prefix/suffix slots instead.
- Removed "show-value-field". Use the prefix/suffix slots instead.
- Removed "custom-value-to-label-converter". Use the "tooltipFormatter"
- Removed "value-set". Use the "syn-range-tick".
- Added "label"
- Added "help-text"
- Added "size"
- Added "form"
- Added "name"
- Added "tooltip-placement"

#### Event changes

- Added "syn-change", "syn-input", "syn-blur", "syn-focus", "syn-invalid", "syn-move"

### davinci-spinner

| davinci-spinner                                     | syn-spinner                                         |
| --------------------------------------------------- | --------------------------------------------------- |
| <img src="spinner_davinci.png" style="width: 50px"> | <img src="spinner_synergy.png" style="width: 50px"> |

#### Attribute changes

- Removed "label"
- Removed "below"

### davinci-tab

| davinci-tab                                      | syn-tab                                           |
| ------------------------------------------------ | ------------------------------------------------- |
| <img src="tab_davinci.png" style="width: 100px"> | <img src="tab_synergy.png" style="width: 130px;"> |

#### Examples

```html
<davinci-tab label="Tab1">any content</davinci-tab>

<!-- will become -->
<syn-tab slot="nav" panel="p1">Tab item</syn-tab>
<syn-tab-panel name="p1">any content</syn-tab-panel>
```

#### Attribute changes

- removed "icon" and "icon-src". use the default slot instead to add an icon
- removed "selected". use "active" instead
- removed "label". use the default slot instead
- added "panel". The name of the tab panel this tab is associated with. A `syn-tab-panel` is an additional element which is used instead of the default slot
- added "active"
- added "closable". Used instead of the parents davinci-tabs "closeable"

#### Event changes

- added "syn-close" which is emitted if the close button is triggered. The application is responsible of removing the current tab

#### Slot changes

- The default slot is used as label. The content is now added via `syn-tab-panel`

### davinci-tabs

| davinci-tabs                                      | syn-tab-group                                          |
| ------------------------------------------------- | ------------------------------------------------------ |
| <img src="tabs_davinci.png" style="width: 150px"> | <img src="tabgroup_synergy.png" style="width: 150px;"> |

#### Examples

##### Simple

```html
<davinci-tabs>
  <davinci-tab label="Tab1">any content</davinci-tab>
  <davinci-tab selected label="Tab2">any other</davinci-tab>
</davinci-tabs>

<!-- will become -->
<syn-tab-group>
  <syn-tab-panel name="t1">any content</syn-tab-panel>
  <syn-tab-panel name="t2" active>any other</syn-tab-panel>
  <syn-tab slot="nav" panel="t1">Tab1</syn-tab>
  <syn-tab slot="nav" panel="t2" active>Tab2</syn-tab>
</syn-tab-group>
```

##### Closable

```html
<davinci-tabs closeable>
  <davinci-tab label="Tab1">any content</davinci-tab>
  <davinci-tab selected label="Tab2">any other</davinci-tab>
</davinci-tabs>

<!-- will become -->
<syn-tab-group id="tabs-closable">
  <syn-tab-panel name="t1">any content</syn-tab-panel>
  <syn-tab-panel name="t2" active>any other</syn-tab-panel>
  <syn-tab closable slot="nav" panel="t1">Tab1</syn-tab>
  <syn-tab closable slot="nav" panel="t2" active>Tab2</syn-tab>
</syn-tab-group>

<script type="module">
  const tabGroup = document.querySelector("#tabs-closable");
  tabGroup.addEventListener("syn-close", async event => {
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

#### Attribute changes

- removed "type". Use "contained" and "sharp" to change styles
- removed "closeable". Use "closable" on a `syn-tab` instead
- removed "select-index". Use "active" on a `syn-tab` instead
- added "placement" for placing the tabs on different positions
- added "no-scroll-controls"
- added "contained"
- added "sharp"

#### Event changes

- removed "tab-change ". Use "syn-tab-show" and/or "syn-tab-hide" instead
- removed "close-tab". Use "syn-close" of `syn-tab` instead. Removing the tab is the responsibility of the application
- added "syn-tab-show"
- added "syn-tab-hide"

#### Slot changes

- default slot: expects a `syn-tab-panel` which represents the content of a tab
- added nav slot. Must be a `syn-tab`

### davinci-tag

| davinci-tag                                     | syn-tag                                          |
| ----------------------------------------------- | ------------------------------------------------ |
| <img src="tag_davinci.png" style="width: 80px"> | <img src="tag_synergy.png" style="width: 80px;"> |

#### Examples

```html
<davinci-tag type="filter">myTag</davinci-tag>

<!-- will become -->
<syn-tag removable>myTag</syn-tag>
```

#### Attribute changes

- removed "icon-src"
- removed "type". use "removable" instead
- added "removable"

#### Event changes

- removed "remove". use "syn-remove" instead
- added "syn-remove"

### davinci-tag-module

| davinci-tag-module                                     | syn-tag, div                                       |
| ------------------------------------------------------ | -------------------------------------------------- |
| <img src="tagmodule_davinci.png" style="width: 180px"> | <img src="tags_synergy.png" style="width: 180px;"> |

#### Examples

```html
<davinci-tag-module label-clear="clear all">
  <davinci-tag type="filter">tag1</davinci-tag>
  <davinci-tag type="filter">tag2</davinci-tag>
  <davinci-tag>tag3</davinci-tag>
</davinci-tag-module>

<!-- will become -->
<div
  id="tags"
  style="border: solid grey; padding:10px; display: flex; gap: var(--syn-spacing-medium); align-items:center"
>
  <syn-tag removable> tag1 </syn-tag>
  <syn-tag removable> tag2 </syn-tag>
  <syn-tag> tag3 </syn-tag>
  <a
    href="javascript:Array.from(window.tags.children).filter(e=>e.localName==='syn-tag').forEach(e=>e.remove())
"
    >clear all</a
  >
</div>
<script>
  window.tags.addEventListener("syn-remove", e => e.target.remove());
</script>
```

### davinci-text-area

| davinci-text-area                                     | syn-textarea                                           |
| ----------------------------------------------------- | ------------------------------------------------------ |
| <img src="textarea_davinci.png" style="width: 150px"> | <img src="textarea_synergy.png" style="width: 150px;"> |

#### Examples

```html
<davinci-text-area
  multiline
  label="Label"
  value="Input text"
></davinci-text-area>

<!-- will become -->
<syn-textarea value="Input text" label="Label"></syn-textarea>
```

#### Attribute changes

- removed "multiline". Use "rows" and "resize" instead
- removed "error" and "warning". use part selector for styling instead or the "required" attribute in forms
- added "help-text"
- added "rows"
- added "resize"
- added "minlength", "maxlength"
- added "autocapitalize", "autocorrect", "autocomplete", "autofocus", ...

#### Event changes

- removed "change"
- removed "input"
- added "syn-change"
- added "syn-input"

### davinci-text-field

| davinci-text-field                                     | syn-input                                           |
| ------------------------------------------------------ | --------------------------------------------------- |
| <img src="textfield_davinci.png" style="width: 120px"> | <img src="input_synergy.png" style="width: 120px;"> |

#### Examples

```html
<davinci-text-field
  label="Email"
  placeholder="enter a valid email"
  pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)"
>
</davinci-text-field>

<!-- will become -->
<syn-input label="Email" type="email" placeholder="enter a valid email">
</syn-input>
```

#### Attribute changes

- removed "error" and "warning"
- added "clearable"
- added "password-toggle" and "password-visible"
- added "minlength" and "maxlength"
- added "inputmode"
- added "help-text"

#### Slot changes

- added "prefix" and "suffix"
- added "clear-icon"

### davinci-toggle-switch

| davinci-toggle-switch                                    | syn-switch                                          |
| -------------------------------------------------------- | --------------------------------------------------- |
| <img src="toggleswitch_davinci.png" style="width: 50px"> | <img src="switch_synergy.png" style="width: 50px;"> |

#### Examples

```html
<davinci-toggle-switch checked></davinci-toggle-switch>
<!-- will become -->
<syn-switch checked>Option</syn-switch>
```

#### Attribute changes

- removed "icon-on", "icon-off", "icon-on-src", "icon-off-src"
- added "help-text"

### davinci-value-display

Availability: not planned
