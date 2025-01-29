<script setup lang="ts">
import { SynVueTab, SynVueTabGroup, SynVueTabPanel } from '@synergy-design-system/vue';
import * as DemoImports from './AllComponentParts/index.js';

const Demos = Object
  .entries(DemoImports)
  .map(([name, Component]) => [name.replace('Demo', ''), Component]);
const activeDemo = Demos.at(0)?.at(0);

const showTab = (e: Event) => {
  const { name } = e.detail;
  (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

  const dialog = document.querySelector('syn-dialog');
  if (dialog) {
    dialog.open = name === 'Dialog';
  }
};
</script>

<template>
  <SynVueTabGroup @syn-tab-show="showTab">
    <template
      v-for="([name, Component]) in Demos"
      :key="name"
    >
      <SynVueTab
        :active="name === activeDemo"
        :id="`tab-content-${name}`"
        :panel="name as string"
        slot="nav"
      >
        {{name}}
      </SynVueTab>
      <SynVueTabPanel
        :active="name === activeDemo"
        :name="name as string"
      >
        <div :id="`tab-content-{name}`" style="display: 'contents';">
          <component :is="Component" />
        </div>
      </SynVueTabPanel>
    </template>
  </SynVueTabGroup>
</template>
