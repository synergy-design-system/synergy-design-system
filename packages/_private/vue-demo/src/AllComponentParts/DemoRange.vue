<script setup lang="ts">
import { range1272ChangeValueButton } from '@synergy-design-system/demo-utilities';
import { SynVueButton } from '@synergy-design-system/vue';
import { SynVueRange } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueRange
    help-text="Controls the volume of the current song"
    label="Volume"
    :max=100
    :min=0
    value="50"
  >
    <span slot="prefix">0</span>
    <span slot="suffix">100</span>
  </SynVueRange>

  <SynVueRange
    data-testid="range-1272-programatic-value-change"
    label="Regression #1272"
    :max=100
    :min=0
    value="50"
  />
  <SynVueButton
    data-testid="range-1272-change-value-button"
    @click="range1272ChangeValueButton"
  >Programatically set value</SynVueButton>
</template>
