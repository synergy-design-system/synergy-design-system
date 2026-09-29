/* eslint-disable lit-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
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
import { scrollIntoView } from '../../internal/scroll.js';
import { LoadMoreController } from '../../internal/load-more.js';
import { waitForEvent } from '../../internal/event.js';
import { watch } from '../../internal/watch.js';
import componentStyles from '../../styles/component.styles.js';
import formControlStyles from '../../styles/form-control.styles.js';
import SynergyElement from '../../internal/synergy-element.js';
import SynIcon from '../icon/icon.component.js';
import SynPopup from '../popup/popup.component.js';
import SynTag from '../tag/tag.component.js';
import type SynDrawer from '../drawer/drawer.component.js';
import type SynDialog from '../dialog/dialog.component.js';
import styles from './select.styles.js';
import type { SynergyFormControl } from '../../internal/synergy-element.js';
import type { SynRemoveEvent } from '../../events/syn-remove.js';
import type SynOption from '../option/option.component.js';
import { compareValues, isAllowedValue } from './utility.js';
import { enableDefaultSettings } from '../../utilities/defaultSettings/decorator.js';

/**
 * @summary Selects allow you to choose items from a menu of predefined options.
 * @documentation https://synergy-design-system.github.io/?path=/docs/components-syn-select--docs
 * @status stable
 * @since 1.5.0
 *
 * @dependency syn-icon
 * @dependency syn-popup
 * @dependency syn-tag
 *
 * @slot - The listbox options. Must be `<syn-option>` elements. You can use `<syn-divider>` to group items visually.
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot suffix - Used to append a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed. Rotates on open and close.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event syn-change - Emitted when the control's value changes.
 * @event syn-clear - Emitted when the control's value is cleared.
 * @event syn-input - Emitted when the control receives input.
 * @event syn-focus - Emitted when the control gains focus.
 * @event syn-blur - Emitted when the control loses focus.
 * @event syn-show - Emitted when the select's menu opens.
 * @event syn-after-show - Emitted after the select's menu opens and all animations are complete.
 * @event syn-hide - Emitted when the select's menu closes.
 * @event syn-after-hide - Emitted after the select's menu closes and all animations are complete.
 * @event syn-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 * @event syn-load-more - Emitted when the listbox has been scrolled close to its end, so more options can be appended (e.g. from a paged/async data source).
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart combobox - The container the wraps the prefix, suffix, combobox, clear icon, and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the selected option's label, an `<input>` element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multiselect option.
 * @csspart tag__base - The tag's base part.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 * @csspart popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart load-more-sentinel - An invisible element used to detect when the listbox has been scrolled close to its end. Not meant to be styled directly.
 */
@enableDefaultSettings('SynSelect')
export default class SynSelect extends SynergyElement implements SynergyFormControl {
  static styles: CSSResultGroup = [componentStyles, formControlStyles, styles];

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

  private typeToSelectString = '';

  private typeToSelectTimeout: number;

  private closeWatcher: CloseWatcher | null;

  private resizeObserver: ResizeObserver;

  private selectedOptionObserver: MutationObserver;

  private isUserInput: boolean = false;

  private readonly loadMoreController = new LoadMoreController(this, {
    onLoadMore: () => this.emit('syn-load-more'),
  });

  private getContainingModalHost() {
    return this.closest<SynDialog | SynDrawer>('syn-dialog, syn-drawer');
  }

  @query('.select') popup: SynPopup;

  @query('.select__combobox') combobox: HTMLSlotElement;

  @query('.select__display-input') displayInput: HTMLInputElement;

  @query('.select__value-input') valueInput: HTMLInputElement;

  @query('.select__listbox') listbox: HTMLSlotElement;

  @query('.select__tags') tagContainer: HTMLDivElement;

  @query('.select__sentinel') private sentinelEl: HTMLDivElement;

  @state() private hasFocus = false;

  @state() displayLabel = '';

  @state() currentOption: SynOption;

  @state() selectedOptions: SynOption[] = [];

  @state() private valueHasChanged: boolean = false;

  /**
   * The delimiter to use when setting the value when `multiple` is enabled.
   * The default is a space, but you can set it to a comma or other character.
   * @example <syn-select delimiter="|" value="option-1|option-2"></syn-select>
   */
  @property() delimiter = ' ';

  /** The name of the select, submitted as a name/value pair with form data. */
  @property() name = '';

  private _value: string | number | Array<string | number> = '';

  get value() {
    return this._value;
  }

