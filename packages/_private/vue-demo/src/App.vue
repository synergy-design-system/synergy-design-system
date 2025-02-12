<script setup lang="ts">
import SizeSwitch from './SizeSwitch.vue';
import ThemeSwitch from './ThemeSwitch.vue';
import { SynVueDivider, SynVueHeader, SynVueIcon, SynVueNavItem, SynVueSideNav } from '@synergy-design-system/vue';
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();

const currentRoute = computed(() => router.currentRoute.value.path);

const routeTo = (route: string) => {
  router.push(route);
}
</script>

<template>
  <SynVueHeader label="@synergy-design-system/vue Components Demo">
    <RouterLink class="custom-logo" tabindex="0" to="/" slot="logo">
      <SynVueIcon name="logo-color" library="system" />
    </RouterLink>
    <div class="meta-navigation" slot="meta-navigation">
      <SizeSwitch />
      <SynVueDivider vertical />
      <ThemeSwitch />
    </div>
  </SynVueHeader>

  <div class="main">
    <SynVueSideNav rail ref="sideNavRef">
      <SynVueNavItem :current="currentRoute === '/'" @click="() => routeTo('/')">
        Home
        <SynVueIcon name="home" slot="prefix"/>
      </SynVueNavItem>
      <SynVueNavItem :current="currentRoute === '/contact-form'" divider @click="() => routeTo('/contact-form')">
        Contact Form
        <SynVueIcon name="contact_mail" slot="prefix"/>
      </SynVueNavItem>
      <SynVueNavItem :current="currentRoute === '/contact-form-validate'" divider @click="() => routeTo('/contact-form-validate')">
        Contact Form (Validation)
        <SynVueIcon name="contact_emergency" slot="prefix"/>
      </SynVueNavItem>
      <SynVueNavItem :current="currentRoute === '/all-components'" divider @click="() => routeTo('/all-components')">
        All Components
        <SynVueIcon name="grid_view" slot="prefix"/>
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

.custom-logo syn-icon {
  display: block;
  width: auto;
  height: 32px;
}

.meta-navigation {
  align-items: center;
  display: flex;
}

/* Safari fix for ##623 */
.custom-logo syn-icon::part(svg) {
  width: auto;
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
