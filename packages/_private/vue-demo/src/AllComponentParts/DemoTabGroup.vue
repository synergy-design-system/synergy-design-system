<script setup lang="ts">
import { SynVueTabGroup, SynVueTabPanel, SynVueTab } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueTabGroup contained>
    <SynVueTabPanel name="example-general" active>
      This is the general tab panel.
    </SynVueTabPanel>
    <SynVueTabPanel name="example-custom">This is the custom tab panel.</SynVueTabPanel>
    <SynVueTabPanel name="example-advanced">This is the advanced tab panel.</SynVueTabPanel>
    <SynVueTabPanel name="example-disabled">This is the disabled tab panel.</SynVueTabPanel>
    <SynVueTab slot="nav" panel="example-general" active>General</SynVueTab>
    <SynVueTab slot="nav" panel="example-custom">Custom</SynVueTab>
    <SynVueTab slot="nav" panel="example-advanced">Advanced</SynVueTab>
    <SynVueTab slot="nav" panel="example-disabled" disabled>Disabled</SynVueTab>
  </SynVueTabGroup>
</template>
