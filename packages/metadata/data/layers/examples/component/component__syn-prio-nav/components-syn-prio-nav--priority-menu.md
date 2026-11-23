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
    <syn-nav-item current="" horizontal="">Domains</syn-nav-item>
    <syn-nav-item horizontal="" href="javascript:void(0)"
      >Projects</syn-nav-item
    >
    <syn-nav-item horizontal="">Trainings</syn-nav-item>
  </syn-prio-nav>
  <syn-prio-nav style="width: 170px">
    <syn-nav-item current="" horizontal="">Domains</syn-nav-item>
    <syn-nav-item horizontal="" href="javascript:void(0)"
      >Projects</syn-nav-item
    >
    <syn-nav-item horizontal="">Trainings</syn-nav-item>
  </syn-prio-nav>
</div>
```
