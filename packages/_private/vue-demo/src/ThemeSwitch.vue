<script setup lang="ts">
import {
  SynVueSelect,
  SynVueOptgroup,
  SynVueOption,
} from '@synergy-design-system/vue';
import {
  getAvailableThemes,
  setThemeFromOptionString,
} from '@synergy-design-system/demo-utilities';
import type { SynChangeEvent, SynSelect } from '@synergy-design-system/components';

const availableThemes = getAvailableThemes();

const setTheme = (e: SynChangeEvent) => {
  const value = (e.target as SynSelect).value as string;
  console.log(value);
  setThemeFromOptionString(value);
}
</script>

<template>
  <SynVueSelect
    placeholder="Select theme to use"
    size="small"
    @synChange="setTheme"
    value="2018-light"
  >
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
        {{theme.title}} - {{ mode }}
      </SynVueOption>
    </SynVueOptGroup>
  </SynVueSelect>
</template>
