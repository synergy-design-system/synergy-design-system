/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { animateTo, stopAnimations } from '../../internal/animate.js';
import { FormControlController } from '../../internal/form.js';
import { getAnimation, setDefaultAnimation } from '../../utilities/animation-registry.js';
import { HasSlotController } from '../../internal/slot.js';
import { LocalizeController } from '../../utilities/localize.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import formControlCustomStyles from '../../styles/form-control.custom.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIcon from '../icon/icon.component.js';
import SynPopup from '../popup/popup.component.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import SynOption from '../option/option.component.js';
import type SynOptGroup from '../optgroup/optgroup.js';
import SynTag from '../tag/tag.component.js';
import styles from './combobox.styles.js';
import customStyles from './combobox.custom.styles.js';
import {
  checkValueBelongsToOption,
  createOptionFromDifferentTypes, filterOnlyOptgroups, getAllOptions, getAssignedElementsForSlot,
  getValueFromOption, getValuesFromOptions, isAllowedValue, normalizeString,
} from './utils.js';
import { scrollIntoView } from '../../internal/scroll.js';
import { type OptionRenderer, defaultOptionRenderer } from './option-renderer.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';
import type { SynRemoveEvent } from '../../events/events.js';
import { compareValues } from '../select/utility.js';

/**
 * @summary A combobox component that combines the functionality of a text input with a dropdown listbox,
 * allowing users to either select from predefined options or enter custom values (when not restricted).
 *
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-combobox--docs
 * @status stable
 *
 * @dependency syn-icon
 * @dependency syn-popup
 * @dependency syn-tag
 *
 * @slot - The listbox options. Must be `<syn-option>` elements.
 *    You can use `<syn-optgroup>`'s to group items visually.
 * @slot label - The combobox's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot suffix - Used to append a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed.
 *    Rotates on open and close.
 * @slot help-text - Text that describes how to use the combobox.
 *    Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-change - Emitted when the control's value changes.
 * @event syn-clear - Emitted when the control's value is cleared.
 * @event syn-input - Emitted when the control receives input.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-show - Emitted when the combobox's menu opens.
 * @event syn-after-show - Emitted after the combobox's menu opens and all animations are complete.
 * @event syn-hide - Emitted when the combobox's menu closes.
 * @event syn-after-hide - Emitted after the combobox's menu closes and all animations are complete.
 * @event syn-invalid - Emitted when the form control has been checked for validity
 *    and its constraints aren't satisfied.
 * @event syn-error - Emitted when the combobox menu fails to open.
 *
 * @csspart form-control - The form control that wraps the label, combobox, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The combobox's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart combobox - The container that wraps the prefix, combobox, clear icon, and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the selected option's label,
 *     an `<input>` element.
 * @csspart listbox - The listbox container where the options are slotted
 *   and the filtered options list exists.
 * @csspart filtered-listbox - The container that wraps the filtered options.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 * @csspart popup - The popup's exported `popup` part.
 * Use this to target the tooltip's popup container.
 * @csspart no-results - The container that wraps the "no results" message.
 * @csspart tags - The container that houses option tags when `multiple` is used.
 * @csspart tag - The individual tags that represent each selected option in `multiple`.
 * @csspart tag__base - The tag's base part.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 *
 * @animation combobox.show - The animation to use when showing the combobox.
 * @animation combobox.hide - The animation to use when hiding the combobox.
 */
@enableDefaultSettings('SynCombobox')
export default class SynCombobox extends SynergyElement implements SynergyFormControl {
  static styles: CSSResultGroup = [
    componentStyles,
    formControlStyles,
    styles,
    formControlCustomStyles,
    customStyles,
  ];

  static dependencies = {
    'syn-icon': SynIcon,
    'syn-popup': SynPopup,
    'syn-tag': SynTag,
  };

  private readonly formControlController = new FormControlController(this, {
    assumeInteractionOn: ['syn-blur', 'syn-input'],
  });

  private readonly hasSlotController = new HasSlotController(this, 'help-text', 'label');

  private readonly localize = new LocalizeController(this);

  private closeWatcher: CloseWatcher | null;

  /**
   * Cache of the last syn-options that were selected by user interaction (click or keyboard navigation).
   * Used to track user selections and maintain selection state during value changes.
   */
  private lastOptions: SynOption[] = [];

  private isInitialized: boolean = false;

  /** 
   * Flag to prevent infinite loops when the option renderer programmatically updates options.
   * Set to true during option rendering to ignore slot change events triggered by our own updates.
   */
  private isOptionRendererTriggered: boolean = false;

  private resizeObserver: ResizeObserver;

  private mutationObserver: MutationObserver;

  @query('.combobox') popup: SynPopup;

  @query('.combobox__inputs') combobox: HTMLSlotElement;

  @query('.combobox__display-input') displayInput: HTMLInputElement;

  @query('.combobox__value-input') valueInput: HTMLInputElement;

  @query('.combobox__listbox') listbox: HTMLSlotElement;

  @query('slot:not([name])') private defaultSlot: HTMLSlotElement;

  @query('.combobox__tags') tagContainer: HTMLDivElement;

  @state() private hasFocus = false;

  @state() private isUserInput = false;

  @state() displayLabel = '';

  @state() selectedOptions: SynOption[] = [];

  @state() numberFilteredOptions = 0;

  @state() cachedOptions: SynOption[] = [];

  @state() private valueHasChanged: boolean = false;

  @state() private hideOptions = false;

