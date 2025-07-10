
## Default

Side navigation lets the user navigate through the entire content of a product. It supports single or nested navigation levels.

```html
<syn-header label="Side Navigation" burger-menu="open"></syn-header>
<main
  style="
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  "
  class="side-nav-default story-loaded-1"
>
  <syn-side-nav open="" variant="default">
    <syn-nav-item current="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
  </syn-side-nav>
</main>

```

---

## Rail

Set the variant attribute to rail to only show a small navigation stripe at the left side using only the prefix-icons of the navigation items. This will open on hover on the rail navigation, therefore the header doesn't have an burger-menu-icon.On touch devices the navigation opens on click and shows an overlay to be closable.Note: The Rail is only an option if all Navigation Items on the first level have an Icon. If this is not the case you should use a burger navigation.

```html
<syn-header
  class="header-rail"
  label="Side Navigation"
  burger-menu="hidden"
></syn-header>
<main class="main-rail">
  <syn-side-nav class="side-nav-rail" variant="rail">
    <syn-nav-item current="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
  </syn-side-nav>
  <div class="content-rail">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</main>

<style>
  .main-rail {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .content-rail {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>

```

---

## Sticky

Use the sticky variant when you need a persistent, toggleable side navigation that alternates between a compact “rail” (icon‐only) state and a full‐width state. Note: This pattern is only possible for flat navigation structures (no nesting) where every first‐level item has an icon.

```html
<syn-header
  class="header-sticky"
  label="Side Navigation"
  burger-menu="hidden"
></syn-header>
<main class="main-sticky">
  <syn-side-nav class="side-nav-sticky" variant="sticky">
    <syn-nav-item current="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
  </syn-side-nav>
  <div class="content-sticky">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</main>

<style>
  .main-sticky {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .content-sticky {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>

```

---

## Footer

The Side navigation can have an optional bottom navigation "slot" to split up the navigation entries.Please avoid having to many navigation entries (at the bottom) as it can massively influence the user experience.

```html
<syn-header
  class="header-footer"
  label="Side Navigation"
  burger-menu="open"
></syn-header>
<main class="main-footer">
  <syn-side-nav class="side-nav-footer" open="" variant="default">
    <syn-nav-item current="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>

    <syn-nav-item slot="footer">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Footer Item
    </syn-nav-item>
    <syn-nav-item divider="" slot="footer">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Footer Item
    </syn-nav-item>
  </syn-side-nav>
</main>

<style>
  .main-footer {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }
</style>

```

---

## Fixed

Per default, the side navigation shows an overlay. This should always be the case, if the content of the app is not shrinking. This makes especially sense for applications, where you navigate to a place and stay there for a longer time.

```html
<div class="container-fixed">
  <syn-header
    class="header-fixed"
    label="Side Navigation"
    burger-menu="open"
  ></syn-header>
  <main class="main-fixed">
    <syn-side-nav class="side-nav-fixed" open="" variant="default">
      <syn-nav-item current="">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
      </syn-nav-item>
      <syn-nav-item divider="">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
      </syn-nav-item>
    </syn-side-nav>
    <div class="content-fixed">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </div>
  </main>
</div>

<style>
  .container-fixed {
    display: flex;
    flex-direction: column;
  }

  .main-fixed {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }

  .content-fixed {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
  }
</style>

```

---

## Shrink

For specific cases it might make sense to have the navigation open while still being able to interact with the app. This especially makes sense for cases where you switch a lot between areas to interact with an app.You can decide yourself depending on your app and screen size, when it makes sense to omit the overlay and shrink the content.This should never be used in combination with a Rail navigation, as this would lead to too much friction on hover.

```html
<syn-header
  class="header-shrink"
  label="Side Navigation"
  burger-menu="open"
></syn-header>
<main class="main-shrink">
  <syn-side-nav
    open=""
    class="side-nav-shrink"
    no-focus-trapping=""
    variant="default"
  >
    <syn-nav-item current="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
  </syn-side-nav>
  <div class="content-shrink">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
    voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
    clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
    amet.
  </div>
</main>

<style>
  .main-shrink {
    position: relative;
    height: 500px;
    display: flex;
    overflow: hidden;
    background-color: var(--syn-color-neutral-200);
  }

  .side-nav-shrink::part(overlay) {
    display: none;
  }

  .content-shrink {
    padding: var(--syn-spacing-large);
    margin: var(--syn-spacing-large);
    border-radius: var(--syn-border-radius-medium);
    background-color: var(--syn-color-neutral-0);
    overflow-y: auto;
  }
</style>

```

---

## Indentation

The different levels of navigation can be organized using the indention. The current status of a page shows the user directly which page they are browsing.

```html
<syn-header
  class="header-indentation"
  label="Side Navigation"
  burger-menu="open"
></syn-header>
<main class="main-indentation">
  <syn-side-nav class="side-nav-indentation" open="" variant="default">
    <syn-nav-item open="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
      <!-- second-level -->
      <syn-nav-item slot="children" open="" style="--indentation: 1">
        <syn-icon
          name="wallpaper"
          slot="prefix"
          aria-hidden="true"
          library="default"
        ></syn-icon>
        Navigation Item
        <!-- third-level -->
        <syn-nav-item slot="children" current="" style="--indentation: 2">
          <syn-icon
            name="wallpaper"
            slot="prefix"
            aria-hidden="true"
            library="default"
          ></syn-icon>
          Navigation Item
        </syn-nav-item>
        <!-- /third-level -->
      </syn-nav-item>
      <!-- /second-level -->
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
    <syn-nav-item divider="">
      <syn-icon
        name="wallpaper"
        slot="prefix"
        aria-hidden="true"
        library="default"
      ></syn-icon>
      Navigation Item
    </syn-nav-item>
  </syn-side-nav>
</main>

<style>
  .main-indentation {
    position: relative;
    height: 500px;
    background-color: var(--syn-color-neutral-200);
  }
</style>

```
