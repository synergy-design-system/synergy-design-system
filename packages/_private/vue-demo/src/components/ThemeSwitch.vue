<script setup lang="ts">
import { SynVueButton } from '@synergy-design-system/vue';
import { SynButton as SynButtonElement } from '@synergy-design-system/components';

const switchTheme = (e: Event) => {
  const { body } = document;
  const btn = (e.target as SynButtonElement);
  const currentTheme = body.classList.contains('syn-theme-dark') ? 'dark' : 'light';

  if (currentTheme === 'light') {
    // Light theme
    body.classList.remove('syn-theme-light');
    body.classList.add('syn-theme-dark');
    btn.innerText = 'Switch to light theme';
  } else {
    // Dark theme
    body.classList.remove('syn-theme-dark');
    body.classList.add('syn-theme-light');
    btn.innerText = 'Switch to dark theme';
  }
};
</script>

<template>
  <header>
    <SynVueButton @click="switchTheme">
      Switch Theme
    </SynVueButton>
  </header>
</template>

<style scoped>
header {
  display: flex;
  margin-bottom: var(--syn-spacing-large);
  padding: var(--syn-spacing-small);
  justify-content: center;
}
</style>
