<script setup lang="ts">
import {
  SynVueSelect,
  SynVueOptgroup,
  SynVueOption,
  SynVueIcon,
} from '@synergy-design-system/vue';
import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';
import type { SynChangeEvent, SynSelect } from '@synergy-design-system/components';
import { ref } from 'vue';

const availableThemes = getAvailableThemes();
const currentMode = ref<string>('light_mode');
const currentTheme = ref<string>('2018-light');

const setTheme = (e: SynChangeEvent) => {
  const value = (e.target as SynSelect).value as string;
  currentMode.value = value.includes('light') ? 'light_mode' : 'dark_mode';
  setThemeFromOptionString(value);
}
</script>

<template>
  <SynVueSelect
    placeholder="Select theme to use"
    size="small"
    @synChange="setTheme"
    v-model="currentTheme"
  >
    <SynVueIcon :name="currentMode" slot="prefix"></SynVueIcon>
    <SynVueOptgroup
      v-for="(theme, key) in availableThemes"
      :key="key"
      :label="theme.title"
    >
      <SynVueOption
        v-for="(mode, index) in theme.modes"
        :value="`${theme.name}-${mode}`"
        :key="index"
      >
        <SynVueIcon :name="mode.includes('light') ? 'light_mode' : 'dark_mode'" slot="prefix"></SynVueIcon>
        {{theme.title}} - {{ mode }}
      </SynVueOption>
    </SynVueOptGroup>
  </SynVueSelect>
</template>

<style scoped>
  syn-icon {
    color: var(--syn-color-warning-500);
  }
</style>