  /** The name of the combobox, submitted as a name/value pair with form data. */
  @property() name = '';

  private _value: string | string[] = '';

  get value() {
    return this._value;
  }

  /**
   * The current value of the combobox, submitted as a name/value pair with form data. When `multiple` is enabled, the
   * value attribute will be a  '|'-delimited list of values based on the options selected, and the value property will
   * be an array. **For this reason, values must not contain spaces.**
   */
  @state()
  set value(val: string | string[]) {
    if (this.multiple) {
      if (!Array.isArray(val)) {
        val = typeof val === 'string' ? val.split(this.delimiter) : [val].filter(isAllowedValue);
      }
    } else {
      val = Array.isArray(val) ? val.join(this.delimiter) : val;
    }

    if (compareValues(this._value, val)) {
      return;
    }

    this.valueHasChanged = true;
    this._value = val;
  }

  /** The default value of the form control. Primarily used for resetting the form control. */
  @property({ attribute: 'value' }) defaultValue: string | string[] = '';

  /** The combobox's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Placeholder text to show as a hint when the combobox is empty. */
  @property() placeholder = '';

  /** Disables the combobox control. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Adds a clear button when the combobox is not empty. */
  @property({ type: Boolean }) clearable = false;

  /**
   * Indicates whether or not the combobox is open.
   * You can toggle this attribute to show and hide the listbox, or you can use the `show()`
   * and `hide()` methods and this attribute will reflect the combobox's open state.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /**
   * Enable this option to prevent the listbox from being clipped,
   * when the component is placed inside a container with `overflow: auto|scroll`.
   * Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
   * @deprecated This property is deprecated and will be removed in the next major version.
   */
  @property({ type: Boolean }) hoist = false;

  /** The combobox's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /**
   * The preferred placement of the combobox's menu.
   * Note that the actual placement may vary as needed to keep the listbox inside of the viewport.
   */
  @property({ reflect: true }) placement: 'top' | 'bottom' = 'bottom';

  /** The combobox's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element.
   * This attribute allows you to place the form control outside of a form and associate it
   * with the form that has this `id`.
   * The form must be in the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** The combobox's required attribute. */
  @property({ reflect: true, type: Boolean }) required = false;

  /**
   * When set to `true`, restricts the combobox to only allow selection from the available options.
   * Users will not be able to enter custom values that are not present in the list.
   * This will always be true, if `multiple` is active.
   */
  @property({ reflect: true, type: Boolean }) restricted = false;

  /**
   * Allows more than one option to be selected.
   * If `multiple`is set, the combobox will always be `restricted` to the available options
   * */
  @property({ reflect: true, type: Boolean }) multiple = false;

  /**
   * A function that customizes the rendered option. The first argument is the option, the second
   * is the query string, which is typed into the combobox.
   * The function should return either a Lit TemplateResult or a string containing trusted HTML
   * to render in the shown list of filtered options.
   * If the query string should be highlighted use the `highlightOptionRenderer` function.
   */
  @property() getOption: OptionRenderer = defaultOptionRenderer;

  /**
   * A function used to filter options in the combobox component.
   * The default filter method is a case- and diacritic-insensitive string comparison.
   *
   * @param option - The option to be filtered.
   * @param queryString - The query string used for filtering.
   * @returns A boolean indicating whether the option should be included in the filtered results.
   */
  // eslint-disable-next-line class-methods-use-this
  @property() filter: (option: SynOption, queryString: string) => boolean = (option, queryStr) => {
    let content = option?.textContent || '';
    if (option instanceof SynOption) {
      content = option.getTextLabel();
    }
    const normalizedOption = normalizeString(content);
    const normalizedQuery = normalizeString(queryStr);

    if (normalizedOption.includes(normalizedQuery)) {
      return true;
    }

    return option?.value === queryStr;
  };

  /**
   * The delimiter to use when setting the value when `multiple` is enabled.
   * The default is a space, but you can set it to a comma or other character.
   * @example <syn-combobox delimiter="+" value="option-1+option-2"></syn-combobox>
   */
  @property() delimiter = '|';

  /**
   * The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to
   * indicate the number of additional items that are selected. Set to 0 to remove the limit.
   */
  @property({ attribute: 'max-options-visible', type: Number }) maxOptionsVisible = 3;

  /**
   * A function that customizes the tags to be rendered when `multiple` is true. The first argument is the option, the second
   * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at
   * the specified value.
   */
  @property() getTag: (option: SynOption, index: number) => TemplateResult | string | HTMLElement = option => html`
    <syn-tag
      part="tag"
      exportparts="
            base:tag__base,
            content:tag__content,
            remove-button:tag__remove-button,
            remove-button__base:tag__remove-button__base
          "
      size=${this.size}
      removable
      @syn-remove=${(event: SynRemoveEvent) => this.handleTagRemove(event, option)}
    >
      ${option.getTextLabel()}
    </syn-tag>
  `;

  /** Gets the validity state object */
  get validity() {
    return this.valueInput.validity;
  }

  /** Gets the validation message */
  get validationMessage() {
    return this.valueInput.validationMessage;
  }

  private calculateTagMaxWidth = (entries: ResizeObserverEntry[]) => {
    const input = entries.at(0);
    if (!input || !this.tagContainer) return;

    const inputWidth = input.contentRect.width;
    const tagsWidth = this.tagContainer.getBoundingClientRect().width;

    // The min-width of the input is 48px, this should stay available for the input
    // The min-width of the tags is 85px, so we should not go below that
    const availableTagSpace = Math.max(85, tagsWidth + inputWidth - 48);

    this.tagContainer.style.setProperty('--syn-select-tag-max-width', `${availableTagSpace}px`);
  };

