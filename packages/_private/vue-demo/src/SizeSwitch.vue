<script setup lang="ts">
import { ref } from 'vue';
import {
  SynVueButtonGroup,
  SynVueIconButton,
  SynVueTooltip,
} from '@synergy-design-system/vue';
import {
  type AllowedSizes,
  setGlobalSize,
} from '@synergy-design-system/demo-utilities';

const size = ref<AllowedSizes>('medium');

const handleSizeChange = (newSize: AllowedSizes) => {
  size.value = newSize;
  setGlobalSize(newSize);
};
</script>

<template>
  <SynVueButtonGroup>
    <SynVueTooltip content="Set element size to small">
      <SynVueIconButton
        :color="size === 'small' ? 'primary' : 'currentColor'"
        data-size="small"
        name="density_small"
        label="Set element size to small"
        size="small"
        @click="() => handleSizeChange('small')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set element size to medium">
      <SynVueIconButton
        :color="size === 'medium' ? 'primary' : 'currentColor'"
        data-size="medium"
        name="density_medium"
        label="Set element size to medium"
        size="small"
        @click="() => handleSizeChange('medium')"
      />
    </SynVueTooltip>
    <SynVueTooltip content="Set element size to large">
      <SynVueIconButton
        :color="size === 'large' ? 'primary' : 'currentColor'"
        data-size="large"
        name="density_large"
        label="Set element size to large"
        size="small"
        @click="() => handleSizeChange('large')"
      />
    </SynVueTooltip>
  </SynVueButtonGroup>
</template>
