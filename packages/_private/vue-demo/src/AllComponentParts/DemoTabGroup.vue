<script setup lang="ts">
import { SynVueButton, SynVueTabGroup, SynVueTabPanel, SynVueTab } from '@synergy-design-system/vue';
import { ref } from 'vue';
const initialItems = [
    {
      description: 'This is the custom tab panel.', disabled: false, id: 'general', name: 'General',
    },
    {
      description: 'This is the disabled tab panel.', disabled: true, id: 'disabled', name: 'Disabled',
    },
    {
      description: 'This is the custom tab panel.', disabled: false, id: 'custom', name: 'Custom',
    },
    {
      description: 'This is the advanced tab panel.', disabled: false, id: 'advanced', name: 'Advanced',
    }];

const items = ref(initialItems);
const createNewActiveTab = () => {
  items.value.push({
      id: `new-tab-${items.value.length + 1}`,
      description: `This is the new tab panel ${items.value.length + 1}.`,
      name: `New Tab ${items.value.length + 1}`,
      disabled: false,
    });
  };
</script>

<template>
  <SynVueTabGroup contained>
    <SynVueTabPanel v-for="item in items" :key="item.id" :name="item.id">
      {{ item.description }}
    </SynVueTabPanel>
    <SynVueTab 
      v-for="(item, index) in items" 
      :key="item.id"
      :panel="item.id"
      :disabled="item.disabled"
      :active="index === items.length - 1"
      slot="nav">
      {{ item.name }}
    </SynVueTab>
  </SynVueTabGroup>
  <SynVueButton @click="createNewActiveTab" >Add Tab</SynVueButton>
</template>
