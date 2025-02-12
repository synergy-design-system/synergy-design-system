<script setup lang="ts">
import { SynVuePrioNav, SynVueNavItem } from '@synergy-design-system/vue';
</script>
<template>
  <div
    style="display: flex; flex-direction: column; gap: var(--syn-spacing-2x-large);"
  >
    <SynVuePrioNav style="width: 220px;">
      <SynVueNavItem current horizontal>Domains</SynVueNavItem>
      <SynVueNavItem horizontal>Projects</SynVueNavItem>
      <SynVueNavItem horizontal href="javascript:void(0)">Trainings</SynVueNavItem>
    </SynVuePrioNav>
  </div>
</template>
