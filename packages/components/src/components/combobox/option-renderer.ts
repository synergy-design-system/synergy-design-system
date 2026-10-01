import { type TemplateResult } from 'lit';
import type SynOption from '../option/option.component.js';

/**
 * A type definition for a function that renders an option.
 *
 * @param option - The option to be rendered.
 * @param query - The current query string used for filtering options.
 * @returns - The changed option to render
 */
export type OptionRenderer = (
  option: SynOption,
  query?: string,
) => TemplateResult | string | HTMLElement;

/**
 * The default option renderer, which does not change the option.
 */
export const defaultOptionRenderer: OptionRenderer = (option: SynOption) => option;

/**
 * A function that highlights the query string with a mark element in the option.
 */
export const highlightOptionRenderer: OptionRenderer = (option: SynOption, query: string) => {
  if (!query) {
    return option;
  }

  const clonedOption = option.cloneNode(true) as SynOption;
  const optionLabel = clonedOption.getTextLabel();
  // copy the "selected" property value, as it is not copied by cloneNode
  clonedOption.selected = option.selected;

  const queryIndex = optionLabel.toLowerCase().indexOf(query.toLowerCase());
  const indexLabel = clonedOption.innerHTML.indexOf(optionLabel);

  // Bail out if there is nothing to highlight or the label is not part of the markup verbatim,
  // e.g. because the option already contains highlighting markup. Slicing with a negative index
  // would rip the existing markup apart.
  if (queryIndex < 0 || indexLabel < 0) {
    return clonedOption;
  }

  const mark = document.createElement('mark');
  mark.textContent = optionLabel.slice(queryIndex, queryIndex + query.length);
  mark.classList.add('syn-highlight-style');

  // Use slicing instead of String.replace, as the query may contain regular expression
  // or replacement pattern characters
  const exchangedText = optionLabel.slice(0, queryIndex)
    .concat(mark.outerHTML, optionLabel.slice(queryIndex + query.length));
  const previousContent = clonedOption.innerHTML.slice(0, indexLabel);
  const followingContent = clonedOption.innerHTML.slice(indexLabel + optionLabel.length);

  clonedOption.innerHTML = previousContent.concat(exchangedText, followingContent);
  return clonedOption;
};

/**
 * The predefined option renderers that may be used via their name for the combobox `getOption` property.
 */
export const optionRenderers = {
  default: defaultOptionRenderer,
  highlight: highlightOptionRenderer,
} as const satisfies Record<string, OptionRenderer>;

export type OptionRendererName = keyof typeof optionRenderers;
