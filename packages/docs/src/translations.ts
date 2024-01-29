/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sort-keys */
export const contactForm = {
  headline: 'Contact Form',
  subHeadline: 'Please enter your contact details and describe how we can support you.',
  topicLabel: 'Your question concerns?',
  topics: [
    'Inquiry/offer',
    'Orders/invoices',
    'Returns/complaint',
    'Documentation/CAD',
    'Accessories selection',
    'Application review',
    'Commissioning support',
  ],
  requestLabel: 'Describe your request',
  requestContent: 'It is very helpful if the description is as precise as possible to enable us to process your enquiry correctly. When describing applications, please specify the material/dimensions/speed, if applicable.',
  messageLabel: 'Message',
  contactDetailsLabel: 'Your contact details:',
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
  requiredFieldInfo: 'Fields marked * are required. Your data will be treated accordingly to Data protection law.',
};

export const translations = {
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
