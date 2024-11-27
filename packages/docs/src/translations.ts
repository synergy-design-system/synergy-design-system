/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable sort-keys */
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

export const appShell = {
  appName: 'Synergy',
  footer: {
    conditions: 'Terms and conditions',
    copyright: '© 2024 SICK AG',
    imprint: 'Imprint',
    privacy: 'Privacy Policy',
    terms: 'Terms of use',
  },
  metaNavigation: {
    menuItem: 'Menu Item',
  },
  navigation: {
    applications: 'Applications',
    cloud: 'Cloud',
    documents: 'Documents',
    feedback: 'Feedback',
    home: 'Home',
    settings: 'Settings',
    logout: 'Logout',
    start: 'Start',
    teams: 'Teams',
    workspaces: 'Workspaces',
  },
  mainSlot: 'Replace this slot',
};

export const table = {
  header: {
    name: 'Name',
    customer: 'Customer',
    location: 'Location',
    contractStart: 'Contract Start',
  },
  body: {
    name: 'Max Mustermann',
    customer: 'Muster AG',
    location: 'Hamburg, Düsseldorf, Freiburg',
    contractStart: '20.01.2023',
  },
  productTable: {
    header: {
      product: 'Product',
      availability: 'Availability',
      earliestDelivery: 'Earliest delivery',
      unitPrice: 'Unit Price',
      totalPrice: 'Total Price',
    },
    body: {
      productDetails: 'Product details',
      productName: 'Product Name',
      partNo: 'Part no. XXXXXXX',
      availability: 'available',
      earliestDelivery: '2024-12-12',
      listPrice: {
        text: 'List price:',
        unitPrice: '106,00 €',
        totalPrice: '318,00 €',
      },
      netPrice: {
        text: 'Your net price:',
        unitPrice: '96,00 €',
        totalPrice: '288,00 €',
      },
      button: {
        cart: 'Add to cart',
        request: 'Request quote',
      },
    },
  },
};

export const footer = {
  linksName: {
    imprint: 'Imprint',
    termsConditions: 'Terms and conditions',
    termsOfUse: 'Terms of use',
    privacyPolicy: 'Privacy Policy',
  },
  linksHref: {
    imprint: 'https://www.sick.com/imprint',
    termsConditions: 'https://www.sick.com/tac',
    termsOfUse: 'https://www.sick.com/terms-of-use',
    privacyPolicy: 'https://www.sick.com/dataprotection',
  },
  copyRight: '© 2024 SICK AG',
};

export const translations = {
  appShell,
  contactForm,
  footer,
  table,
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
