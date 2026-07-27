import fs from 'fs';
import path from 'path';
import { createHeader, job } from '../shared.js';

const headerComment = createHeader('vue');

const source = `${headerComment}
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

type KebabCase<T extends string> = T extends \`\${infer THead}\${infer TTail}\`
  ? TTail extends Uncapitalize<TTail>
    ? \`\${Lowercase<THead>}\${KebabCase<TTail>}\`
    : \`\${Lowercase<THead>}-\${KebabCase<Uncapitalize<TTail>>}\`
  : T;

type Camelize<T extends string> = T extends \`\${infer THead}-\${infer TTail}\`
  ? \`\${Capitalize<THead>}\${Camelize<TTail>}\`
  : Capitalize<T>;

export type SynElementProps<T extends HTMLElement> = Omit<
  Pick<T, Extract<WritableKeys<T>, NonFunctionKeys<T>>>,
  keyof HTMLElement | 'initialReflectedProperties'
>;

export type SynTemplateProps<TProps> = {
  [TPropName in keyof TProps as TPropName extends string
    ? TPropName | KebabCase<TPropName>
    : never]?: TProps[TPropName];
};

export type SynEventTuple = [string, unknown];

export type SynEventMap<TEvents extends SynEventTuple[]> = {
  [TEventTuple in TEvents[number] as TEventTuple[0] extends string
  ? \`on\${Camelize<TEventTuple[0]>}\` | \`on\${Capitalize<TEventTuple[0]>}\`
    : never]?: (event: TEventTuple[1]) => unknown;
};

export type VueEmit<TEvents extends SynEventTuple[]> = EmitFn<{
  [TEventTuple in TEvents[number] as TEventTuple[0]]: (event: TEventTuple[1]) => void;
}>;

export type SynNativeHTMLProps = AllowedComponentProps & ComponentCustomProps & VNodeProps;

export type SynVueElement<
  TElement extends HTMLElement,
  TEvents extends SynEventTuple[] = [],
> = {
  new (): {
    $props: Partial<SynTemplateProps<SynElementProps<TElement>>> & SynNativeHTMLProps;
    $emit: VueEmit<TEvents>;
  };
};

export type SynIntrinsicElement<
  TElement extends HTMLElement,
  TEvents extends SynEventTuple[] = [],
> = HTMLAttributes & Partial<SynTemplateProps<SynElementProps<TElement>>> & SynEventMap<TEvents>;
`;

export const runCreateTypeCore = job('Vue: Creating native type core...', async (outDir) => {
  const outFile = path.join(outDir, 'core.ts');
  fs.writeFileSync(outFile, `${source}\n`, 'utf8');
});
