<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { SynVueIconButton, SynVueSwitch } from '@synergy-design-system/vue';
import type {
  SynChangeEvent,
  SynSwitch as SynSwitchElement,
} from '@synergy-design-system/components';
import {
  type AllowedModes,
  type AllowedThemes,
  setTheme,
} from '@synergy-design-system/demo-utilities';

const currentTheme = ref<AllowedThemes>('2018');
const currentMode = ref<AllowedModes>('light');

const setCurrentTheme = () => {
  currentTheme.value = currentTheme.value === '2025' ? '2018' : '2025';
}

const setCurrentMode = (e: SynChangeEvent) => {
  const { checked } = e.target as SynSwitchElement;
  currentMode.value = checked ? 'dark' : 'light';
}

watchEffect(() => {
  setTheme(currentTheme.value, currentMode.value);
});
</script>

<template>
  <SynVueIconButton
    :label="`Experimental Theme? ${currentTheme === '2025' ? '✓' : '✗'}`"
    :name="currentTheme === '2025' ? 'visibility_off' : 'visibility'"
    size="small"
    @click="setCurrentTheme"
  />
  <SynVueSwitch @syn-change="setCurrentMode" size="small">
    {{ currentMode === 'dark' ? '🌙' : '🌞' }}
  </SynVueSwitch>
</template>
