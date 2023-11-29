<script setup lang="ts">
import { ref } from 'vue';
import '@synergy-design-system/components/components/checkbox/checkbox';
import type { SynBlurEvent, SynCheckbox, SynFocusEvent, SynChangeEvent, SynInputEvent } from '@synergy-design-system/components';

const element = ref<SynCheckbox>();

// Map methods
const callFocus = (...args: Parameters<SynCheckbox['focus']>) => element.value?.focus(...args);

defineExpose({
  callFocus,
});

// Map attributes
defineProps<{
  checked?: SynCheckbox['checked'];
  name?: SynCheckbox['name'];
  required?: SynCheckbox['required'];
  value?: SynCheckbox['value'];
  modelValue?: SynCheckbox['checked'];
}>();

// Map events
defineEmits<{
  'syn-blur': [e: SynBlurEvent];
  'syn-change': [e: SynChangeEvent];
  'syn-focus': [e: SynFocusEvent];
  'syn-input': [e: SynInputEvent];

  // Two way databinding
  'update:modelValue': [newValue: boolean];
}>();
</script>

<template>
  <syn-checkbox
    @syn-blur="$emit('syn-blur', $event)"
    @syn-change="$emit('syn-change', $event)"
    @syn-focus="$emit('syn-focus', $event)"
    @syn-input="$emit('syn-input', $event)"
    @input="$emit('update:modelValue', ($event.target as SynCheckbox).checked)"
    :checked="modelValue || checked"
    :name="name"
    :required="required"
    :value="value"
    ref="element"
  >
    <slot></slot>
  </syn-checkbox>
</template>
