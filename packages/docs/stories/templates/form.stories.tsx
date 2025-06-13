import React from 'react';
import type { Meta } from '@storybook/web-components-vite';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { generateStoryDescription } from '../../src/helpers/component.js';
import { getTranslation } from '../../src/translations.js';
import { generateFigmaPluginObject } from '../../src/helpers/figma.js';
import '../../../components/src/components/checkbox/checkbox.js';
import '../../../components/src/components/textarea/textarea.js';
import '../../../components/src/components/input/input.js';
import '../../../components/src/components/select/select.js';
import '../../../components/src/components/option/option.js';
import '../../../components/src/components/combobox/combobox.js';
import '../../../components/src/components/button/button.js';

const meta: Meta = {
  parameters: {
    design: generateFigmaPluginObject('8462-8334'),
    docs: {
      description: {
        component: generateStoryDescription('contact-form', 'default', 'templates'),
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories title="" />
        </>
      ),
      story: {
        iframeHeight: 1600,
        inline: true,
      },
    },
  },
  title: 'Templates/Forms',
};
export default meta;

export const ContactForm = {
  parameters: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    chromatic: {
      ...storyBookPreviewConfig?.parameters?.chromatic,
      disableSnapshot: false,
    },
  },
  render: () => html`
    <style>
    .synergy-form-demo {
      background: var(--syn-color-neutral-0);
      margin: 0 auto;
      padding: var(--syn-spacing-x-large);
      max-width: 750px;
    }

    h1 {
      font-size: var(--syn-font-size-3x-large);
      font-weight: var(--syn-font-weight-bold);
      margin: 0 0 var(--syn-spacing-medium) 0;
    }

    .synergy-form-demo > p {
      margin: 0 0 var(--syn-spacing-2x-large) 0;
    }

    em {
      font-size: var(--syn-font-size-x-small);
      font-style: normal;
    }

    fieldset {
      border: none;
      margin: 0 0 var(--syn-spacing-2x-large) 0;
      padding: 0;
    }

    fieldset legend {
      font-size: var(--syn-font-size-large);
      font-weight: var(--syn-font-weight-bold);
      line-height: var(--syn-line-height-normal);
      margin-bottom: var(--syn-spacing-medium);
    }

    fieldset legend + p {
      font-size: var(--syn-font-size-medium);
      margin: 0 0 var(--syn-font-size-large) 0;
    }

    .fields {
      container-type: inline-size;
      display: flex;
      flex-flow: wrap;
      margin-bottom: var(--syn-spacing-2x-large);
      gap: var(--syn-spacing-large) var(--syn-spacing-large);

      /* TODO: this two css properties can be removed, when this issue is fixed https://github.com/synergy-design-system/synergy-design-system/issues/612
      * It is fixed for the newest chrome and firefox versions, but not for safari :( 
      */
      position: relative;
      z-index: 1;
    }

    .fields > * {
      flex-basis: 100%;
    }

    @container (min-width: 640px) {
      .fields > * {
        flex-basis: calc(50% - var(--syn-spacing-medium));
      }
    }

    /*
     * The form control inputs are using a css grid to be displayed.
     * We just let them flow automatically mobile and arrange them
     * in two columns when space is wide enough
     */
    #topics-wrapper {
      container-type: inline-size;
    }

    #topics {
      gap: var(--syn-spacing-x-small);
      display: grid;
    }

    @container (min-width: 640px) {
      #topics {
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
      }
    }

    .submit-actions {
      display: flex;
      justify-content: right;
      margin-bottom: var(--syn-spacing-2x-large);
    }
    </style>
    <div class="synergy-form-demo">
      <h1>${getTranslation('contactForm.headline')}</h1>
      <p>${getTranslation('contactForm.subHeadline')}</p>

      <form method="post" id="syn-form-demo">
        
        <fieldset id="topics-wrapper">
          <legend>${getTranslation('contactForm.topicLabel')}</legend>
          <div id="topics">
            ${(getTranslation('contactForm.topics') as string[]).map((topic, index) => html`
              <syn-checkbox name="topic[${index}]" value="${topic}">
                ${topic}
              </syn-checkbox>
            `)}
          </div>
        </fieldset>

        <fieldset>
          <legend>${getTranslation('contactForm.requestLabel')}</legend>
          <p>
            ${getTranslation('contactForm.requestContent')}
          </p>

          <syn-textarea
            label="${getTranslation('contactForm.messageLabel')}"
            name="message"
            required
          ></syn-textarea>
        </fieldset>

        <fieldset>
          <legend>${getTranslation('contactForm.contactDetailsLabel')}</legend>
          <div class="fields">
            <syn-input label="${getTranslation('contactForm.customerNumberLabel')}" name="customerNr"></syn-input>
            <syn-input label="${getTranslation('contactForm.companyNameLabel')}" name="companyName" required></syn-input>
            <syn-input label="${getTranslation('contactForm.addressLabel')}" name="address" required></syn-input>
            <syn-input label="${getTranslation('contactForm.zipLabel')}" name="zip" required></syn-input>
            <syn-input label="${getTranslation('contactForm.cityLabel')}" name="city" required></syn-input>

            <syn-select label="${getTranslation('contactForm.countryLabel')}" name="country" required>
              ${(getTranslation('contactForm.countries') as string[]).map((country, index) => html`
                <syn-option value=${index}>${country}</syn-option>
              `)}
            </syn-select>

            <syn-combobox label="${getTranslation('contactForm.referenceContactLabel')}" name="salesPerson" required>
              <syn-option>Max Mustermann</syn-option>
              <syn-option>John Doe</syn-option>
              <syn-option>Jane Row</syn-option>
              <syn-option>Average Joe</syn-option>
            </syn-combobox>
            <syn-input type="tel" label="${getTranslation('contactForm.phoneLabel')}" name="phone"></syn-input>
            <syn-input type="tel" label="${getTranslation('contactForm.faxLabel')}" name="fax"></syn-input>
            <syn-input type="email" label="${getTranslation('contactForm.emailLabel')}" name="mail" required></syn-input>
          </div>
          <syn-checkbox name="subscribeNewsletter">
            ${getTranslation('contactForm.newsletterLabel')}
          </syn-checkbox>
        </fieldset>

        <div class="submit-actions">
          <syn-button type="submit" variant="filled">${getTranslation('contactForm.submitLabel')}</syn-button>
        </div>

        <em>
          ${getTranslation('contactForm.requiredFieldInfo')}
          <a href="#">${getTranslation('contactForm.requiredFieldLink')}</a>
          ${getTranslation('contactForm.requiredFieldEnd')}.
        </em>
      </form>
    </div>

    <script type="module">
    const firstTopic = document.querySelector('syn-checkbox:first-child');
    const firstTopicError = '${getTranslation('contactForm.topicsErrorMessage')}';

    customElements.whenDefined('syn-select').then(() => {
      firstTopic.setCustomValidity(firstTopicError);
    });

    const setValidationForTopics = () => {
      const hasCheckedElements = document.querySelectorAll('#topics syn-checkbox[checked]').length > 0;
      const validationMessage = hasCheckedElements ? '' : firstTopicError;
      firstTopic.setCustomValidity(validationMessage);
    }

    document.querySelector('form').addEventListener('input', setValidationForTopics);

    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      const fd = new FormData(e.target);

      const hasOneTopicChecked = Array
        .from(fd)
        .some(([key, value]) => (key.startsWith('topic[') && value));

      // Set validation message for topics dependent if a topic was checked or not
      const topicValidity = hasOneTopicChecked ? '' : firstTopicError;
      firstTopic.setCustomValidity(topicValidity);

      if (e.target.reportValidity()) {
        console.log(...fd, hasOneTopicChecked);
      }
    });
    </script>
  `,
};

export const ContactFormTablet = {
  ...ContactForm,
  globals: {
    viewport: { value: 'mobile2' },
  },
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    docs: {
      disable: true,
    },
  },
};