  /**
   * The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the
   * value attribute will be a space-delimited list of values based on the options selected, and the value property will
   * be an array. **For this reason, values must not contain spaces.**
   */
  @state()
  set value(val: string | number | Array<string | number>) {
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
  @property({ attribute: 'value' }) defaultValue: string | number | Array<string | number> = '';

  /** The select's size. */
  @property({ reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';

  /** Placeholder text to show as a hint when the select is empty. */
  @property() placeholder = '';

  /** Allows more than one option to be selected. */
  @property({ reflect: true, type: Boolean }) multiple = false;

  /**
   * The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to
   * indicate the number of additional items that are selected. Set to 0 to remove the limit.
   */
  @property({ attribute: 'max-options-visible', type: Number }) maxOptionsVisible = 3;

  /** Disables the select control. */
  @property({ reflect: true, type: Boolean }) disabled = false;

  /** Sets the select to a readonly state. */
  @property({ reflect: true, type: Boolean }) readonly = false;

  /** Adds a clear button when the select is not empty. */
  @property({ type: Boolean }) clearable = false;

  /**
   * Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the select's open state.
   */
  @property({ reflect: true, type: Boolean }) open = false;

  /** The select's label. If you need to display HTML, use the `label` slot instead. */
  @property() label = '';

  /**
   * The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox
   * inside of the viewport.
   */
  @property({ reflect: true }) placement: 'top' | 'bottom' = 'bottom';

  /** The select's help text. If you need to display HTML, use the `help-text` slot instead. */
  @property({ attribute: 'help-text' }) helpText = '';

  /**
   * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
   * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
   * the same document or shadow root for this to work.
   */
  @property({ reflect: true }) form = '';

  /** The select's required attribute. */
  @property({ reflect: true, type: Boolean }) required = false;

  /**
   * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
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

  private enableResizeObserver() {
    if (this.multiple && !this.readonly && this.tagContainer) {
      this.resizeObserver = new ResizeObserver(entries => {
        const entry = entries.at(0)!;
        this.tagContainer.style.setProperty('--syn-select-tag-max-width', `${entry.contentRect.width}px`);
      });
      this.resizeObserver.observe(this.tagContainer);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // #1265: When updating the content of the selected syn-option, the select needs to update the display label.
    // To do this, we use a MutationObserver to watch for changes in the selected options.
    this.selectedOptionObserver = new MutationObserver(() => {
      if (this.multiple) {
        if (this.readonly) {
          this.displayLabel = this.selectedOptions.map(option => option.getTextLabel()).join(', ');
        } else {
          this.requestUpdate();
        }
      } else {
        this.displayLabel = this.selectedOptions[0]?.getTextLabel?.() ?? '';
      }
    });

    setTimeout(() => {
      this.handleDefaultSlotChange();
    });

    // Because this is a form control, it shouldn't be opened initially
    this.open = false;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.selectedOptionObserver?.disconnect();
  }

  private observeSelectedOptions() {
    this.selectedOptionObserver?.disconnect();

    this.selectedOptions.forEach(option => {
      this.selectedOptionObserver.observe(option, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    });
  }

  private addOpenListeners() {
    //
    // Listen on the root node instead of the document in case the elements are inside a shadow root
    //
    // https://github.com/shoelace-style/shoelace/issues/1763
    //
    document.addEventListener('focusin', this.handleDocumentFocusIn);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);

    // #1297: If the select is inside a dialog, we need to activate the dialog's modal to prevent focus from escaping the dialog while the select is open
    this.getContainingModalHost()?.modal?.activateExternal();

    // If the component is rendered in a shadow root, we need to attach the focusin listener there too
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

    // #1297: If the select is inside a dialog, we need to activate the dialog's modal to prevent focus from escaping the dialog while the select is open
    this.getContainingModalHost()?.modal?.deactivateExternal();

    if (this.getRootNode() !== document) {
      this.getRootNode().removeEventListener('focusin', this.handleDocumentFocusIn);
    }

    this.closeWatcher?.destroy();
  }

  private handleFocus() {
    this.hasFocus = true;
    this.displayInput.setSelectionRange(0, 0);
    this.emit('syn-focus');
  }

  private handleBlur() {
    this.hasFocus = false;
    this.emit('syn-blur');
  }

  private handleDocumentFocusIn = (event: KeyboardEvent) => {
    // Close when focusing out of the select
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
    const isClearButton = target.closest('.select__clear') !== null;
    const isIconButton = target.closest('syn-icon-button') !== null;

    // Ignore presses when the target is an icon button (e.g. the remove button in <syn-tag>)
    if (isClearButton || isIconButton) {
      return;
    }

    // Close when pressing escape
    if (event.key === 'Escape' && this.open && !this.closeWatcher) {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
      this.displayInput.focus({ preventScroll: true });
    }

    // Handle enter and space. When pressing space, we allow for type to select behaviors so if there's anything in the
    // buffer we _don't_ close it.
    if (event.key === 'Enter' || (event.key === ' ' && this.typeToSelectString === '')) {
      event.preventDefault();
      event.stopImmediatePropagation();

      // If it's not open, open it
      if (!this.open) {
        this.show();
        return;
      }

      // If it is open, update the value based on the current selection and close it
      if (this.currentOption && !this.currentOption.disabled) {
        this.valueHasChanged = true;
        this.isUserInput = true;
        if (this.multiple) {
          this.toggleOptionSelection(this.currentOption);
        } else {
          this.setSelectedOptions(this.currentOption);
        }

        // Emit after updating
        this.updateComplete.then(() => {
          this.emit('syn-input');
          this.emit('syn-change');
        });

        if (!this.multiple) {
          this.hide();
          this.displayInput.focus({ preventScroll: true });
        }
      }

      return;
    }

    // Navigate options
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      const allOptions = this.getAllOptions();
      const currentIndex = allOptions.indexOf(this.currentOption);
      let newIndex = Math.max(0, currentIndex);

      // Prevent scrolling
      event.preventDefault();

      // Open it
      if (!this.open) {
        this.show();

        // If an option is already selected, stop here because we want that one to remain highlighted when the listbox
        // opens for the first time
        if (this.currentOption) {
          return;
        }
      }

      if (event.key === 'ArrowDown') {
        newIndex = currentIndex + 1;
        if (newIndex > allOptions.length - 1) newIndex = 0;
      } else if (event.key === 'ArrowUp') {
        newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = allOptions.length - 1;
      } else if (event.key === 'Home') {
        newIndex = 0;
      } else if (event.key === 'End') {
        newIndex = allOptions.length - 1;
      }

      this.setCurrentOption(allOptions[newIndex]);
    }

    // All other "printable" keys trigger type to select
    if ((event.key && event.key.length === 1) || event.key === 'Backspace') {
      const allOptions = this.getAllOptions();

      // Don't block important key combos like CMD+R
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      // Open, unless the key that triggered is backspace
      if (!this.open) {
        if (event.key === 'Backspace') {
          return;
        }

        this.show();
      }

      event.stopPropagation();
      event.preventDefault();

      clearTimeout(this.typeToSelectTimeout);
      this.typeToSelectTimeout = window.setTimeout(() => {
        this.typeToSelectString = '';
      }, 1000);

      if (event.key === 'Backspace') {
        this.typeToSelectString = this.typeToSelectString.slice(0, -1);
      } else {
        this.typeToSelectString += event.key.toLowerCase();
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const option of allOptions) {
        const label = option.getTextLabel().toLowerCase();

        if (label.startsWith(this.typeToSelectString)) {
          this.setCurrentOption(option);
          break;
        }
      }
    }
  };
  /* eslint-enable @typescript-eslint/no-floating-promises */

  private handleDocumentMouseDown = (event: MouseEvent) => {
    // Close when clicking outside of the select
    const path = event.composedPath();
    if (this && !path.includes(this)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.hide();
    }
  };

  private handleFormControlClick() {
    if (this.readonly) {
      this.displayInput.focus();
    }
  }

  private handleLabelClick() {
    this.displayInput.focus();
  }

  private handleComboboxMouseDown(event: MouseEvent) {
    const path = event.composedPath();
    const isIconButton = path.some(el => el instanceof Element && el.tagName.toLowerCase() === 'syn-icon-button');

    // Ignore disabled controls and clicks on tags (remove buttons)
    if (this.disabled || this.readonly || isIconButton) {
      return;
    }

    event.preventDefault();
    this.displayInput.focus({ preventScroll: true });
    this.open = !this.open;
  }

  private handleComboboxKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      return;
    }

    event.stopPropagation();
    this.handleDocumentKeyDown(event);
  }

  private handleClearClick(event: MouseEvent) {
    event.stopPropagation();

    this.valueHasChanged = true;

    if (this.value !== '') {
      this.setSelectedOptions([]);
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
  private handleClearMouseDown(event: MouseEvent) {
    // Don't lose focus or propagate events when clicking the clear button
    event.stopPropagation();
    event.preventDefault();
  }

  private handleOptionClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const option = target.closest('syn-option');
    const oldValue = this.value;

    if (option && !option.disabled) {
      this.valueHasChanged = true;
      this.isUserInput = true;
      if (this.multiple) {
        this.toggleOptionSelection(option);
      } else {
        this.setSelectedOptions(option);
      }

      // Set focus after updating so the value is announced by screen readers
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updateComplete.then(() => this.displayInput.focus({ preventScroll: true }));

      if (this.value !== oldValue) {
        // Emit after updating
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.updateComplete.then(() => {
          this.emit('syn-input');
          this.emit('syn-change');
        });
      }

      if (!this.multiple) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.hide();
        this.displayInput.focus({ preventScroll: true });
      }
    }
  }

  /* @internal - used by options to update labels */
  public handleDefaultSlotChange() {
    if (!customElements.get('syn-option')) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      customElements.whenDefined('syn-option').then(() => this.handleDefaultSlotChange());
    }

    const allOptions = this.getAllOptions();
    const val = this.valueHasChanged ? this.value : this.defaultValue;

    this.handleDelimiterChange();
    // eslint-disable-next-line no-nested-ternary
    const value = Array.isArray(val)
      ? val
      : typeof val === 'string' ? val.split(this.delimiter) : [val].filter(isAllowedValue);

    const values: Array<string | number> = [];

    // Check for duplicate values in menu items
    allOptions.forEach(option => values.push(option.value));

    // Select only the options that match the new value
    const valueString = value.map(String);
    const allSelectedOptions = allOptions.filter(
      el => valueString.includes(String(el.value)),
    );
    this.setSelectedOptions(allSelectedOptions);

    // Re-arm the load-more sentinel now that the option set has changed
    if (this.listbox && this.sentinelEl) {
      this.loadMoreController.observe(this.listbox, this.sentinelEl);
    }
  }

