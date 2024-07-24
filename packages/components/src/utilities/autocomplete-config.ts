/* eslint-disable no-param-reassign */
import '../components/popup/popup.js';

/**
 * This function is a helper to quickly setup autocomplete.js for Synergy components.
 * Besides some needed defaults it adds additional styles and event listeners.
 * @param selector - The selector to get the input element from the ShadowDOM.
 * @returns The configuration object for autocomplete.js.
 */
export function setupAutocomplete<T = HTMLUnknownElement>(
  selector: T | string,
  { setValueOnSelection, scrollSelectionIntoView } = {
    scrollSelectionIntoView: true,
    setValueOnSelection: true,
  },
) {
  const getInputFromSelector = () => (typeof selector === 'string'
    ? document.querySelector(selector)
    : selector);

  // @ts-expect-error - We expect the input to be found
  const synInput: HTMLInputElement = !selector
    ? document.querySelector('#autoComplete')
    : getInputFromSelector();

  const input = synInput.shadowRoot!.querySelector('input')!;

  /* Helper to use PostCSS and Syntax highlighting */
  const css = (string: TemplateStringsArray) => string[0];

  /** Setup elements and styles for autocomplete.js */
  input.addEventListener('init', () => {
    // autoComplete.js adds not the right aria-autocomplete on the input.
    // It adds 'both' which is not correct for our autocomplete use cases
    input.setAttribute('aria-autocomplete', 'list');

    // Check if initialization was already done and skip if it's the case
    if (synInput.shadowRoot?.querySelector('syn-popup.syn-autocomplete-popup')) {
      return;
    }

    const ul = synInput.shadowRoot?.querySelector('ul');
    ul?.setAttribute('part', 'listbox');
    const popup = document.createElement('syn-popup');
    popup.classList.add('syn-autocomplete-popup');
    popup.appendChild(ul!);
    synInput.shadowRoot?.appendChild(popup);
    popup?.setAttribute('exportparts', 'popup');

    if (popup) {
      popup.active = false;
      popup.autoSize = 'vertical';
      popup.autoSizePadding = 16;
      popup.placement = 'bottom-start';
      popup.anchor = synInput!;
      popup.sync = 'width';
    }
    const styles = css`
      syn-popup::part(popup) {
        background-color: var(--syn-panel-background-color);
        border: solid var(--syn-panel-border-width) var(--syn-panel-border-color);
        border-radius: var(--syn-border-radius-none);
        box-shadow: var(--syn-shadow-medium);
        overflow-y: auto;
        z-index: var(--syn-z-index-dropdown);
      }

      syn-popup ul {
        margin-block: 0;
        padding-block: var(--syn-spacing-x-small);
        padding-inline: 0;
      }

      syn-popup li {
        list-style-type: '';
      }

      /* This recreates the styles of syn-option if the element doesn't contain a syn-option */
      syn-popup li:not(:has(syn-option)) {
        color: var(--syn-color-neutral-950);
        cursor: pointer;
        font: var(--syn-body-medium-regular);
        min-height: 48px;
        padding: var(--syn-spacing-small) var(--syn-spacing-medium) var(--syn-spacing-small) calc(var(--syn-spacing-2x-large) + var(--syn-spacing-2x-small));
      }

      syn-popup li:not(:has(syn-option)):not([aria-selected='true']):hover {
        background-color: var(--syn-color-neutral-100);
      }

      syn-popup li mark {
        background-color: transparent;
        color: var(--syn-color-neutral-950);
        font: var(--syn-body-medium-bold);
      }
      
      syn-popup li[aria-selected='true'] mark {
        color: var(--syn-color-neutral-0);
      }

      syn-popup li[aria-selected='true'] {
        background-color: var(--syn-color-primary-600);
        color: var(--syn-color-neutral-0);
      }
    `;

    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(styles);
    synInput.shadowRoot!.adoptedStyleSheets = [
      ...synInput.shadowRoot!.adoptedStyleSheets,
      styleSheet,
    ];
  });

  if (setValueOnSelection) {
    /** Bind the value to `syn-input` */
    input.addEventListener('selection', (event: CustomEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      synInput.value = event?.detail?.selection.value as string;
    });
  }

  /** Open and close events to open popup and add styles to the input */
  input.addEventListener('open', () => {
    synInput.shadowRoot?.querySelector('syn-popup')?.setAttribute('active', 'true');
  });

  input.addEventListener('close', () => {
    synInput.shadowRoot?.querySelector('syn-popup')?.removeAttribute('active');
  });

  /** Selected elements should also be in view */
  if (scrollSelectionIntoView) {
    input.addEventListener('navigate', () => {
      // get element which has currently aria-selected
      const selected = synInput.shadowRoot!.querySelector('[aria-selected="true"]');
      selected?.scrollIntoView({ block: 'nearest' });
    });
  }

  return {
    config: {
      resultsList: {
        tag: 'ul',
      },
      // For correct handling we need the input element inside the ShadowDOM
      // Because of A11y this leads to the fact, that we need to push the popup into the ShadowDOM
      // as well. Unfortunately this hinders people to style things just from outside with their
      // own stylesheets. Experiments using resultsList.destination as destination and the whole
      // syn-input as selector failed. Maybe there could be a fix in the future for that
      selector: () => input,
      wrapper: false,
    },
  };
}

