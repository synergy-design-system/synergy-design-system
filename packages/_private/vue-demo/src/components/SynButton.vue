<script setup lang="ts">
import { ref } from 'vue';
import '@synergy-design-system/components/components/button/button';
import type { SynBlurEvent, SynButton, SynFocusEvent } from '@synergy-design-system/components';

const element = ref<SynButton>();

// Map methods
const callClick = (...args: Parameters<SynButton['click']>) => element.value?.click(...args);
const callFocus = (...args: Parameters<SynButton['focus']>) => element.value?.focus(...args);

defineExpose({
  callClick,
  callFocus,
});

// Map attributes
defineProps<{
  type?: SynButton['type'];
  variant?: SynButton['variant'];
}>();

// Map events
defineEmits<{
  'syn-blur': [e: SynBlurEvent];
  'syn-focus': [e: SynFocusEvent]
}>();
</script>

<template>
  <syn-button
    @syn-blur="$emit('syn-blur', $event)"
    @syn-focus="$emit('syn-focus', $event)"
    :type="type"
    :variant="variant"
    ref="element"
  >
    <slot name="prefix" />
    <slot name="suffix" />
    <slot />
  </syn-button>
</template>
