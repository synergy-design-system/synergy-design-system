<script setup lang="ts">
import { SynVueButton } from '@synergy-design-system/vue';
import { SynButton as SynButtonElement } from '@synergy-design-system/components';

const switchTheme = (e: Event) => {
  const bdy = document.body;
  const btn = (e.target as SynButtonElement);
  const currentTheme = bdy.classList.contains('syn-theme-dark') ? 'dark' : 'light';

  if (currentTheme === 'light') {
    // Light theme
    bdy.classList.remove('syn-theme-light');
    bdy.classList.add('syn-theme-dark');
    btn.innerText = 'Switch to light theme';
  } else {
    // Dark theme
    bdy.classList.remove('syn-theme-dark');
    bdy.classList.add('syn-theme-light');
    btn.innerText = 'Switch to dark theme';
  }

  // Will toggle between light to dark
  // with each call to switchTheme
  console.log(bdy.className);
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
