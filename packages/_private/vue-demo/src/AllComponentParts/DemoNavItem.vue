<script setup lang="ts">
import { SynVueNavItem } from '@synergy-design-system/vue';
</script>

<template>
  <nav
    style="display: flex; flex-direction: column; gap: 24px; width: 320px;"
  >
    <SynVueNavItem current>Indentation: none</SynVueNavItem>
    <SynVueNavItem current style="--indentation: 1">
      Indentation: 1
    </SynVueNavItem>
    <SynVueNavItem current style="--indentation: 2">
      Indentation: 2
    </SynVueNavItem>
  </nav>
</template>
