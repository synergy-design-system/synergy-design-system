<script setup lang="ts">
// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/vue wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------

/**
 * @summary Button groups can be used to group related buttons into sections.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-button-group--docs
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<syn-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
import { computed, ref } from 'vue';
import '@synergy-design-system/components/components/button-group/button-group.js';

import type { SynButtonGroup } from '@synergy-design-system/components';

// DOM Reference to the element
const nativeElement = ref<SynButtonGroup>();

defineExpose({
  nativeElement,
});

// Map attributes
const props = defineProps<{
  /**
* A label to use for the button group.
* This won't be displayed on the screen, but it will be announced by assistive
devices when interacting with the control and is strongly recommended.
 */
  label?: SynButtonGroup['label'];
}>();

// Make sure prop binding only forwards the props that are actually there.
// This is needed because :param="param" also adds an empty attribute
// when using web-components, which breaks optional arguments like size in SynInput
// @see https://github.com/vuejs/core/issues/5190#issuecomment-1003112498
const visibleProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => typeof value !== 'undefined'),
  ),
);
</script>

<template>
  <syn-button-group v-bind="visibleProps" ref="nativeElement">
    <slot></slot>
  </syn-button-group>
</template>
