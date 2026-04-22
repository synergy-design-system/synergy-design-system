<script setup lang="ts">
import { SynVueDivider, SynVueTab, SynVueTabGroup, SynVueTabPanel } from '@synergy-design-system/vue';
import type { SynTabShowEvent } from '@synergy-design-system/components';
import { type Component } from 'vue';

import { computed } from 'vue';
const props = defineProps<{ demos: [string, Component][] }>();
const demos = computed(() => props.demos);

const activeDemo = computed( () => demos.value[0]?.[0] || '');

const showTab = (e: SynTabShowEvent) => {
  const { name } = e.detail;
  (e.target as HTMLElement).parentElement?.scrollTo(0, 0);

  const dialog = document.querySelector('syn-dialog');
  if (dialog) {
    dialog.open = name === 'Dialog';
  }
};
</script>

<template>
  <span v-if="demos.length === 0">
    There are no demos available.
  </span>

  <SynVueTabGroup
    class="demo-tab-group"
    @syn-tab-show="showTab"
    placement="end"
    v-else
  >
    <template
      v-for="([name, Component]) in demos"
      :key="name"
    >
      <SynVueTab
        :active="name === activeDemo"
        :id="`tab-${name}`"
        :panel="name as string"
        slot="nav"
      >
        {{name}}
      </SynVueTab>
      <SynVueTabPanel
        :active="name === activeDemo"
        :name="name as string"
      >
        <div :id="`tab-content-${name}`" style="display: 'contents';">
          <h1 className="syn-heading--3x-large">{{name}}</h1>
          <SynVueDivider />
          <component :is="Component" />
        </div>
      </SynVueTabPanel>
    </template>
  </SynVueTabGroup>
</template>
