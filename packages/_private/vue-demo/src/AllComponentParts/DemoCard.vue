<script setup lang="ts">
import { SynVueCard, SynVueButton } from '@synergy-design-system/vue';
</script>

<template>
  <SynVueCard
    style="max-width: 400px;"
  >
    <h3>Headline</h3>
    This are some happy employees, but not just any employees. These are SICK
    employees.

    <footer slot="footer">
      <small>Optional information</small>
      <nav>
        <SynVueButton variant="filled" size="small">More Info</SynVueButton>
      </nav>
    </footer>
    <img
      slot="image"
      src="/card-example.jpg"
      alt="Multiple persons having lunch in SICK Academy"
    />
  </SynVueCard>
</template>
