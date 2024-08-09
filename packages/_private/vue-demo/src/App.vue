<script setup lang="ts">
import ThemeSwitch from './ThemeSwitch.vue';
import { SynVueHeader, SynVueIcon, SynVueNavItem, SynVueSideNav } from '@synergy-design-system/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const routeTo = (route: string) => {
  router.push(route);
}
</script>

<template>
  <SynVueHeader label="@synergy-design-system/vue Form Demo">
    <ThemeSwitch slot="meta-navigation" />
  </SynVueHeader>

  <div class="main">
    <SynVueSideNav rail ref="sideNavRef">
      <SynVueNavItem @click="() => routeTo('/')">
        Home
        <SynVueIcon name="home" slot="prefix"/>
      </SynVueNavItem>
      <SynVueNavItem divider @click="() => routeTo('/contact-form')">
        Contact Form
        <SynVueIcon name="description" slot="prefix"/>
      </SynVueNavItem>
    </SynVueSideNav>
    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
syn-header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.main {
  flex-grow: 1;
  display: flex;
  position: relative;
  background: var(--syn-color-neutral-0);
  overflow: hidden;
}

.content {
  box-sizing: border-box;
  flex-grow: 1;
  padding: var(--syn-spacing-medium) var(--syn-spacing-large);
  height: 100%;
  overflow-y: auto;
}
</style>
