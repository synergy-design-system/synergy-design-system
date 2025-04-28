<script setup lang="ts">
import { SynVueInput, SynVueIcon } from '@synergy-design-system/vue';
</script>
<template>
  <SynVueInput
    placeholder="Disabled"
    help-text="Help Text"
    label="Label"
  >
    <SynVueIcon name="house" slot="prefix" />
    <SynVueIcon name="chat" slot="suffix" />
  </SynVueInput>

  <!-- #417: Numeric Strategy -->
  <SynVueInput
    data-testid="input-417-numeric-no-value"
    label="Numeric Strategy (no value provided)"
    :max=100
    :min=0
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  />

  <SynVueInput
    data-testid="input-417-numeric-native"
    label="Numeric Strategy (native)"
    numericStrategy="native"
    :max=100
    :min=0
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  />

  <SynVueInput
    data-testid="input-417-numeric-modern"
    label="Numeric Strategy (modern)"
    numericStrategy="modern"
    :max=100
    :min=0
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  />
  <!-- /#417 -->
</template>
