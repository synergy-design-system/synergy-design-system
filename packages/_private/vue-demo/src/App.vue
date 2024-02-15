<script setup lang="ts">
import DemoForm from './DemoForm.vue';
import ThemeSwitch from './ThemeSwitch.vue';
</script>

<template>
  <header>
    <h1>@synergy-design-system/vue Form Demo</h1>
    <ThemeSwitch />
  </header>

  <main>
    <DemoForm />
  </main>
</template>

<style scoped>
header {
  align-items: center;
  background: var(--syn-color-neutral-50);
  border-bottom: 1px solid var(--syn-color-neutral-400);
  box-shadow: var(--syn-shadow-large);
  display: flex;
  padding: var(--syn-spacing-medium) var(--syn-spacing-large);
  position: sticky;
  top: 0;
  z-index: 50;
}

header h1 {
  flex: 1;
  font-size: var(--syn-font-size-large);
  margin: 0;
}

main {
  background: var(--syn-color-neutral-0);
  padding: var(--syn-spacing-medium) var(--syn-spacing-large);
}
</style>
