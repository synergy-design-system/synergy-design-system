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
  query?: string
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

  const combobox = option.closest('syn-combobox');
  // check if there is already a style for highlighting appended if not append one
  // This is unfortunately needed as it is not possible to do something like this in css:
  // .listbox__options ::slotted(syn-option mark)
  if (combobox && !combobox?.querySelector('#syn-highlight-style')) {
    const style = document.createElement('style');
    style.id = 'syn-highlight-style';

    style.textContent = `
      syn-option mark {
        background-color: transparent;
        color: var(--syn-color-neutral-950);
        font: var(--syn-body-medium-bold);
      }
      syn-option[aria-selected='true'] mark {
        color: var(--syn-color-neutral-0);
      }
    `;

    combobox.appendChild(style);
  }

  const clonedOption = option.cloneNode(true) as SynOption;
  const optionLabel = clonedOption.getTextLabel();
  const queryIndex = optionLabel.toLowerCase().indexOf(query.toLowerCase());
  const indexLabel = clonedOption.innerHTML.indexOf(optionLabel);

  const mark = document.createElement('mark');
  mark.textContent = optionLabel.slice(queryIndex, queryIndex + query.length);

  const exchangedText = optionLabel.replace(new RegExp(query, 'i'), mark.outerHTML);
  const previousContent = clonedOption.innerHTML.slice(0, indexLabel);
  const followingContent = clonedOption.innerHTML.slice(indexLabel + optionLabel.length);
  // eslint-disable-next-line no-param-reassign
  clonedOption.innerHTML = previousContent.concat(exchangedText, followingContent);
  return clonedOption;
};
