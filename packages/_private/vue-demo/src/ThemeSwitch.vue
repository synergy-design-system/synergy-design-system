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

const currentTheme = ref<AllowedThemes>('synergy');
const currentMode = ref<AllowedModes>('light');

const setCurrentTheme = () => {
  currentTheme.value = currentTheme.value === 'brand25' ? 'synergy' : 'brand25';
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
    :label="`Experimental Theme? ${currentTheme === 'brand25' ? '✓' : '✗'}`"
    :name="currentTheme === 'brand25' ? 'visibility_off' : 'visibility'"
    size="small"
    @click="setCurrentTheme"
  />
  <SynVueSwitch @syn-change="setCurrentMode" size="small">
    {{ currentMode === 'dark' ? '🌙' : '🌞' }}
  </SynVueSwitch>
</template>
