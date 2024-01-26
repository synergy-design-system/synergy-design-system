import React from 'react';
import type { Meta } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';
import storyBookPreviewConfig from '../../.storybook/preview.js';
import { getLabel, getTranslation } from '../../src/translations.js';

const meta: Meta = {
  parameters: {
    docs: {
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
        inline: false,
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
      font-weight: normal;
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
    syn-radio-group {
      container-type: inline-size;
    }
    syn-radio-group::part(form-control-input) {
      display: grid;
    }

    @container (min-width: 640px) {
      syn-radio-group::part(form-control-input) {
        grid-auto-flow: column;
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
        
        <fieldset>
          <syn-radio-group
            label="${getLabel('contactForm.topicLabel')}"
            name="topic"
            required
          >
            ${(getTranslation('contactForm.topics') as string[]).map((topic, index) => html`
              <syn-radio value=${index}>${topic}</syn-radio>
            `)}
          </syn-radio-group>
        </fieldset>

        <fieldset>
          <legend>${getLabel('contactForm.requestLabel')}</legend>
          <p>
            ${getLabel('contactForm.requestContent')}
          </p>

          <syn-textarea
            label="${getLabel('contactForm.messageLabel')}"
            name="message"
            required
          ></syn-textarea>
        </fieldset>

        <fieldset>
          <legend>${getTranslation('contactForm.contactDetailsLabel')}</legend>
          <div class="fields">
            <syn-input label="${getLabel('contactForm.customerNumberLabel')}" name="customerNr"></syn-input>
            <syn-input label="${getLabel('contactForm.companyNameLabel')}" name="companyName" required></syn-input>
            <syn-input label="${getLabel('contactForm.addressLabel')}" name="address" required></syn-input>
            <syn-input label="${getLabel('contactForm.zipLabel')}" name="zip" required></syn-input>
            <syn-input label="${getLabel('contactForm.cityLabel')}" name="city" required></syn-input>
            <syn-input label="${getLabel('contactForm.countryLabel')}" name="country" required></syn-input>
            <syn-input label="${getLabel('contactForm.referenceContactLabel')}" name="salesPerson" required></syn-input>
            <syn-input type="tel" label="${getLabel('contactForm.phoneLabel')}" name="phone"></syn-input>
            <syn-input type="tel" label="${getLabel('contactForm.faxLabel')}" name="fax"></syn-input>
            <syn-input type="email" label="${getLabel('contactForm.emailLabel')}" name="mail" required></syn-input>
          </div>
          <syn-checkbox name="subscribeNewsletter">
            ${getLabel('contactForm.newsletterLabel')}
          </syn-checkbox>
        </fieldset>

        <div class="submit-actions">
          <syn-button type="submit" variant="filled">${getLabel('contactForm.submitLabel')}</syn-button>
        </div>

        <em>
          ${getLabel('contactForm.requiredFieldInfo')}
        </em>
      </form>
    </div>

    <script>
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      console.log(...fd);
    })
    </script>
  `,
};

export const ContactFormTablet = {
  ...ContactForm,
  name: '↳ Tablet',
  parameters: {
    controls: {
      exclude: ['default'],
    },
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};
