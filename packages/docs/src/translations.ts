/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sort-keys */
export const accordion = {
  details1: {
    content: `
      Ja, wir bieten zahlreiche Praktikumsplätze für Schülerinnen und Schüler zur Berufsorientierung im technischen und kaufmännischen Bereich an.
      Alle Infos zum Thema Praktikum und Berufsorientierung findest du hier.
    `,
    headline: 'Kann ich bei SICK ein Schülerpraktikum absolvieren?',
  },
  details2: {
    content: `
      Grundsätzlich setzen wir für eine Ausbildung die Mittlere Reife oder einen gleichwertigen Schulabschluss voraus.
      Für das Duale Studium benötigst du Abitur oder Fachhochschulreife.
      Alle Voraussetzungen, die du für den jeweiligen Ausbildungsberuf mitbringen solltest, findest du auf unseren Seite der Ausbildungsberufe und Dualen Studiengängen.
    `,
    headline: 'Welchen Schulabschluss brauche ich für eine Ausbildung / ein Duales Studium bei SICK?',
  },
  details3: {
    content: `
      Nein, die schulischen Leistungen sind für uns nur wichtig, um einen Gesamteindruck von dir zu bekommen. Wir verlangen generell keinen bestimmten Notendurchschnitt.
      Für das Duale Studium sind die Noten jedoch nicht unwichtig.
      Es braucht gewisse Grundlagen, um das Duale Studium schaffen zu können.
      Daher schauen wir dort etwas genauer auf deine Leistungen in der Schule.    
    `,
    headline: 'Verlangt SICK einen bestimmten Notendurchschnitt?',
  },
  details4: {
    content: `
      SICK bietet das Modell der dualen Ausbildung und des dualen Studiums an, das nur in Deutschland verfügbar ist. Informationen zu diesen Modellen finden Sie hier: IHK-Ausbildung und duales Studium an der DHBW.
      Für beide Modelle benötigen Sie entsprechende Deutschkenntnisse für den Schul- oder Hochschulbesuch. Für die Ausbildung wird mindestens das B2-Niveau empfohlen, für das Studium benötigen Sie C1 (mehr Informationen hier).
      Wir bitten Sie, Ihre Bewerbung in deutscher Sprache einzureichen.
    `,
    headline: 'Welche Deutschkenntnisse brauche ich für eine Ausbildung oder ein Studium bei SICK?',
  },
  headline: 'Allgemeine Fragen',
};

export const contactForm = {
  headline: 'Contact Form',
  subHeadline: 'Please fill in your personal information and let us know how we can help you.',
  topicLabel: 'Topic',
  topicsErrorMessage: 'Please select at least one topic',
  topics: [
    'Inquiry/offer',
    'Orders/invoices',
    'Returns/complaint',
    'Documentation/CAD',
    'Accessories selection',
    'Application review',
    'Commissioning support',
  ],
  requestLabel: 'Question',
  requestContent: 'It is very helpful if the description is as precise as possible to enable us to process your enquiry correctly. When describing applications, please specify the material/dimensions/speed, if applicable.',
  messageLabel: 'Message',
  contactDetailsLabel: 'Contact Details',
  customerNumberLabel: 'Customer Number',
  companyNameLabel: 'Company name',
  nameLabel: 'Your Name',
  addressLabel: 'Address',
  zipLabel: 'Postal Code',
  cityLabel: 'City',
  countryLabel: 'Country',
  countries: [
    'Deutschland',
    'USA',
    'China',
  ],
  referenceContactLabel: 'Your reference contact',
  phoneLabel: 'Phone number',
  faxLabel: 'Fax number',
  emailLabel: 'E-Mail address',
  newsletterLabel: 'Yes, I would like to receive up-to-date and interesting information on solutions with products, systems and services from SICK by email on a regular basis. I can withdraw my consent at any time. To withdraw my consent, I can use the unsubscribe link in every newsletter / email at any time.',
  submitLabel: 'Send',
  requiredFieldInfo: 'Fields marked * are required. Your data will be treated accordingly to',
  requiredFieldLink: 'Data protection',
  requiredFieldEnd: 'law',
};

export const translations = {
  accordion,
  contactForm,
};

/**
 * Get a translation key from the translations object
 * @param key The key to search for
 * @param fallback The fallback that should be displayed if the key cannot be found
 */
export const getTranslation = (key: string, fallback = 'Not found', debug = true) => {
  const data = key
    .split('.')
    .reduce((
      prev: { [x: string]: any; },
      current: string | number,
    ) => prev?.[current], translations);
  return data ?? `${fallback}${debug ? ` (Key: ${key})` : ''}`;
};
