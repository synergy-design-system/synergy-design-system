<script setup lang="ts">
import { ref } from 'vue';
import { setGlobalSize } from './shared';
import {
  SynVueButtonGroup,
  SynVueIconButton,
  SynVueTooltip,
} from '@synergy-design-system/vue';

type AvailableSizes = 'small' | 'medium' | 'large';

const size = ref<AvailableSizes>('medium');

const handleSizeChange = (newSize: AvailableSizes) => {
  size.value = newSize;
  setGlobalSize(newSize);
};
</script>

<template>
  <SynVueButtonGroup>
    <SynVueTooltip content="Set element size to small">
      <SynVueIconButton
        :color="size === 'small' ? 'primary' : 'currentColor'"
        name="density_small"
        label="Set element size to small"
        size="small"
        @click="() => handleSizeChange('small')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set element size to medium">
      <SynVueIconButton
        :color="size === 'medium' ? 'primary' : 'currentColor'"
        name="density_medium"
        label="Set element size to medium"
        size="small"
        @click="() => handleSizeChange('medium')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set element size to large">
      <SynVueIconButton
        :color="size === 'large' ? 'primary' : 'currentColor'"
        name="density_large"
        label="Set element size to large"
        size="small"
        @click="() => handleSizeChange('large')"
      />
    </SynVueTooltip>
  </SynVueButtonGroup>
</template>
