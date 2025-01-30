<script setup lang="ts">
import { SynVueDropdown, SynVueButton, SynVueMenu, SynVueMenuItem, SynVueDivider, SynVueIcon } from '@synergy-design-system/vue';
</script>
<template>
  <div style="position: relative">
    <SynVueDropdown>
      <SynVueButton slot="trigger" caret>Dropdown</SynVueButton>
      <SynVueMenu style="min-width: 240px;">
        <SynVueMenuItem>Dropdown Item 1</SynVueMenuItem>
        <SynVueMenuItem>Dropdown Item 2</SynVueMenuItem>
        <SynVueMenuItem>Dropdown Item 3</SynVueMenuItem>
        <SynVueDivider />
        <SynVueMenuItem type="checkbox" checked>Checkbox</SynVueMenuItem>
        <SynVueMenuItem disabled>Disabled</SynVueMenuItem>
        <SynVueDivider />
        <SynVueMenuItem>
          Prefix
          <SynVueIcon slot="prefix" name="wallpaper" />
        </SynVueMenuItem>
        <SynVueMenuItem>
          Suffix Icon
          <SynVueIcon slot="suffix" name="wallpaper" />
        </SynVueMenuItem>
      </SynVueMenu>
    </SynVueDropdown>
  </div>
</template>
