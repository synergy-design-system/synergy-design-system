<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue';
import SynContactForm from './components/SynContactForm.vue';
</script>

<template>
  <ThemeSwitch />
  <main>
    <h1>@synergy-design-system/components</h1>
    <h2>Demo Application using <code>@synergy-design-system/components</code> web components in Vue.js</h2>
    <hr />
    <SynContactForm />
  </main>
</template>

<style scoped>
main {
  background: var(--syn-color-neutral-0);  
  box-shadow: 0 0 10px var(--syn-color-neutral-500);
  border-radius: .25rem;
  width: 500px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  font-size: 1.5rem;
  margin: 0 0 0.75rem;
}

h2 {
  font-size: 1.2rem;
  font-weight: normal;
  margin: 0 0 1.2rem;
}

code {
  background: var(--syn-color-neutral-950);
  color: var(--syn-color-neutral-0);
  font-size: .8rem;
  padding: 0.25rem;
}

hr {
  border: 1px dotted var(--syn-color-neutral-500);
  border-width: 1px 0 0 0;
  margin: 0.25rem 0 0.75rem;
}
</style>