  private handleTagRemove(event: SynRemoveEvent, option: SynOption) {
    event.stopPropagation();

    this.valueHasChanged = true;

    if (!this.disabled && !this.readonly) {
      this.toggleOptionSelection(option, false);

      // Emit after updating
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.updateComplete.then(() => {
        this.emit('syn-input');
        this.emit('syn-change');
      });
    }
  }

  // Gets an array of all <syn-option> elements
  private getAllOptions() {
    return [...this.querySelectorAll<SynOption>('syn-option')];
  }

  // Gets the first <syn-option> element
  private getFirstOption() {
    return this.querySelector<SynOption>('syn-option');
  }

  // Sets the current option, which is the option the user is currently interacting with (e.g. via keyboard). Only one
  // option may be "current" at a time.
  private setCurrentOption(option: SynOption | null) {
    const allOptions = this.getAllOptions();

    // Clear selection
    allOptions.forEach(el => {
      el.current = false;
      el.tabIndex = -1;
    });

    // Select the target option
    if (option) {
      this.currentOption = option;
      option.current = true;
      option.tabIndex = 0;
      option.focus();
    }
  }

  // Sets the selected option(s)
  private setSelectedOptions(option: SynOption | SynOption[]) {
    const allOptions = this.getAllOptions();
    const newSelectedOptions = Array.isArray(option) ? option : [option];

    // Clear existing selection
    allOptions.forEach(el => {
      el.selected = false;
    });

    // Set the new selection
    if (newSelectedOptions.length) {
      newSelectedOptions.forEach(el => {
        el.selected = true;
      });
    }

    // Update selection, value, and display label
    this.selectionChanged();
  }

