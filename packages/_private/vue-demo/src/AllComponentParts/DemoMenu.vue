<script setup lang="ts">
import { SynVueMenu, SynVueMenuItem, SynVueDivider } from '@synergy-design-system/vue';
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
</template>
