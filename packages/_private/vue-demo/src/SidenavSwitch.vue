<script setup lang="ts">
import { ref } from 'vue';
import {
  SynVueButtonGroup,
  SynVueIconButton,
  SynVueTooltip,
} from '@synergy-design-system/vue';
import { type SideNavTypes } from '@synergy-design-system/demo-utilities';

const type = ref<SideNavTypes>('rail');

const setType = (newType: SideNavTypes) => {
  type.value = newType;
  const sideNav = document.querySelector('syn-side-nav');
  if (sideNav) {
    sideNav.variant = newType;
  }
};
</script>

<template>
  <SynVueButtonGroup>
    <SynVueTooltip content="Set sidenav to fixed">
      <SynVueIconButton
        :color="type === 'fixed' ? 'primary' : 'currentColor'"
        data-type="fixed"
        label="Set navigation to fixed"
        name="lunch_dining"
        size="small"
        @click="() => setType('fixed')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set sidenav to rail">
      <SynVueIconButton
        :color="type === 'rail' ? 'primary' : 'currentColor'"
        data-type="rail"
        label="Set navigation to rail"
        name="space_dashboard"
        size="small"
        @click="() => setType('rail')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set sidenav to sticky">
      <SynVueIconButton
        :color="type === 'sticky' ? 'primary' : 'currentColor'"
        data-type="sticky"
        label="Set navigation to sticky"
        name="preview"
        size="small"
        @click="() => setType('sticky')"
      />
    </SynVueTooltip>
  </SynVueButtonGroup>
</template>
