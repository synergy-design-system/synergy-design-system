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

  <!-- #838: Numeric Strategy (min-fraction-digits) -->
  <SynVueInput
    data-testid="input-838-numeric-native-min-fraction-digits"
    label="Numeric Strategy (native, using min-fraction-digits)"
    numericStrategy="native"
    :max=100
    :min=0
    :min-fraction-digits="4"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  />

  <SynVueInput
    data-testid="input-838-numeric-modern-min-fraction-digits"
    label="Numeric Strategy (modern, using min-fraction-digits)"
    numericStrategy="modern"
    :max=100
    :min=0
    :min-fraction-digits="4"
    placeholder="Enter a numeric value between 0 and 100"
    type="number"
    value="50"
  />
  <!-- /#838 -->

  <!-- #872: Spin buttons out of sync with value -->
  <syn-input
    data-testid="input-872-spin-buttons"
    label="Issue #872 - Spin Buttons out of sync with value"
    :max=100
    :min=0
    type="number"
    value="50"
  />
  <!-- /#872 -->
</template>
