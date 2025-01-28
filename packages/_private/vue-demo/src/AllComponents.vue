<script setup lang="ts">
import { SynVueTab, SynVueTabGroup, SynVueTabPanel } from '@synergy-design-system/vue';
import * as DemoImports from './AllComponentParts/index.js';

const Demos = Object
  .entries(DemoImports)
  .map(([name, Component]) => [name.replace('Demo', ''), Component]);
const activeDemo = Demos.at(0)?.at(0);
</script>

<template>
  <SynVueTabGroup @syn-tab-show="e => e.target.parentElement?.scrollTo(0, 0)">
    <template
      v-for="([name, Component]) in Demos"
      :key="name"
    >
      <SynVueTab
        :active="name === activeDemo"
        :panel="name as string"
        slot="nav"
      >
        {{name}}
      </SynVueTab>
      <SynVueTabPanel
        :active="name === activeDemo"
        :name="name as string"
      >
        <div :id="`tab-{name}`" style="display: 'contents';">
          <component :is="Component" />
        </div>
      </SynVueTabPanel>
    </template>
  </SynVueTabGroup>
</template>
