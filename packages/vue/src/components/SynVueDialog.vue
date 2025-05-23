<script setup lang="ts">
// ---------------------------------------------------------------------
// 🔒 AUTOGENERATED @synergy-design-system/vue wrappers for @synergy-design-system/components
// Please do not edit this file directly!
// It will get recreated when running pnpm build.
// ---------------------------------------------------------------------

/**
 * @summary Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-dialog--docs
 * @status stable
 * @since 2.0
 *
 * @dependency syn-icon-button
 *
 * @slot - The dialog's main content.
 * @slot label - The dialog's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<syn-icon-button>`.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @event syn-show - Emitted when the dialog opens.
 * @event syn-after-show - Emitted after the dialog opens and all animations are complete.
 * @event syn-hide - Emitted when the dialog closes.
 * @event syn-after-hide - Emitted after the dialog closes and all animations are complete.
 * @event syn-initial-focus - Emitted when the dialog opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} syn-request-close - Emitted when the user attempts to
 *   close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay that covers the screen behind the dialog.
 * @csspart panel - The dialog's panel (where the dialog and its content are rendered).
 * @csspart header - The dialog's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<syn-icon-button>`.
 * @csspart title - The dialog's title.
 * @csspart close-button - The close button, an `<syn-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The dialog's body.
 * @csspart footer - The dialog's footer.
 *
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation dialog.show - The animation to use when showing the dialog.
 * @animation dialog.hide - The animation to use when hiding the dialog.
 * @animation dialog.denyClose - The animation to use when a request to close the dialog is denied.
 * @animation dialog.overlay.show - The animation to use when showing the dialog's overlay.
 * @animation dialog.overlay.hide - The animation to use when hiding the dialog's overlay.
 *
 * @property modal - Exposes the internal modal utility that controls focus trapping. To temporarily disable focus
 *   trapping and allow third-party modals spawned from an active Synergy modal, call `modal.activateExternal()` when
 *   the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Synergy's focus trapping.
 */
import { computed, ref } from 'vue';
import '@synergy-design-system/components/components/dialog/dialog.js';

import type { SynShowEvent } from '@synergy-design-system/components';
import type { SynAfterShowEvent } from '@synergy-design-system/components';
import type { SynHideEvent } from '@synergy-design-system/components';
import type { SynAfterHideEvent } from '@synergy-design-system/components';
import type { SynInitialFocusEvent } from '@synergy-design-system/components';
import type { SynRequestCloseEvent } from '@synergy-design-system/components';
import type { SynDialog } from '@synergy-design-system/components';

// DOM Reference to the element
const nativeElement = ref<SynDialog>();

defineExpose({
  nativeElement,
});

// Map attributes
const props = defineProps<{
  /**
* Indicates whether or not the dialog is open.
* You can toggle this attribute to show and hide the dialog, or you can
use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state.
 */
  open?: SynDialog['open'];

  /**
* The dialog's label as displayed in the header.
* You should always include a relevant label even when using
`no-header`, as it is required for proper accessibility.
* If you need to display HTML, use the `label` slot instead.
 */
  label?: SynDialog['label'];

  /**
* Disables the header.
* This will also remove the default close button, so please ensure you provide an easy,
accessible way for users to dismiss the dialog.
 */
  noHeader?: SynDialog['noHeader'];
}>();

// Make sure prop binding only forwards the props that are actually there.
// This is needed because :param="param" also adds an empty attribute
// when using web-components, which breaks optional arguments like size in SynInput
// @see https://github.com/vuejs/core/issues/5190#issuecomment-1003112498
const visibleProps = computed(() =>
  Object.fromEntries(
    Object.entries(props).filter(([, value]) => typeof value !== 'undefined'),
  ),
);

// Map events
defineEmits<{
  /**
   * Emitted when the dialog opens.
   */
  'syn-show': [e: SynShowEvent];

  /**
   * Emitted after the dialog opens and all animations are complete.
   */
  'syn-after-show': [e: SynAfterShowEvent];

  /**
   * Emitted when the dialog closes.
   */
  'syn-hide': [e: SynHideEvent];

  /**
   * Emitted after the dialog closes and all animations are complete.
   */
  'syn-after-hide': [e: SynAfterHideEvent];

  /**
   * Emitted when the dialog opens and is ready to receive focus.
   * Calling `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
   */
  'syn-initial-focus': [e: SynInitialFocusEvent];

  /**
   * Emitted when the user attempts to close the dialog by clicking the close button, clicking the overlay, or pressing escape.
   * Calling `event.preventDefault()` will keep the dialog open.
   * Avoid using this unless closing the dialog will result in destructive behavior such as data loss.
   */
  'syn-request-close': [e: SynRequestCloseEvent];
}>();
</script>

<script lang="ts">
export type { SynShowEvent } from '@synergy-design-system/components';
export type { SynAfterShowEvent } from '@synergy-design-system/components';
export type { SynHideEvent } from '@synergy-design-system/components';
export type { SynAfterHideEvent } from '@synergy-design-system/components';
export type { SynInitialFocusEvent } from '@synergy-design-system/components';
export type { SynRequestCloseEvent } from '@synergy-design-system/components';
</script>

<template>
  <syn-dialog
    @syn-show="$emit('syn-show', $event)"
    @syn-after-show="$emit('syn-after-show', $event)"
    @syn-hide="$emit('syn-hide', $event)"
    @syn-after-hide="$emit('syn-after-hide', $event)"
    @syn-initial-focus="$emit('syn-initial-focus', $event)"
    @syn-request-close="$emit('syn-request-close', $event)"
    v-bind="visibleProps"
    ref="nativeElement">
    <slot></slot>
  </syn-dialog>
</template>
