<script setup lang="ts">
import { ref } from 'vue';
import { SynVueSwitch } from '@synergy-design-system/vue';
import type {
  SynChangeEvent,
  SynSwitch as SynSwitchElement,
} from '@synergy-design-system/components';

const currentTheme = ref('🌙');

const switchTheme = (e: SynChangeEvent) => {
  const { body } = document;
  const { checked } = e.target as SynSwitchElement;
  const theme = checked ? 'dark' : 'light';
  body.classList.remove('syn-theme-light', 'syn-theme-dark');
  body.classList.add(`syn-theme-${theme}`);

  currentTheme.value = theme === 'light' ? '🌙' : '☀️';
};
</script>

<template>
  <SynVueSwitch @syn-change="switchTheme" size="small">
    {{ currentTheme }}
  </SynVueSwitch>
</template>
