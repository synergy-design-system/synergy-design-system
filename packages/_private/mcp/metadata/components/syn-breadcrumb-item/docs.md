
## Default

Breadcrumb Items are used inside breadcrumbs to represent different links.

```html
<syn-breadcrumb>
  <syn-breadcrumb-item>
    Breadcrumb Item
    <syn-icon
      slot="prefix"
      name="home"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-icon
      slot="suffix"
      name="wallpaper"
      aria-hidden="true"
      library="default"
    ></syn-icon>
    <syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>

  <syn-breadcrumb-item
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
  <syn-breadcrumb-item aria-current="page"
    >Breadcrumb Item<syn-icon
      name="chevron-down"
      library="system"
      class="ltr"
      data-default=""
      slot="separator"
      aria-hidden="true"
    ></syn-icon
  ></syn-breadcrumb-item>
</syn-breadcrumb>

```
