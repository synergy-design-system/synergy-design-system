import {
  type DemoFormData,
} from '../types.js';

export const initialFullFormData: DemoFormData = {
  code: '',
  comment: '',
  date: '',
  donations: '2000 4000',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
  name: '',
  nationality: '',
  newsletterAngular: false,
  newsletterBeta: false,
  newsletterReact: false,
  newsletterStandard: false,
  newsletterVanilla: false,
  newsletterVue: false,
  password: 'invalid',
  phone: '',
  role: '',
  topics: [],
};

export const initialValidateFormData: Partial<DemoFormData> = {
  code: '',
  comment: '',
  date: '',
  email: '',
  files: undefined,
  gender: '',
  happiness: '5',
  name: '',
  nationality: '',
  newsletterBeta: false,
  newsletterStandard: false,
  password: 'invalid',
  role: '',
};