export function setupAutocompleteNew<T = HTMLUnknownElement>(
  selector: T | string,
  data: Array<{ value: string, label: string }>,
  { setValueOnSelection, scrollSelectionIntoView } = {
    scrollSelectionIntoView: true,
    setValueOnSelection: true,
  },
) {
  const getInputFromSelector = () => (typeof selector === 'string'
    ? document.querySelector(selector)
    : selector);

  // @ts-expect-error - We expect the input to be found
  const synInput: HTMLInputElement = !selector
    ? document.querySelector('#autoComplete')
    : getInputFromSelector();

  const input = synInput.shadowRoot!.querySelector('input')!;

  /* Helper to use PostCSS and Syntax highlighting */
  const css = (string: TemplateStringsArray) => string[0];

  // Check if initialization was already done and skip if it's the case
  if (synInput.shadowRoot?.querySelector('syn-popup.syn-autocomplete-popup')) {
    return;
  }

  /** Setup elements and styles */
  const div = document.createElement('div');
  div.classList.add('syn-autocomplete-list');
  const popup = document.createElement('syn-popup');
  popup.appendChild(div);
  popup.classList.add('syn-autocomplete-popup');
  synInput.shadowRoot?.appendChild(popup);
  popup?.setAttribute('exportparts', 'popup');

  if (popup) {
    popup.active = false;
    popup.autoSize = 'vertical';
    popup.autoSizePadding = 16;
    popup.placement = 'bottom-start';
    popup.anchor = synInput!;
    popup.sync = 'width';
  }
  const styles = css`
      syn-popup::part(popup) {
        background-color: var(--syn-panel-background-color);
        border: solid var(--syn-panel-border-width) var(--syn-panel-border-color);
        border-radius: var(--syn-border-radius-none);
        box-shadow: var(--syn-shadow-medium);
        overflow-y: auto;
        z-index: var(--syn-z-index-dropdown);
      }

      syn-popup > .syn-autocomplete-list {
        margin-block: 0;
        padding-block: var(--syn-spacing-x-small);
        padding-inline: 0;
      }

      /* This recreates the styles of syn-option if the element doesn't contain a syn-option */
      syn-popup .syn-autocomplete-list > div {
        color: var(--syn-color-neutral-950);
        cursor: pointer;
        font: var(--syn-body-medium-regular);
        min-height: 48px;
        padding: var(--syn-spacing-small) var(--syn-spacing-medium) var(--syn-spacing-small) calc(var(--syn-spacing-2x-large) + var(--syn-spacing-2x-small));
      }

      syn-popup .syn-autocomplete-list > div:not([aria-selected='true']):hover {
        background-color: var(--syn-color-neutral-100);
      }

      syn-popup li mark {
        background-color: transparent;
        color: var(--syn-color-neutral-950);
        font: var(--syn-body-medium-bold);
      }
      
      syn-popup .syn-autocomplete-list > div[aria-selected='true'] mark {
        color: var(--syn-color-neutral-0);
        color: green;
      }

      syn-popup .syn-autocomplete-list > div[aria-selected='true'] {
        background-color: var(--syn-color-primary-600);
        color: var(--syn-color-neutral-0);
      }
    `;

  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(styles);
  synInput.shadowRoot!.adoptedStyleSheets = [
    ...synInput.shadowRoot!.adoptedStyleSheets,
    styleSheet,
  ];

  console.log(setValueOnSelection, scrollSelectionIntoView);

  // if (setValueOnSelection) {
  //   /** Bind the value to `syn-input` */
  //   input.addEventListener('selection', (event: CustomEvent) => {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     synInput.value = event?.detail?.selection.value as string;
  //   });
  // }

  // /** Open and close events to open popup and add styles to the input */
  // input.addEventListener('open', () => {
  //   synInput.shadowRoot?.querySelector('syn-popup')?.setAttribute('active', 'true');
  // });

  // input.addEventListener('close', () => {
  //   synInput.shadowRoot?.querySelector('syn-popup')?.removeAttribute('active');
  // });

  // /** Selected elements should also be in view */
  // if (scrollSelectionIntoView) {
  //   input.addEventListener('navigate', () => {
  //     // get element which has currently aria-selected
  //     const selected = synInput.shadowRoot!.querySelector('[aria-selected="true"]');
  //     selected?.scrollIntoView({ block: 'nearest' });
  //   });
  // }

  // input.addEventListener('blur', () => {
  //   console.log('BLUUUUR');
  // });
  // input.addEventListener('focus', () => {
  //   console.log('FOOOOOCUS');
  // });
  // eslint-disable-next-line consistent-return
  return {
    config: {
      // For correct handling we need the input element inside the ShadowDOM
      // Because of A11y this leads to the fact, that we need to push the popup into the ShadowDOM
      // as well. Unfortunately this hinders people to style things just from outside with their
      // own stylesheets. Experiments using resultsList.destination as destination and the whole
      // syn-input as selector failed. Maybe there could be a fix in the future for that
      container: div,
      input,
      onSelect: (item: { value: string, label: string }) => {
        synInput.value = item.label;
      },
      fetch: (text: string, update: (items: unknown) => void) => {
        const suggestions = data.filter(n => n.label.toLowerCase().startsWith(text));
        update(suggestions);
      },
      click: () => {
        popup.active = true;
      },
      customize: (_input: HTMLInputElement, _inputRect: DOMRect, container: HTMLDivElement) => {
        container.style.position = '';
        container.style.width = '';
        container.style.height = '';
      },
      minLength: 1,
    },
  };
}
