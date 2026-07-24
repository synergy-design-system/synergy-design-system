import type {
  SynAccordion,
  SynDetails,
  SynHideEvent,
  SynShowEvent,
} from '@synergy-design-system/components';
import type {
  AllowedComponentProps,
  ComponentCustomProps,
  EmitFn,
  HTMLAttributes,
  VNodeProps,
} from 'vue';

type IfEquals<T, U, Then = T, Else = never> =
  (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2) ? Then : Else;

type WritableKeys<T> = {
  [K in keyof T]-?: IfEquals<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }, K>;
}[keyof T];

type NonFunctionKeys<T> = {
  [K in keyof T]-?: T[K] extends (...args: never[]) => unknown ? never : K;
}[keyof T];

type SynElementProps<T extends HTMLElement> = Omit<
  Pick<T, Extract<WritableKeys<T>, NonFunctionKeys<T>>>,
  keyof HTMLElement | 'initialReflectedProperties'
>;

type KebabCase<T extends string> = T extends `${infer THead}${infer TTail}`
  ? TTail extends Uncapitalize<TTail>
    ? `${Lowercase<THead>}${KebabCase<TTail>}`
    : `${Lowercase<THead>}-${KebabCase<Uncapitalize<TTail>>}`
  : T;

type Camelize<T extends string> = T extends `${infer THead}-${infer TTail}`
  ? `${Capitalize<THead>}${Camelize<TTail>}`
  : Capitalize<T>;

type SynTemplateProps<TProps> = {
  [TPropName in keyof TProps as TPropName extends string
    ? TPropName | KebabCase<TPropName>
    : never]?: TProps[TPropName];
};

type SynListenerProps<TEvents> = {
  [TEventName in keyof TEvents as TEventName extends string
    ? `on${Camelize<TEventName>}` | `on${Capitalize<TEventName>}`
    : never]?: (event: TEvents[TEventName]) => unknown;
};

type VueEmit<TEvents> = EmitFn<{
  [TEventName in keyof TEvents]: (event: TEvents[TEventName]) => void;
}>;

type SynNativeHTMLProps = AllowedComponentProps & ComponentCustomProps & VNodeProps;

type SynVueElement<
  TElement extends HTMLElement,
  TEvents = Record<never, never>,
> = {
  new (): {
    $props: Partial<SynTemplateProps<SynElementProps<TElement>>> & SynNativeHTMLProps;
    $emit: VueEmit<TEvents>;
  };
};

type SynIntrinsicElement<
  TElement extends HTMLElement,
  TEvents = Record<never, never>,
> = HTMLAttributes & Partial<SynTemplateProps<SynElementProps<TElement>>> & SynListenerProps<TEvents>;

interface SynAccordionEvents {
  'syn-hide': SynHideEvent;
  'syn-show': SynShowEvent;
}

interface SynDetailsEvents {
  'syn-hide': SynHideEvent;
  'syn-show': SynShowEvent;
}

export type SynVueNativeElementAugmentation = true;

declare module 'vue' {
  interface GlobalComponents {
    'syn-accordion': SynVueElement<SynAccordion, SynAccordionEvents>;
    'syn-details': SynVueElement<SynDetails, SynDetailsEvents>;
  }

  interface IntrinsicElementAttributes {
    'syn-accordion': SynIntrinsicElement<SynAccordion, SynAccordionEvents>;
    'syn-details': SynIntrinsicElement<SynDetails, SynDetailsEvents>;
  }
}
