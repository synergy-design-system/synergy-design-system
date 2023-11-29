<script setup lang="ts">
import { ref } from 'vue';
import '@synergy-design-system/components/components/input/input';
import type { SynBlurEvent, SynInput, SynFocusEvent, SynChangeEvent, SynInputEvent } from '@synergy-design-system/components';

const element = ref<SynInput>();

// Map methods
const callFocus = (...args: Parameters<SynInput['focus']>) => element.value?.focus(...args);

defineExpose({
  callFocus,
});

// Map attributes
defineProps<{
  label?: SynInput['label'];
  name?: SynInput['name'];
  required?: SynInput['required'];
  type?: SynInput['type'];
  value?: SynInput['value'];
  modelValue?: SynInput['value'];
}>();

// Map events
defineEmits<{
  'syn-blur': [e: SynBlurEvent];
  'syn-change': [e: SynChangeEvent];
  'syn-focus': [e: SynFocusEvent];
  'syn-input': [e: SynInputEvent];

  // Two way databinding
  'update:modelValue': [newValue: string];
}>();
</script>

<template>
  <!-- @input="$emit('update:value', $event.target.value)" -->
  <!-- @input="emitTwoWayDataBinding" -->
  <syn-input
    @syn-blur="$emit('syn-blur', $event)"
    @syn-change="$emit('syn-change', $event)"
    @syn-focus="$emit('syn-focus', $event)"
    @syn-input="$emit('syn-input', $event)"
    @input="$emit('update:modelValue', ($event.target as SynInput).value)"
    :label="label"
    :name="name"
    :required="required"
    :type="type"
    :value="modelValue || value"
    ref="element"
  >
    <slot name="label" />
    <slot name="prefix" />
    <slot name="suffix" />
    <slot name="clear-icon" />
    <slot name="show-password-icon" />
    <slot name="hide-password-icon" />
    <slot name="help-text" />
    <slot></slot>
  </syn-input>
</template>
