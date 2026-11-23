## Dropdowns In Button Groups

 Dropdowns can be placed inside button groups as long as the trigger is an <syn-button> element. 

```html
<syn-button-group label="Example Button Group">
  <syn-button>Button</syn-button>
  <syn-button>Button</syn-button>
  <syn-dropdown placement="bottom-end">
    <syn-button slot="trigger" caret="">Dropdown</syn-button>
    <syn-menu>
      <syn-menu-item>Save</syn-menu-item>
      <syn-menu-item>Save as…</syn-menu-item>
      <syn-menu-item>Save all</syn-menu-item>
    </syn-menu>
  </syn-dropdown>
</syn-button-group>
```
