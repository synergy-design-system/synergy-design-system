<script setup lang="ts">
import DemoForm from './DemoForm.vue';
import ThemeSwitch from './ThemeSwitch.vue';
import { SynVueHeader } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueHeader>
    @synergy-design-system/vue Form Demo
    <ThemeSwitch slot="option-menu" />
  </SynVueHeader>

  <main>
    <DemoForm />
  </main>
</template>

<style scoped>
syn-header {
  position: sticky;
  top: 0;
  z-index: 50;
}

main {
  background: var(--syn-color-neutral-0);
  padding: var(--syn-spacing-medium) var(--syn-spacing-large);
}
</style>