  private enableResizeObserver() {
    if (!this.multiple) return;

    if (!this.resizeObserver) {
      this.resizeObserver = new ResizeObserver(this.calculateTagMaxWidth);
    }
    // We use the `displayInput`, as the observer is fired for the initial state if someone is selecting an option
    // and when the combobox size changes e.g. via window resize
    this.resizeObserver.observe(this.displayInput);
  }

  connectedCallback() {
    super.connectedCallback();

    this.mutationObserver = new MutationObserver((entries) => {
      // Only process attribute mutations on SynOption instances for the 'value' attribute. This is needed for changing of "delimiter"
      const hasRelevantValueChange = entries.some(entry => {
        // Check if the target is a SynOption instance
        if (!(entry.target instanceof SynOption)) {
          return false;
        }

        // Check if it's an attribute mutation for the 'value' attribute
        if (entry.type !== 'attributes' || entry.attributeName !== 'value') {
          return false;
        }

        // Check if the value actually changed and is not nullish
        const currentValue = (entry.target as HTMLElement).getAttribute('value');
        return entry.oldValue !== currentValue && !!currentValue;
      });

      if (hasRelevantValueChange) {
        this.handleSlotContentChange();
      }
    });

    this.mutationObserver.observe(this, {
      attributeFilter: ['value'],
      attributeOldValue: true,
      attributes: true,
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      // #813 needed to catch initial value via property binding
      this.handleSlotContentChange();
    });

    // Because this is a form control, it shouldn't be opened initially
    this.open = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  firstUpdated() {
    this.isInitialized = true;
    this.formControlController.updateValidity();
  }

  protected updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);
    if (changedProperties.has('multiple')) {
      if (!this.multiple) {
        this.resizeObserver?.disconnect();
      } else {
        this.enableResizeObserver();
      }
    }
  }

  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    // Check for defaultValue if it is not undefined, null, empty string or empty array
    const isDefaultValueEmpty = this.defaultValue == null
      || this.defaultValue === ''
      || (Array.isArray(this.defaultValue) && this.defaultValue.length === 0);

    if (changedProperties.has('value') && isDefaultValueEmpty && this.value && !this.isUserInput) {
      // If the value was set initially via property binding instead of attribute, we need to set the defaultValue manually
      // to be able to reset forms and the dynamic loading of options are working correctly.
      this.defaultValue = Array.isArray(this.value) ? this.value.join(this.delimiter) : this.value;
      this.valueHasChanged = false;
    }

    // This is needed, as the result otherwise is different on the attribute order of "multiple", "delimiter" and "value".
    if (!this.isInitialized && changedProperties.has('value') && this.value !== undefined && changedProperties.has('multiple') && this.multiple) {
      if (!Array.isArray(this.defaultValue)) {
        const cachedValueHasChanged = this.valueHasChanged;
        this.value = typeof this.defaultValue === 'string' ? this.defaultValue.split(this.delimiter) : [this.defaultValue].filter(isAllowedValue);

        // Set it back to false since this isn't an interaction.
        this.valueHasChanged = cachedValueHasChanged;
      }
    }
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);

    /** This is a backwards compatibility call. In a new major version we should make a clean separation between "value" the attribute mapping to "defaultValue" property and "value" the property not reflecting. */
    if (name === 'value') {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;

      // Set it back to false since this isn't an interaction.
      this.valueHasChanged = cachedValueHasChanged;
    }
  }

  protected get tags() {
    return this.selectedOptions.map((option, index) => {
      if (index < this.maxOptionsVisible || this.maxOptionsVisible <= 0) {
        const tag = this.getTag(option, index);
        // Wrap so we can handle the remove
        return html`<div @syn-remove=${(e: SynRemoveEvent) => this.handleTagRemove(e, option)}>
          ${typeof tag === 'string' ? unsafeHTML(tag) : tag}
        </div>`;
      } if (index === this.maxOptionsVisible) {
        // Hit tag limit
        return html`<syn-tag size=${this.size}>+${this.selectedOptions.length - index}</syn-tag>`;
      }
      return html``;
    });
  }

  private addOpenListeners() {
    //
    // Listen on the root node instead of the document in case the elements are inside a shadow root
    //
    // https://github.com/synergy-design-system/synergy/issues/1763
    //
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);

    // If the component is rendered in a shadow root,
    // we need to attach the focusin listener there too
    if (this.getRootNode() !== document) {
      this.getRootNode().addEventListener('focusin', this.handleDocumentFocusIn);
    }

    if ('CloseWatcher' in window) {
      this.closeWatcher?.destroy();
      this.closeWatcher = new CloseWatcher();
      this.closeWatcher.onclose = () => {
        if (this.open) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      };
    }
  }

  private removeOpenListeners() {
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);

    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener('focusin', this.handleDocumentFocusIn);
    }

    this.closeWatcher?.destroy();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.emit('syn-focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }

  private handleDocumentFocusIn = (event: KeyboardEvent) => {
    // Close when focusing out of the combobox
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
    }
  };

  /* eslint-disable @typescript-eslint/no-floating-promises */
  // eslint-disable-next-line complexity
  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    const isClearButton = target.closest('.combobox__clear') !== null;

    if (isClearButton) {
      return;
    }

    // Close when pressing escape and open / clear input if not open
    if (event.key === 'Escape') {
      if (this.open && !this.closeWatcher) {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      } else if (!this.open) {
        this.clearCombobox();
      }
    }

    // Handle enter - either select option or submit form
    if (event.key === 'Enter') {
      const currentOption = this.getCurrentOption();

      // Pressing enter when focused on an input should submit the form like a native input, but
      // we wait a tick before submitting to allow users to cancel the keydown event if they need to
      const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
      if (!this.open && !hasModifier) {
        setTimeout(() => {
          if (!event.defaultPrevented) {
            this.formControlController.submit();
          }
        });
        return;
      }

      if (!this.open || (currentOption && currentOption.disabled)) {
        return;
      }

      // Update the value based on the current selection and close it
      if (currentOption) {
        this.valueHasChanged = true;
        const oldValue = this.lastOptions ? getValuesFromOptions(this.lastOptions) : [];

        if (this.multiple) {
          this.toggleOptionSelection(currentOption);
        } else {
          this.setSelectedOptions(currentOption);
        }

        this.selectionChanged();

        const value = Array.isArray(this.value) ? this.value : [this.value];

        // Reset the lastOptions if all options were removed in multiple mode
        if (this.multiple && value.length === 0) {
          this.lastOptions = [];
        }

        if (!compareValues(oldValue, value)) {
          // Emit after updating
          this.updateComplete.then(() => {
            this.emit('syn-input');
            this.emit('syn-change');
          });
        }
      }

      if (!this.multiple) {
        this.hide();
      }
      this.displayInput.focus({ preventScroll: true });
      return;
    }

    // Navigate options
    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      // Prevent scrolling
      event.preventDefault();
      event.stopPropagation();
      // Open it
      if (!this.open) {
        this.show();
      }

      this.selectNextOption(event.key === 'ArrowDown');
    }

    // Move cursor
    if (['Home', 'End'].includes(event.key)) {
      // Prevent scrolling
      event.preventDefault();
      event.stopPropagation();
      if (event.key === 'Home') {
        this.displayInput.setSelectionRange(0, 0);
      } else if (event.key === 'End') {
        this.displayInput.setSelectionRange(
          this.displayInput.value.length,
          this.displayInput.value.length,
        );
      }
    }
  };
  /* eslint-enable @typescript-eslint/no-floating-promises */

  private handleDocumentMouseDown = (event: MouseEvent) => {
    // Close when clicking outside of the combobox
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
    }
  };

  private handleLabelClick() {
    this.displayInput.focus();
  }

  private handleTagRemove(event: SynRemoveEvent, option: SynOption) {
    event.stopPropagation();

    this.valueHasChanged = true;

    if (!this.disabled) {
      this.toggleOptionSelection(option, false);
      this.selectionChanged();

      // Emit after updating
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updateComplete.then(() => {
        this.emit('syn-input');
        this.emit('syn-change');
      });
    }
  }

  private handleComboboxMouseDown(event: MouseEvent) {
    const path = event.composedPath();
    const isIconButton = path.some(el => el instanceof Element && el.tagName.toLowerCase() === 'syn-icon-button');

    // Ignore disabled controls and clicks on tags (remove buttons)
    if (this.disabled || isIconButton) {
      return;
    }

    const toggleListboxOpen = () => (this.open ? this.hide() : this.show());
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    toggleListboxOpen().then(() => {
      setTimeout(() => this.displayInput.focus({ preventScroll: true }));
    });
  }

  private handleComboboxKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      return;
    }

    this.handleDocumentKeyDown(event);
  }

  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();
    this.clearCombobox();
  }

  private clearCombobox() {
    this.valueHasChanged = true;

    if (this.value !== '') {
      this.value = '';
      this.displayInput.value = '';
      this.lastOptions = [];
      this.setSelectedOptions([]);
      this.selectionChanged();
      this.displayInput.focus({ preventScroll: true });

      // Emit after update
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updateComplete.then(() => {
        this.emit('syn-clear');
        this.emit('syn-input');
        this.emit('syn-change');
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private preventLoosingFocus(event: MouseEvent) {
    // Don't lose focus of the input or propagate events
    event.stopPropagation();
    event.preventDefault();
  }

  /* eslint-disable @typescript-eslint/no-floating-promises */
  private handleOptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('syn-option');
    const oldValue = this.lastOptions ? getValuesFromOptions(this.lastOptions) : [];
    if (option && !option.disabled) {
      this.valueHasChanged = true;
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }
      this.selectionChanged();

      // Set focus after updating so the value is announced by screen readers
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));

      const value = Array.isArray(this.value) ? this.value : [this.value];

      // Reset the lastOptions if all options were removed in multiple mode
      if (this.multiple && value.length === 0) {
        this.lastOptions = [];
      }

      if (!compareValues(oldValue, value)) {
        // Emit after updating
        this.updateComplete.then(() => {
          this.emit('syn-input');
          this.emit('syn-change');
        });
      }

      if (!this.multiple) {
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }
  /* eslint-enable @typescript-eslint/no-floating-promises */

  /**
   * Selects the following or previous option.
   *
   * @param isNext - A boolean indicating whether to select the following option (true)
   *                 or the previous option (false).
   */
  private selectNextOption(isNext: boolean) {
    const filteredOptions = this.getAllFilteredOptions();

    if (filteredOptions.length === 0) {
      return;
    }

    const currentOption = this.getCurrentOption();
    const currentIndex = filteredOptions.indexOf(currentOption!);
    let newIndex = Math.max(0, currentIndex);

    if (isNext) {
      const nextIndex = currentIndex + 1;
      newIndex = (nextIndex > filteredOptions.length - 1) ? 0 : nextIndex;
    } else {
      const previousIndex = currentIndex - 1;
      newIndex = previousIndex < 0 ? filteredOptions.length - 1 : previousIndex;
    }
    this.setCurrentOption(filteredOptions[newIndex]);
    scrollIntoView(this.getCurrentOption()!, this.listbox, 'vertical', 'auto');
  }

  // Toggles an option's selected state
  // eslint-disable-next-line class-methods-use-this
  private toggleOptionSelection(option: SynOption, force?: boolean) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }
  }

  // Sets the selected option(s)
  private setSelectedOptions(option: SynOption | SynOption[]) {
    const newSelectedOptions = Array.isArray(option) ? option : [option];

    const slottedOptions = this.getSlottedOptions();
    slottedOptions.forEach((opt) => {
      opt.selected = newSelectedOptions.some(
        selectedOpt => selectedOpt.id === opt.id,
      );
    });
  }

  private getAllFilteredOptions() {
    return this.getSlottedOptions().filter(option => !option.hidden);
  }

  private getCurrentOption() {
    return this.getAllFilteredOptions().find(option => option.current);
  }

  // Sets the current option, which is the option the user is currently interacting with
  // (e.g. via keyboard). Only one option may be "current" at a time.
  private setCurrentOption(option: SynOption | null) {
    const allOptions = this.getAllFilteredOptions();

    // Clear selection
    this.displayInput.removeAttribute('aria-activedescendant');

    allOptions.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.current = false;
      el.setAttribute('aria-selected', 'false');
    });

    // Select the target option
    if (option) {
      // eslint-disable-next-line no-param-reassign
      option.current = true;
      option.setAttribute('aria-selected', 'true');
      this.displayInput.setAttribute('aria-activedescendant', option.id);
    }
  }

  /**
   * Updates the component state after selection changes.
   *
   * This method synchronizes:
   * 1. The selectedOptions cache with currently selected options
   * 2. The component's value property (string or array)
   * 3. The display label shown in the input
   * 4. Form validation state
   *
   * **Validation Logic:**
   * - In restricted mode, invalid values trigger a reset to last valid state
   * - Multiple mode requires all values to correspond to existing options
   * - Single mode allows free text input when not restricted
   */
  // eslint-disable-next-line complexity
  private selectionChanged() {
    const options = this.getSlottedOptions();
    this.selectedOptions = options.filter(opt => opt.selected);
    let optionValue;

    // Keep a reference to the previous `valueHasChanged`. Changes made here don't count has changing the value.
    const cachedValueHasChanged = this.valueHasChanged;

    if (this.multiple) {
      this.value = this.selectedOptions.map(opt => String(getValueFromOption(opt)));
      if (this.value.length === 0 && this.selectedOptions.length !== 0) {
        this.valueHasChanged = cachedValueHasChanged;
        this.resetToLastValidValue();
        return;
      }
    } else {
      if (this.selectedOptions.length !== 0) {
        // This is only for non multiple
        optionValue = getValueFromOption(this.selectedOptions[0]);
      } else if (this.restricted && !this.isValidValue(this.displayInput.value) && this.displayInput.value !== '' && !this.isUserInput) {
        // if an invalid value was set via property binding for `restricted`comboboxes,
        // reset to last valid value
        this.resetToLastValidValue();
        this.valueHasChanged = cachedValueHasChanged;
        return;
      }
      this.value = optionValue ?? this.displayInput.value;
    }

    this.valueHasChanged = cachedValueHasChanged;

    // Update validity and display label
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateComplete.then(() => {
      this.displayLabel = this.multiple ? '' : this.selectedOptions[0]?.getTextLabel() ?? this.displayInput.value;
      this.formControlController.updateValidity();
    });
  }

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  @watch(['filter', 'getOption'], { waitUntilFirstUpdate: true })
  handlePropertiesChange() {
    this.createComboboxOptionsFromQuery(this.displayInput.value);
    if (this.open) {
      this.updateComplete.then(() => {
        this.open = this.multiple || this.restricted || this.numberFilteredOptions > 0;
      });
    }
  }

  @watch('disabled', { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Disabled form controls are always valid
    this.formControlController.setValidity(this.disabled);

    // Close the listbox when the control is disabled
    if (this.disabled) {
      this.open = false;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.handleOpenChange();
    }
  }

  @watch('delimiter')
  handleDelimiterChange() {
    this.getSlottedOptions().forEach(option => {
      option.delimiter = this.delimiter;
    });
  }

  @watch(['defaultValue', 'value', 'delimiter'], { waitUntilFirstUpdate: true })
  handleValueChange() {
    if (!this.valueHasChanged) {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;

      // Set it back to false since this isn't an interaction.
      this.valueHasChanged = cachedValueHasChanged;
    }

    this.updateSelectedOptionFromValue();
    this.setCurrentOption(null);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open && !this.disabled) {
      if (this.numberFilteredOptions === 0 && !this.restricted && !this.multiple) {
        // Don't open the listbox if there are no options and it is not restricted or multiple
        this.open = false;
        this.emit('syn-error');
        return;
      }

      // Show
      this.emit('syn-show');
      this.addOpenListeners();

      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;

      const { keyframes, options } = getAnimation(this, 'combobox.show', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);

      this.emit('syn-after-show');
      return;
    }

    this.setCurrentOption(null);
    this.displayInput.removeAttribute('aria-activedescendant');
    // Hide
    this.emit('syn-hide');
    this.removeOpenListeners();

    await stopAnimations(this);
    const { keyframes, options } = getAnimation(this, 'combobox.hide', { dir: this.localize.dir() });
    await animateTo(this.popup.popup, keyframes, options);
    this.listbox.hidden = true;
    this.popup.active = false;

    this.emit('syn-after-hide');
  }

  /**
   * Shows the listbox. If it is not possible to open the listbox, because there are no
   * appropriate filtered options, a syn-error is emitted and the listbox stays closed.
   */
  async show() {
    if (this.open || this.disabled) {
      this.open = false;
      return undefined;
    }

    this.open = true;
    return Promise.race([waitForEvent(this, 'syn-after-show'), waitForEvent(this, 'syn-error')]);
  }

  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled) {
      this.open = false;
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'syn-after-hide');
  }

  /**
   * Checks for validity but does not show a validation message.
   * Returns `true` when valid and `false` when invalid.
   */
  checkValidity() {
    return this.valueInput.checkValidity();
  }

  /** Gets the associated form, if one exists. */
  getForm(): HTMLFormElement | null {
    return this.formControlController.getForm();
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.valueInput.reportValidity();
  }

  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message: string) {
    this.valueInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }

  /** Sets focus on the control. */
  focus(options?: FocusOptions) {
    this.displayInput.focus(options);
  }

  /** Removes focus from the control. */
  blur() {
    this.displayInput.blur();
  }

  /**
   * Updates the visibility and rendering of options based on the current query string.
   *
   * This method performs several critical tasks:
   * 1. **Option Filtering**: Uses the `filter` function to determine which options should be visible
   * 2. **Custom Rendering**: Applies the `getOption` function to customize option appearance
   * 3. **Optgroup Management**: Shows/hides optgroups based on their visible children
   * 4. **Counts visible options**: Tracks the number of visible options for UI logic
   *
   * **Performance Considerations:**
   * - Uses cached options to avoid repeated DOM queries
   * - Prevents infinite loops during option updates with `isOptionRendererTriggered`
   *
   * @param queryString - The current user input to filter and highlight options with
   */
  /* eslint-disable no-param-reassign, @typescript-eslint/no-floating-promises */
  private createComboboxOptionsFromQuery(queryString: string) {
    this.numberFilteredOptions = 0;

    // Prevent slot change events during option updates to avoid infinite loops
    this.isOptionRendererTriggered = true;

    // This is needed for angular. For some reason the handleSlotContentChange is not triggered
    // initially and therefore the cachedOptions are not set.
    if (this.cachedOptions.length === 0) {
      this.cacheSlottedOptionsAndOptgroups();
    }

    // Update each syn-option based on the query string and custom getOption renderer
    this.getSlottedOptions()
      .forEach(option => {
        // Use the original cached option, to do changes on it
        const cachedOption = this.cachedOptions.find(o => o.id === option.id) || option;

        // Apply custom option rendering
        const optionResult = this.getOption(cachedOption, queryString);
        let updatedOption = createOptionFromDifferentTypes(optionResult);

        // Fall back to original option if rendering fails
        if (!updatedOption) {
          updatedOption = cachedOption;
        }

        // Apply filtering logic to determine visibility
        const hideOption = !(this.filter(updatedOption, queryString) || queryString === '');
        updatedOption.hidden = hideOption;

        option.replaceWith(updatedOption);

        if (!hideOption) {
          this.numberFilteredOptions += 1;
        }
      });

    // Update optgroup visibility based on their children
    const visibleOptgroups = this.getSlottedOptGroups().filter(optgroup => {
      const options = getAllOptions(Array.from(optgroup.children) as HTMLElement[]).flat();
      const isVisible = options.some(option => !option.hidden);
      optgroup.hidden = !isVisible;
      return isVisible;
    });

    // Hide the divider of the first visible optgroup, as it can unfortunately not be hidden via css
    visibleOptgroups[0]?.style.setProperty('--display-divider', 'none');

    // Reset flag after updates are complete to re-enable slot change handling
    setTimeout(() => {
      this.isOptionRendererTriggered = false;
    });
  }
  /* eslint-enable no-param-reassign, @typescript-eslint/no-floating-promises */

  // eslint-disable-next-line complexity
  private async handleInput() {
    const inputValue = this.displayInput.value;
    const cachedLastOption = this.lastOptions;
    this.isUserInput = true;

    // Do the reset of the selected options before the value setting, as otherwise we are getting endless default slot triggering in safari
    if (!this.multiple) {
      this.selectedOptions = [];
    }

    if (this.multiple) {
      // In multiple mode, combine selected option values with current input
      const validValues = getValuesFromOptions(this.selectedOptions);
      this.value = [...validValues, inputValue];
    } else {
      // In single mode, replace value with current input
      this.value = inputValue;
    }

    await this.updateComplete;
    this.isUserInput = false;
    this.lastOptions = cachedLastOption;
    this.open = this.multiple || this.restricted || this.numberFilteredOptions > 0;

    this.formControlController.updateValidity();
    this.emit('syn-input');
  }

  /**
   * Checks if the value is available in the options list.
   * This is used to determine if the value is valid when the combobox is restricted.
   * @param value - The value to check for validity.
   * @returns `true` if the current value is available in the options list,
   * otherwise `false`.
   */
  private isValidValue(value: string): boolean {
    const isValid = this.cachedOptions.some(
      option => checkValueBelongsToOption(value, option),
    );
    return isValid;
  }

  private getOptionsFromValue(): SynOption[] {
    // Use defaultValue only if the value has not been changed by the user
    const value = this.valueHasChanged ? this.value : this.defaultValue;
    // #845: if value is undefined return empty array
    const convertedValue = (Array.isArray(value) ? value : value == undefined ? [] : value.split(this.delimiter));
    return convertedValue.map(val => this.cachedOptions.find(option => checkValueBelongsToOption(val, option))).filter((opt) => opt !== undefined);
  }

  /**
   * Resets the value to the last valid value or to an empty string.
   */
  private resetToLastValidValue() {
    let label = '';
    let value: string[] = [];

    if (this.lastOptions.length !== 0) {
      value = getValuesFromOptions(this.lastOptions);

      if (!this.multiple) {
        label = this.lastOptions[0].getTextLabel();
      }
    }

    // Wait for the popup close animation to be finished before updating the value.
    // This is to prevent flickering of the listbox, as the value is potentially reset to empty
    // string and the whole options would be shown again.
    const popupAnimations = this.popup?.popup?.getAnimations?.() ?? [];
    const waitForAnimations = popupAnimations.length
      ? Promise.all(
        popupAnimations.map(animation => (animation.playState === 'finished'
          ? Promise.resolve()
          : new Promise<void>(resolve => { animation.addEventListener('finish', () => resolve(), { once: true }); }))),
      )
      : Promise.resolve();

    this.hideOptions = true;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    waitForAnimations.then(() => {
      // restore options after the animation
      this.hideOptions = false;
    });
    // Keep a reference to the previous `valueHasChanged`. Changes made here don't count has changing the value.
    const cachedValueHasChanged = this.valueHasChanged;
    this.value = value;
    this.displayInput.value = label;
    this.formControlController.updateValidity();
    this.valueHasChanged = cachedValueHasChanged;
  }

  // eslint-disable-next-line complexity
  private handleChange() {
    // Only update the value and emit the event, if the change event occurred by
    // the user typing something in and removing focus of the combobox
    const isSameSelection = (this.selectedOptions.length !== 0 && this.selectedOptions.length === this.getOptionsFromValue().length);
    const values = Array.isArray(this.value) ? this.value : this.value.split(this.delimiter);
    const allValuesValid = values.every(val => this.isValidValue(val));
    const isMultipleAndUserInput = this.multiple && isSameSelection && allValuesValid;
    const isNonMultipleAndUserInput = !this.multiple && this.selectedOptions.length > 0;
    if (isNonMultipleAndUserInput || isMultipleAndUserInput) {
      return;
    }

    // If the value is not valid, we need to reset the value to the last valid value
    if ((this.restricted || this.multiple) && !this.isValidValue(this.displayInput.value) && this.displayInput.value !== '') {
      this.resetToLastValidValue();
      return;
    }
    const options = this.getOptionsFromValue();

    this.setSelectedOptions(options);
    this.selectionChanged();
    this.lastOptions = [...options];
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateComplete.then(() => {
      // for some reason the displayInput is not updating the displayed values with the `displayLabel` change and we need to set it directly on the input
      if (this.multiple) {
        this.displayInput.value = this.displayLabel;
        // remove the query so all options are shown again
        this.createComboboxOptionsFromQuery('');
      }
      this.formControlController.updateValidity();
    });
    this.emit('syn-change');
  }

  private getSlottedOptions() {
    if (!this.defaultSlot) {
      return [];
    }
    return getAllOptions(getAssignedElementsForSlot(this.defaultSlot)).flat();
  }

  private getSlottedOptGroups(): SynOptGroup[] {
    return filterOnlyOptgroups(getAssignedElementsForSlot(this.defaultSlot));
  }

  /* eslint-disable no-param-reassign */
  private cacheSlottedOptionsAndOptgroups() {
    const slottedOptions = this.getSlottedOptions();
    const slottedOptgroups = this.getSlottedOptGroups();

    slottedOptions.forEach((option, index) => {
      option.id = option.id || `syn-combobox-option-${index}`;
    });

    slottedOptgroups.forEach((optgroup, index) => {
      optgroup.id = optgroup.id || `syn-combobox-optgroup-${index}`;
    });

    // Cache the slotted options
    this.cachedOptions = [...slottedOptions];
  }
  /* eslint-enable no-param-reassign */

  // eslint-disable-next-line complexity
  private updateSelectedOptionFromValue(): void {
    if (!this.isUserInput) {
      // check if the value has corresponding options via value or text content
      // for empty values use the text content, as then the values of the options are not set
      const options = this.getOptionsFromValue();

      if (options.length === 0) {
        // #845 if this.value is undefined set it to empty string, as otherwhise "undefined" is shown in the input
        this.displayInput.value = Array.isArray(this.value) ? this.value.join(', ') : this.value ?? '';
      } else {
        this.lastOptions = [...options];
      }

      this.setSelectedOptions(options);
      this.selectionChanged();
    }

    let queryString = '';
    if (this.multiple) {
      queryString = this.displayInput.value;
    } else {
      queryString = Array.isArray(this.value) ? this.value.join(', ') : this.value;
    }
    this.createComboboxOptionsFromQuery(queryString);
  }

  /**
   * Synchronizes the internal component state with changes to slotted options.
   *
   * This method is automatically triggered by:
   * - MutationObserver when option 'value' attributes change
   * - Initial component setup during connectedCallback (after timeout)
   * - Default slot changes (via handleDefaultSlotChange)
   * - Custom element registration completion for syn-option (deferred execution)
   *
   * The synchronization process:
   * 1. Waits for syn-option custom elements to be registered before processing
   * 2. Updates delimiter settings on all slotted options
   * 3. Refreshes the internal cache of options and optgroups
   * 4. Synchronizes selected options based on current component value
   * 5. Auto-opens listbox if component has focus, has value, and is currently closed
   *
   * This ensures the component's internal state stays consistent with the slotted
   * DOM content after options are added, removed, or their values change.
   *
   */
  private handleSlotContentChange() {
    // Rerun this handler when <syn-option> is registered
    if (!customElements.get('syn-option')) {
      customElements.whenDefined('syn-option').then(() => this.handleSlotContentChange());
      return;
    }

    this.handleDelimiterChange();
    this.cacheSlottedOptionsAndOptgroups();

    this.updateSelectedOptionFromValue();

    // Auto-open listbox for better UX when new options are added during interaction
    if (this.hasFocus && this.value.length > 0 && !this.open) {
      this.show();
    }
  }

  public handleDefaultSlotChange() {
    // Ignore slot changes triggered by our own option updates
    if (this.isOptionRendererTriggered) {
      return;
    }

    this.handleSlotContentChange();
  }

  /* eslint-disable @typescript-eslint/unbound-method */
  // eslint-disable-next-line complexity
  render() {
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && this.value.length > 0;
    const isPlaceholderVisible = this.placeholder && this.value.length === 0;
    const tagsVisible = this.multiple && this.selectedOptions.length > 0;

    return html`
      <div
        part="form-control"
        class=${classMap({
      'form-control': true,
      'form-control--has-help-text': hasHelpText,
      'form-control--has-label': hasLabel,
      'form-control--large': this.size === 'large',
      'form-control--medium': this.size === 'medium',
      'form-control--small': this.size === 'small',
    })}
      >
        <label
          id="label"
          part="form-control-label"
          class="form-control__label"
          aria-hidden=${hasLabel ? 'false' : 'true'}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <syn-popup
            class=${classMap({
      combobox: true,
      'combobox--bottom': this.placement === 'bottom',
      'combobox--disabled': this.disabled,
      'combobox--focused': this.hasFocus,
      'combobox--large': this.size === 'large',
      'combobox--medium': this.size === 'medium',
      'combobox--multiple': this.multiple,
      'combobox--open': this.open,
      'combobox--placeholder-visible': isPlaceholderVisible,
      'combobox--small': this.size === 'small',
      'combobox--standard': true,
      'combobox--tags-visible': tagsVisible,
      'combobox--top': this.placement === 'top',
    })}
            placement=${`${this.placement}-start`}
            strategy=${this.hoist ? 'fixed' : 'absolute'}
            flip
            shift
            sync="width"
            auto-size="vertical"
            auto-size-padding="10"
            exportparts="popup"
          >
            <div
              part="combobox"
              class="combobox__inputs"
              slot="anchor"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
            >
              <slot part="prefix" name="prefix" class="combobox__prefix"></slot>

              ${this.multiple ? html`<div part="tags" class="combobox__tags">${this.tags}</div>` : ''}

              <input
                part="display-input"
                class="combobox__display-input"
                type="text"
                placeholder=${this.placeholder}
                .disabled=${this.disabled}
                .value=${this.displayLabel}
                autocomplete="off"
                spellcheck="false"
                autocapitalize="off"
                aria-controls="listbox"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="listbox"
                aria-labelledby="label"
                aria-disabled=${this.disabled ? 'true' : 'false'}
                aria-describedby="help-text"
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
                @blur=${this.handleBlur}

                aria-autocomplete="list"
                aria-owns="listbox"
                @input=${this.handleInput}
                @change=${this.handleChange}
              />

              <input
                class="combobox__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(', ') : this.value}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />
       
              ${hasClearIcon
        ? html`
                    <button
                      part="clear-button"
                      class="combobox__clear"
                      type="button"
                      aria-label=${this.localize.term('clearEntry')}
                      @mousedown=${this.preventLoosingFocus}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <syn-icon name="x-circle-fill" library="system"></syn-icon>
                      </slot>
                    </button>
                  `
        : ''}

                <slot name="suffix" part="suffix" class="combobox__suffix"></slot>

                <slot name="expand-icon" part="expand-icon" class="combobox__expand-icon">
                  <syn-icon library="system" name="chevron-down"></syn-icon>
                </slot>
            </div>

            <div
              id="listbox"
              role="listbox"
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-labelledby="label"
              part="listbox"
              class="combobox__listbox"
              tabindex="-1"
              @mousedown=${this.preventLoosingFocus}
              @mouseup=${this.handleOptionClick}
            >
              <div class="listbox__options" part="filtered-listbox">
                ${this.hideOptions || this.numberFilteredOptions === 0
        ? html`<span
                      class="listbox__no-results"
                      aria-hidden="true"
                      part="no-results"
                      >${this.localize.term('noResults')}</span
                    >`
        : ''}
                <slot class=${classMap({ options__hide: this.hideOptions })} @slotchange=${this.handleDefaultSlotChange}></slot>      
              </div>
            </div>
          </syn-popup>
        </div>
        
        <div
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? 'false' : 'true'}
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */
}

setDefaultAnimation('combobox.show', {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 },
  ],
  options: { duration: 100, easing: 'ease' },
});

setDefaultAnimation('combobox.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 },
  ],
  options: { duration: 100, easing: 'ease' },
});
