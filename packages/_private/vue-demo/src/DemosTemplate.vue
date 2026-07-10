<script setup lang="ts">
import { SynVueDivider, SynVueTab, SynVueTabGroup, SynVueTabPanel } from '@synergy-design-system/vue';
import type { SynTabShowEvent } from '@synergy-design-system/components';
import { type Component } from 'vue';

import { computed, ref, watch } from 'vue';
const props = defineProps<{ demos: [string, Component][] }>();
const demos = computed(() => props.demos);
const demoNames = computed(() => new Set(demos.value.map(([name]) => name)));

const activeDemo = ref('');

watch(demos, (nextDemos) => {
  activeDemo.value = nextDemos[0]?.[0] || '';
}, { immediate: true });

const showTab = (e: SynTabShowEvent) => {
  const { name } = e.detail;
  if (!demoNames.value.has(name)) {
    return;
  }

  (e.target as HTMLElement).parentElement?.scrollTo(0, 0);
  activeDemo.value = name;
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
        <div
          v-if="name === activeDemo"
          :id="`tab-content-${name}`"
          style="display: 'contents';"
        >
          <h1 className="syn-heading--3x-large">{{name}}</h1>
          <SynVueDivider />
          <component :is="Component" />
        </div>
      </SynVueTabPanel>
    </template>
  </SynVueTabGroup>
</template>