  // Toggles an option's selected state
  private toggleOptionSelection(option: SynOption, force?: boolean) {
    if (force === true || force === false) {
      option.selected = force;
    } else {
      option.selected = !option.selected;
    }

    this.selectionChanged();
  }

  // This method must be called whenever the selection changes. It will update the selected options cache, the current
  // value, and the display value
  private selectionChanged() {
    const options = this.getAllOptions();
    // Update selected options cache
    this.selectedOptions = options.filter(el => el.selected);
    this.observeSelectedOptions();

    // Keep a reference to the previous `valueHasChanged`. Changes made here don't count has changing the value.
    const cachedValueHasChanged = this.valueHasChanged;

    // Update the value and display label
    if (this.multiple) {
      this.value = this.selectedOptions.map(el => el.value);

      // #1177: When using a readonly field with multiple set,
      // set the display label to the list of selected options instead of the count, since the user can't open the listbox to see which options are selected.
      // This makes it possible to copy the values from the readonly select.
      if (this.readonly) {
        this.displayLabel = this.selectedOptions.map(opt => opt.getTextLabel()).join(', ');
      } else if (this.placeholder && this.value.length === 0) {
        // When no items are selected, keep the value empty so the placeholder shows
        this.displayLabel = '';
      } else {
        this.displayLabel = this.localize.term('numOptionsSelected', this.selectedOptions.length);
      }
    } else {
      const selectedOption = this.selectedOptions[0];
      this.value = selectedOption?.value ?? '';
      this.displayLabel = selectedOption?.getTextLabel?.() ?? '';
    }
    this.valueHasChanged = cachedValueHasChanged;

    // Update validity
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.updateComplete.then(() => {
      this.isUserInput = false;
      this.formControlController.updateValidity();
    });
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

  private handleInvalid(event: Event) {
    this.formControlController.setValidity(false);
    this.formControlController.emitInvalidEvent(event);
  }

  @watch('delimiter')
  handleDelimiterChange() {
    this.getAllOptions().forEach(option => {
      option.delimiter = this.delimiter;
    });
  }

  @watch(['disabled', 'readonly'], { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    // Close the listbox when the control is disabled or readonly
    if (this.disabled || this.readonly) {
      this.open = false;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.handleOpenChange();
    }
  }

  protected updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);
    if (changedProperties.has('multiple') || changedProperties.has('readonly')) {
      this.resizeObserver?.disconnect();

      if (this.multiple && !this.readonly) {
        this.enableResizeObserver();
      }
    }
  }

