import React from 'react';
import type { Meta } from '@storybook/web-components';
import {
  Description,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import { html } from 'lit';

const meta: Meta = {
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 1500,
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
    },
  },
  title: 'Templates/Forms',
};
export default meta;

export const ContactForm = {
  render: () => html`
    <style>
    .synergy-form-demo {
      background: var(--syn-color-neutral-0);
      border: 1px dashed var(--syn-color-neutral-300);
      margin: 0 auto;
      padding: 10px 20px;
      max-width: 750px;
    }

    h1 {
      font-size: var(--syn-font-size-3x-large);
      font-weight: normal;
      margin: 0 0 10px 0;
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
      margin-bottom: var(--syn-font-size-small);
    }

    fieldset legend + p {
      font-size: var(--syn-font-size-medium);
      margin: 0 0 var(--syn-font-size-medium) 0;
    }

    .fields {
      container-type: inline-size;
      display: flex;
      flex-flow: wrap;
      margin-bottom: var(--syn-font-size-x-large);
      gap: var(--syn-spacing-large) var(--syn-font-size-small);
    }

    .fields > * {
      flex-basis: 100%;
    }

    @container (min-width: 700px) {
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

    @container (min-width: 700px) {
      syn-radio-group::part(form-control-input) {
        grid-auto-flow: column;
        grid-template-rows: 1fr 1fr 1fr;
      }
    }

    .submit-actions {
      display: flex;
      justify-content: right;
      margin-bottom: var(--syn-font-size-x-large);
    }
    </style>
    <div class="synergy-form-demo">
      <h1>Kontaktformular</h1>
      <p>Bitte geben Sie Ihre Kontaktdaten an und beschreiben Sie, wobei wir Sie unterstützen können.</p>

      <form method="post" id="syn-form-demo">
        
        <fieldset>
          <syn-radio-group
            label="Zu welchem Thema haben Sie Fragen?"
            name="topic"
            required
          >
            <syn-radio value="1">Anfrage/Angebot</syn-radio>
            <syn-radio value="2">Aufträge/Rechnungen</syn-radio>
            <syn-radio value="3">Rücksendungen/Reklamation</syn-radio>
            <syn-radio value="4">Zubehörauswahl</syn-radio>
            <syn-radio value="5">Applikationserklärung</syn-radio>
            <syn-radio value="6">Inbetriebnahmeunterstützung</syn-radio>
          </syn-radio-group>
        </fieldset>

        <fieldset>
          <legend>Beschreiben Sie Ihre Anfrage</legend>
          <p>
            Es ist sehr hilfreich, wenn die Beschreibung möglichst genau ist, so können wir noch spezieller auf Ihre Fragen eingehen.
            (Bei Applikationsbeschreibungen ggf. Material/Abmessungen/Geschwindigkeiten mit angeben).
          </p>

          <syn-textarea label="Ihre Nachricht" name="message" required></syn-textarea>
        </fieldset>

        <fieldset>
          <legend>Ihre Kontaktdaten:</legend>
          <div class="fields">
            <syn-input label="Kundennummer" name="customerNr"></syn-input>
            <syn-input label="Firmenname" name="companyName" required></syn-input>
            <syn-input label="Adresse" name="address" required></syn-input>
            <syn-input label="PLZ" name="zip" required></syn-input>
            <syn-input label="Ort" name="city" required></syn-input>
            <syn-input label="Land" name="country" required></syn-input>
            <syn-input label="Ansprechpartner" name="salesPerson" required></syn-input>
            <syn-input type="tel" label="Telefonnummer" name="phone"></syn-input>
            <syn-input type="tel" label="Fax" name="fax"></syn-input>
            <syn-input type="email" label="E-Mail-Adresse" name="mail" required></syn-input>
          </div>
          <syn-checkbox name="subscribeNewsletter">
            Ja, ich möchte regelmäßig aktuelle und interessante Informationen zu Lösungen mit Produkten, Systemen und Services von SICK per E-Mail erhalten.
            Ich kann die Einwilligung jederzeit widerrufen.
            Für einen Widerruf der Einwilligung kann ich jederzeit den Abmeldelink in jedem Newsletter/jeder E-Mail nutzen.
          </syn-checkbox>
        </fieldset>

        <div class="submit-actions">
          <syn-button type="submit" variant="filled">Absenden</syn-button>
        </div>

        <em>
          Mit einem * gekennzeichnete Felder sind Pflichtfelder.
          Ihre Daten werden vertraulich behandelt und selbstverständlich nicht an Dritte weitergegeben.
          Hier erfahren Sie mehr zu unserem Datenschutz
        </em>
      </form>
    </div>
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
