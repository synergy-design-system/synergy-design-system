## Default

Priority navigation is supported as product navigation if required. This navigation layout provides a high level of findability and support so that users know where they are at all times and can ensure that they can easily reach their goals.Note: Please note that the priority navigation does not have a child menu navigation, if you want to have a child navigation, combine the priority navigation and the side navigation

```html
<syn-prio-nav>
  <syn-nav-item current="" horizontal="true">Domains</syn-nav-item>
  <syn-nav-item horizontal="true">Projects</syn-nav-item>
  <syn-nav-item horizontal="true" href="javascript:void(0)"
    >Trainings</syn-nav-item
  >
</syn-prio-nav>
```

---

## Priority Menu

If there is not enough space, elements will move into a dropdown. If there is only space for one item, it will display the priority menu only.

```html
<div
  style="
    display: flex;
    flex-direction: column;
    gap: var(--syn-spacing-2x-large);
  "
>
  <syn-prio-nav style="width: 220px">
    <syn-nav-item current="" horizontal="true">Domains</syn-nav-item>
    <syn-nav-item horizontal="true" href="javascript:void(0)"
      >Projects</syn-nav-item
    >
    <syn-nav-item slot="menu" role="menuitem" tabindex="0"
      >Trainings</syn-nav-item
    >
  </syn-prio-nav>
  <syn-prio-nav style="width: 170px">
    <syn-nav-item current="" slot="menu" role="menuitem" tabindex="0"
      >Domains</syn-nav-item
    >
    <syn-nav-item
      href="javascript:void(0)"
      slot="menu"
      role="menuitem"
      tabindex="-1"
      >Projects</syn-nav-item
    >
    <syn-nav-item slot="menu" role="menuitem" tabindex="-1"
      >Trainings</syn-nav-item
    >
  </syn-prio-nav>
</div>
```