  protected override willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties);

    if(changedProperties.has('value') && !this.defaultValue && this.value && !this.isUserInput) {
      // Values set by property binding (e.g. Angular, especially with async bindings such as Observables/BehaviorSubjects)
      // have led to some malfunctions (e.g. form reset not working, dynamic reloading of options, etc.). To fix this,
      // the defaultValue must be set via property binding. However, this must NOT happen during user input,
      // as otherwise user interaction will lead to a new defaultValue.
      this.defaultValue = this.value;
      this.valueHasChanged = false;
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

  @watch(['defaultValue', 'value', 'delimiter'], { waitUntilFirstUpdate: true })
  handleValueChange() {
    if (!this.valueHasChanged) {
      const cachedValueHasChanged = this.valueHasChanged;
      this.value = this.defaultValue;

      // Set it back to false since this isn't an interaction.
      this.valueHasChanged = cachedValueHasChanged;
    }

    const allOptions = this.getAllOptions();
    const value = Array.isArray(this.value) ? this.value : [this.value];

    // Select only the options that match the new value
    const valueString = value.map(String);
    const allSelectedOptions = allOptions.filter(
      el => valueString.includes(String(el.value)),
    );
    this.setSelectedOptions(allSelectedOptions);
  }

  @watch('open', { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open && (!this.disabled && !this.readonly)) {
      // Reset the current option
      this.setCurrentOption(this.selectedOptions[0] || this.getFirstOption());

      // Show
      this.emit('syn-show');
      this.addOpenListeners();

      await stopAnimations(this);
      this.listbox.hidden = false;
      this.popup.active = true;

      // Select the appropriate option based on value after the listbox opens
      requestAnimationFrame(() => {
        this.setCurrentOption(this.currentOption);
      });

      const { keyframes, options } = getAnimation(this, 'select.show', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);

      // Make sure the current option is scrolled into view (required for Safari)
      if (this.currentOption) {
        scrollIntoView(this.currentOption, this.listbox, 'vertical', 'auto');
      }

      this.emit('syn-after-show');
    } else {
      // Hide
      this.emit('syn-hide');
      this.removeOpenListeners();

      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, 'select.hide', { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.listbox.hidden = true;
      this.popup.active = false;

      this.emit('syn-after-hide');
    }
  }

  /** Shows the listbox. */
  async show() {
    if (this.open || this.disabled || this.readonly) {
      this.open = false;
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, 'syn-after-show');
  }

  /** Hides the listbox. */
  async hide() {
    if (!this.open || this.disabled || this.readonly) {
      this.open = false;
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, 'syn-after-hide');
  }

  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
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

  /* eslint-disable @typescript-eslint/unbound-method */
  // eslint-disable-next-line complexity
  render() {
    const hasValue = isAllowedValue(this.value);
    const hasLabelSlot = this.hasSlotController.test('label');
    const hasHelpTextSlot = this.hasSlotController.test('help-text');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && (!this.disabled && !this.readonly) && hasValue;
    const isPlaceholderVisible = this.placeholder && this.value && !hasValue;

    return html`
      <div
        class=${classMap({
          'form-control': true,
          'form-control--has-help-text': hasHelpText,
          'form-control--has-label': hasLabel,
          'form-control--large': this.size === 'large',
          'form-control--medium': this.size === 'medium',
          'form-control--small': this.size === 'small',
        })}
        @click=${this.handleFormControlClick}
        part="form-control"
      >
        <label
          aria-hidden=${hasLabel ? 'false' : 'true'}
          class="form-control__label"
          @click=${this.handleLabelClick}
          id="label"
          part="form-control-label"
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <syn-popup
            auto-size="vertical"
            auto-size-padding="10"
            class=${classMap({
              select: true,
              'select--bottom': this.placement === 'bottom',
              'select--disabled': this.disabled,
              'select--focused': this.hasFocus,
              'select--large': this.size === 'large',
              'select--medium': this.size === 'medium',
              'select--multiple': this.multiple,
              'select--open': this.open,
              'select--placeholder-visible': isPlaceholderVisible,
              'select--readonly': this.readonly,
              'select--small': this.size === 'small',
              'select--standard': true,
              'select--top': this.placement === 'top',
            })}
            exportparts="popup"
            flip
            placement=${`${this.placement}-start`}
            shift
            sync="width"
          >
            <div
              class="select__combobox"
              @keydown=${this.handleComboboxKeyDown}
              @mousedown=${this.handleComboboxMouseDown}
              part="combobox"
              slot="anchor"
            >
              <slot class="select__prefix" name="prefix" part="prefix"></slot>

              <input
                aria-controls="listbox"
                aria-describedby="help-text"
                aria-disabled=${this.disabled ? 'true' : 'false'}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="listbox"
                aria-labelledby="label"
                autocapitalize="off"
                autocomplete="off"
                @blur=${this.handleBlur}
                class="select__display-input"
                .disabled=${this.disabled}
                part="display-input"
                type="text"
                placeholder=${this.placeholder}
                .value=${this.displayLabel}
                spellcheck="false"
                readonly
                role="combobox"
                tabindex="0"
                @focus=${this.handleFocus}
              />

              ${this.multiple && !this.readonly ? html`<div part="tags" class="select__tags">${this.tags}</div>` : ''}

              <input
                class="select__value-input"
                type="text"
                ?disabled=${this.disabled}
                ?readonly=${this.readonly}
                ?required=${this.required}
                .value=${Array.isArray(this.value) ? this.value.join(', ') : this.value?.toString()}
                tabindex="-1"
                aria-hidden="true"
                @focus=${() => this.focus()}
                @invalid=${this.handleInvalid}
              />

              ${hasClearIcon
                ? html`
                    <button
                      aria-label=${this.localize.term('clearEntry')}
                      class="select__clear"
                      @click=${this.handleClearClick}
                      @mousedown=${this.handleClearMouseDown}
                      part="clear-button"
                      tabindex="-1"
                      type="button"
                    >
                      <slot name="clear-icon">
                        <syn-icon name="x-circle-fill" library="system"></syn-icon>
                      </slot>
                    </button>
                  `
                : ''}

              <slot class="select__suffix" part="suffix" name="suffix"></slot>

              <slot class="select__expand-icon" name="expand-icon" part="expand-icon">
                <syn-icon name="chevron-down" library="system"></syn-icon>
              </slot>
            </div>

            <div
              aria-expanded=${this.open ? 'true' : 'false'}
              aria-labelledby="label"
              aria-multiselectable=${this.multiple ? 'true' : 'false'}
              class="select__listbox"
              id="listbox"
              @mouseup=${this.handleOptionClick}
              part="listbox"
              role="listbox"
              @slotchange=${this.handleDefaultSlotChange}
              tabindex="-1"
            >
              <slot></slot>
              <div aria-hidden="true" class="select__sentinel" part="load-more-sentinel"></div>
            </div>
          </syn-popup>
        </div>

        <div
          aria-hidden=${hasHelpText ? 'false' : 'true'}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `;
  }
  /* eslint-enable @typescript-eslint/unbound-method */
}

setDefaultAnimation('select.show', {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 },
  ],
  options: { duration: 100, easing: 'ease' },
});

setDefaultAnimation('select.hide', {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 },
  ],
  options: { duration: 100, easing: 'ease' },
});
