## Default

The navigation item is used to trigger page switches.

```html
<syn-nav-item> Label </syn-nav-item>
```

---

## Labels

Use the label attribute to change the content of a navigation item.

```html
<syn-nav-item>This is a label</syn-nav-item>
```

---

## Current

The current attribute provides the user feedback about which of the navigation elements is currently selected.

```html
<syn-nav-item current="">Current Navigation item</syn-nav-item>
```

---

## Horizontal Navigation

Use the horizontal attribute to indicate that an element is used in a horizontal navigation. (The example shows it in combination with the current attribute, to indicate the difference.)

```html
<div style="display: flex; gap: var(--syn-spacing-large)">
  <syn-nav-item current="" horizontal=""
    >Horizontal navigation item</syn-nav-item
  >
  <syn-nav-item current="" horizontal=""
    >Horizontal navigation item</syn-nav-item
  >
</div>
```

---

## Focus

The focus event gives the user feedback that the Navigation Item has been focused by the keyboard interaction or active click from the user.

```html
<div style="padding: 5px">
  <syn-nav-item>Current navigation item</syn-nav-item>
</div>
```

---

## Prefix And Suffix Slot

Use the prefix and suffix slots to add e. g. icons or tags. If available the prefix slot will be shown in the rail navigation.

```html
<style>
  .doc-number-helper {
    align-items: center;
    border: 1px solid var(--syn-color-neutral-400);
    border-radius: var(--syn-border-radius-circle);
    box-sizing: border-box;
    color: var(--syn-color-neutral-950);
    display: inline-flex;
    font-size: var(--syn-font-size-x-small);
    height: var(--syn-font-size-x-large);
    width: var(--syn-font-size-x-large);
    justify-content: center;
  }
</style>
<syn-nav-item>
  <syn-icon
    name="wallpaper"
    slot="prefix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
  Item with icon slots
  <syn-icon
    name="wallpaper"
    slot="suffix"
    aria-hidden="true"
    library="default"
  ></syn-icon>
</syn-nav-item>
<br />
<syn-nav-item>
  <span class="doc-number-helper" slot="prefix">1</span>
  Step-like item with a number
</syn-nav-item>
```

---

## Children Closed Or Open Vertical Only

Use the \*children attribute to indicate that a chevron should be shown. In development this will be handled automatically as soon as an element has children.Note:Since there should be no double use of functionality, a link cannot be mixed with an accordion behavior. The accordion always has priority, which means that if the href attribute is used at the same time as children, the link functionality is ignored and only the accordion behavior is provided.

```html
<nav style="width: 320px">
  <syn-nav-item>
    Children closed
    <nav slot="children">
      <syn-nav-item style="--indentation: 1">Item 1</syn-nav-item>
      <syn-nav-item style="--indentation: 1">Item 2</syn-nav-item>
    </nav>
  </syn-nav-item>
  <br />
  <syn-nav-item open="">
    Children open
    <nav slot="children">
      <syn-nav-item href="javascript:void(0)" style="--indentation: 1"
        >Item 1</syn-nav-item
      >
      <syn-nav-item style="--indentation: 1">Item 2</syn-nav-item>
    </nav>
  </syn-nav-item>
</nav>
```

---

## Divider

Use the divider attribute to add a border at the top. This should be used for first level elements in vertical navigations.

```html
<nav style="width: 320px">
  <syn-nav-item>Dividing element</syn-nav-item>
  <syn-nav-item divider="">Dividing element</syn-nav-item>
</nav>
```

---

## Indentation

Vertical navigation elements can be indented to indicate deeper navigation levels.

```html
<nav style="width: 320px; gap: 24px; display: flex; flex-direction: column">
  <syn-nav-item current="">Indentation: none</syn-nav-item>
  <syn-nav-item current="" style="--indentation: 1"
    >Indentation: 1</syn-nav-item
  >
  <syn-nav-item current="" style="--indentation: 2"
    >Indentation: 2</syn-nav-item
  >
</nav>
```

---

## Disabled

Use the disabled attribute to disable a navigation-item.

```html
<syn-nav-item disabled="">Parent Element</syn-nav-item>
```
