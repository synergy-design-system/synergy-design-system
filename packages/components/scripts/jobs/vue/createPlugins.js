import fs from 'fs';
import path from 'path';
import {
  TWOWAY_BINDING_ENABLED_ELEMENTS,
  createHeader,
  getControlAttributeForTwoWayBinding,
  getEventAttributeForTwoWayBinding,
  job,
} from '../shared.js';

const headerComment = createHeader('vue');

const createBindingsMap = () => Object.fromEntries(
  TWOWAY_BINDING_ENABLED_ELEMENTS.map((componentName) => [
    `syn-${componentName}`,
    {
      event: getEventAttributeForTwoWayBinding(componentName),
      prop: getControlAttributeForTwoWayBinding(componentName),
    },
  ]),
);

const createPluginSource = (bindingsMap) => `${headerComment}
import type {
  App,
  Directive,
  DirectiveBinding,
  ObjectDirective,
  Plugin,
} from 'vue';

/**
 * Value contract for v-syn-model.
 *
 * Use this when binding a single native Synergy control to local Vue state.
 *
 * Example:
 * "<syn-input v-syn-model="{ value: state.name, update: v => (state.name = v as string) }" />"
 */
export type SynBindingValue = {
  /** Current value that should be pushed into the native element property. */
  value: unknown;
  /** Callback that receives the next value emitted by the native element event. */
  update: (newValue: unknown) => void;
};

/**
 * Shape for v-syn-form-model.
 *
 * Keys are expected to match form control "name" attributes.
 * The directive uses the name attribute as lookup key and synchronizes values both ways.
 */
export type SynFormModel = Record<string, unknown>;

/**
 * Runtime mapping between a native Synergy tag and its binding metadata.
 *
 * - "event": event name to listen for updates
 * - "prop": native element property to read/write
 */
export type SynBindingsMap = Record<string, {
  event: string;
  prop: string;
}>;

/**
 * Built-in bindings for known two-way capable Synergy controls.
 *
 * You can extend or override these mappings via createSynModelPlugin({ bindings }).
 */
export const DEFAULT_SYN_BINDINGS: SynBindingsMap = ${JSON.stringify(bindingsMap, null, 2)};

const LISTENER_SYMBOL = Symbol('synModelListener');
const FORM_LISTENERS_SYMBOL = Symbol('synModelFormListeners');

type SynBindableElement = HTMLElement & {
  [LISTENER_SYMBOL]?: {
    event: string;
    handler: EventListener;
  };
};

type SynFormBoundElement = HTMLElement & {
  [FORM_LISTENERS_SYMBOL]?: Array<{
    control: HTMLElement;
    event: string;
    handler: EventListener;
  }>;
};

type SynNamedControl = HTMLElement & {
  name?: string;
};

const applyValue = (
  control: HTMLElement,
  prop: string,
  value: unknown,
) => {
  if (typeof value === 'undefined') {
    return;
  }

  Reflect.set(control, prop, value);
};

const reapplyValueAfterDefine = (
  control: HTMLElement,
  prop: string,
  value: unknown,
) => {
  if (typeof value === 'undefined') {
    return;
  }

  const tagName = control.tagName.toLowerCase();
  if (!tagName.includes('-')) {
    return;
  }

  void customElements.whenDefined(tagName).then(() => {
    Reflect.set(control, prop, value);

    requestAnimationFrame(() => {
      Reflect.set(control, prop, value);
    });

    const updateComplete = (control as {
      updateComplete?: Promise<unknown>;
    }).updateComplete;

    if (updateComplete && typeof updateComplete.then === 'function') {
      void updateComplete.then(() => {
        Reflect.set(control, prop, value);
      });
    }
  });
};

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object';

const setModelValueByName = (model: SynFormModel, name: string, value: unknown) => {
  if (typeof model[name] !== 'undefined') {
    model[name] = value;
  }
};

const removeFormListeners = (el: SynFormBoundElement) => {
  const listeners = el[FORM_LISTENERS_SYMBOL];
  if (!listeners) {
    return;
  }

  listeners.forEach(({ control, event, handler }) => {
    control.removeEventListener(event, handler);
  });

  delete el[FORM_LISTENERS_SYMBOL];
};

const removeListener = (el: SynBindableElement) => {
  const listener = el[LISTENER_SYMBOL];
  if (!listener) {
    return;
  }

  el.removeEventListener(listener.event, listener.handler);
  delete el[LISTENER_SYMBOL];
};

const createSynModelDirective = (bindingsMap: SynBindingsMap): ObjectDirective<SynBindableElement, SynBindingValue> => {
  const applyDirective = (el: SynBindableElement, binding: DirectiveBinding<SynBindingValue>) => {
    removeListener(el);

    const config = bindingsMap[el.tagName.toLowerCase()];
    if (!config) {
      return;
    }

    const bindingValue = binding.value;
    if (!bindingValue || typeof bindingValue.update !== 'function') {
      return;
    }

    const { event, prop } = config;
    let isHydrated = false;

    applyValue(el, prop, bindingValue.value);
    reapplyValueAfterDefine(el, prop, bindingValue.value);

    queueMicrotask(() => {
      isHydrated = true;
    });

    requestAnimationFrame(() => {
      isHydrated = true;
    });

    const handler: EventListener = (nativeEvent) => {
      if (!nativeEvent.isTrusted) {
        return;
      }

      if (!isHydrated) {
        return;
      }

      const target = nativeEvent.target;
      if (!target || typeof target !== 'object') {
        return;
      }

      const nextValue = Reflect.get(target, prop);
      bindingValue.update(nextValue);
    };

    el.addEventListener(event, handler);
    el[LISTENER_SYMBOL] = { event, handler };
  };

  return {
    mounted: applyDirective,
    updated: applyDirective,
    beforeUnmount: removeListener,
  };
};

const createSynFormModelDirective = (bindingsMap: SynBindingsMap): ObjectDirective<SynFormBoundElement, SynFormModel> => {
  const applyDirective = (el: SynFormBoundElement, binding: DirectiveBinding<SynFormModel>) => {
    removeFormListeners(el);

    const model = binding.value;
    if (!isRecord(model)) {
      return;
    }

    const listeners: Array<{
      control: HTMLElement;
      event: string;
      handler: EventListener;
    }> = [];

    const controls = Array.from(el.querySelectorAll<SynNamedControl>('*[name]'));

    controls.forEach((control) => {
      const tagName = control.tagName.toLowerCase();
      const config = bindingsMap[tagName];
      const controlName = control.name;

      if (!config || !controlName) {
        return;
      }

      const { event, prop } = config;

      const currentModelValue = model[controlName];
      applyValue(control, prop, currentModelValue);
      reapplyValueAfterDefine(control, prop, currentModelValue);

      const handler: EventListener = (nativeEvent) => {
        if (!nativeEvent.isTrusted) {
          return;
        }

        const target = nativeEvent.target;
        if (!target || typeof target !== 'object') {
          return;
        }

        const nextValue = Reflect.get(target, prop);
        setModelValueByName(model, controlName, nextValue);
      };

      let listenerAttached = false;
      const attachListener = () => {
        if (listenerAttached) {
          return;
        }

        control.addEventListener(event, handler);
        listeners.push({ control, event, handler });
        listenerAttached = true;
      };

      queueMicrotask(attachListener);
      requestAnimationFrame(attachListener);

      const tagNameForDefine = control.tagName.toLowerCase();
      if (tagNameForDefine.includes('-')) {
        void customElements.whenDefined(tagNameForDefine).then(() => {
          const updateComplete = (control as {
            updateComplete?: Promise<unknown>;
          }).updateComplete;

          if (updateComplete && typeof updateComplete.then === 'function') {
            void updateComplete.then(() => {
              attachListener();
            });
            return;
          }

          attachListener();
        });
      }
    });

    el[FORM_LISTENERS_SYMBOL] = listeners;
  };

  return {
    mounted: (el, binding) => {
      applyDirective(el, binding);

      queueMicrotask(() => {
        applyDirective(el, binding);
      });

      requestAnimationFrame(() => {
        applyDirective(el, binding);
      });
    },
    updated: applyDirective,
    beforeUnmount: removeFormListeners,
  };
};

export type CreateSynModelPluginOptions = {
  /**
   * Directive name for single-control binding.
   *
  * Default: syn-model
   */
  directiveName?: string;
  /**
   * Directive name for form-level name-based binding.
   *
  * Default: syn-form-model
   */
  formDirectiveName?: string;
  /**
   * Optional binding map overrides.
   *
   * Use this to add custom elements or override event or property mappings.
   */
  bindings?: SynBindingsMap;
};

/**
 * Creates the Synergy Vue native binding plugin.
 *
 * Registered directives:
 * - v-syn-model for single-control binding
 * - v-syn-form-model for form-level name-based binding
 *
 * Example:
 * app.use(createSynModelPlugin())
 */
export const createSynModelPlugin = (
  options: CreateSynModelPluginOptions = {},
): Plugin => ({
  install(app: App) {
    const directiveName = options.directiveName || 'syn-model';
    const formDirectiveName = options.formDirectiveName || 'syn-form-model';
    const bindings = { ...DEFAULT_SYN_BINDINGS, ...(options.bindings || {}) };

    app.directive(directiveName, createSynModelDirective(bindings) as Directive);
    app.directive(formDirectiveName, createSynFormModelDirective(bindings) as Directive);
  },
});

/**
 * Default plugin instance using default directive names.
 *
 * Equivalent to createSynModelPlugin().
 */
export const SynModelPlugin = createSynModelPlugin();
`;

const createPluginIndexSource = () => `${headerComment}
export * from './syn-model.js';
`;

export const runCreatePlugins = job('Vue: Creating native binding plugin prototype...', async (outDir) => {
  const pluginsDir = path.join(outDir, 'plugins');
  fs.mkdirSync(pluginsDir, { recursive: true });

  const bindingsMap = createBindingsMap();

  fs.writeFileSync(
    path.join(pluginsDir, 'syn-model.ts'),
    `${createPluginSource(bindingsMap)}\n`,
    'utf8',
  );

  fs.writeFileSync(
    path.join(pluginsDir, 'index.ts'),
    `${createPluginIndexSource()}\n`,
    'utf8',
  );
});
