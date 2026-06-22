<script setup lang="ts">
import { SynVueButton, SynVueDrawer, SynVueSelect, SynVueOption, SynVueDropdown, SynVueMenu, SynVueMenuItem } from '@synergy-design-system/vue';
import { ref } from 'vue';

const drawerRef = ref<InstanceType<typeof SynVueDrawer>>();

const openDrawer = () => {
  drawerRef.value?.nativeElement?.show();
};
</script>

<template>
  <SynVueButton data-testid="single-btn-1304" @click="openDrawer">Open Drawer</SynVueButton>
  <SynVueDrawer ref="drawerRef">
    <div style="display: flex;">
      <SynVueSelect data-testid="first"><SynVueOption value="1">Test 1</SynVueOption><SynVueOption value="2">Test 2</SynVueOption><SynVueOption value="3">Test 3</SynVueOption></SynVueSelect>
      <SynVueSelect data-testid="second"><SynVueOption value="1">Test 1</SynVueOption><SynVueOption value="2">Test 2</SynVueOption><SynVueOption value="3">Test 3</SynVueOption></SynVueSelect>
      <SynVueDropdown>
        <SynVueButton slot="trigger" caret>Dropdown</SynVueButton>
        <SynVueMenu>
          <SynVueMenuItem value="undo">Undo</SynVueMenuItem>
          <SynVueMenuItem>
            Find
            <SynVueMenu slot="submenu">
              <SynVueMenuItem value="find-next">Find Previous</SynVueMenuItem>
            </SynVueMenu>
          </SynVueMenuItem>
        </SynVueMenu>
      </SynVueDropdown>
    </div>
  </SynVueDrawer>
</template>
