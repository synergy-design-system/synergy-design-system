<script setup lang="ts">
import { SynVueInput, SynVueMenu, SynVueMenuItem, SynVueDivider } from '@synergy-design-system/vue';
</script>
<template>
  <div style="width: 200px">
    <SynVueMenu>
      <SynVueMenuItem value="undo">Undo</SynVueMenuItem>
      <SynVueMenuItem value="redo">Redo</SynVueMenuItem>
      <SynVueDivider />
      <SynVueMenuItem value="cut">Cut</SynVueMenuItem>
      <SynVueMenuItem value="copy">Copy</SynVueMenuItem>
      <SynVueMenuItem value="paste">Paste</SynVueMenuItem>
      <SynVueMenuItem value="delete">Delete</SynVueMenuItem>
    </SynVueMenu>
  </div>

  <SynVueDivider />

  <div
    data-testid="menu-1295-steals-focus"
    style="
      display: flex;
      flex-direction: column;
      gap: var(--syn-spacing-small);
      margin: var(--syn-spacing-large) 0;   
    "
  >
    <SynVueInput
      name="search"
      label="#1295: Focus should not be lost when hovering over the menu"
      type="text"
    />
    <SynVueMenu>
      <SynVueMenuItem value="undo">Undo</SynVueMenuItem>
      <SynVueMenuItem value="redo">Redo</SynVueMenuItem>
      <SynVueDivider />
      <SynVueMenuItem value="cut">Cut</SynVueMenuItem>
      <SynVueMenuItem value="copy">Copy</SynVueMenuItem>
    </SynVueMenu>
  </div>
</template>
