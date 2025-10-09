import type { FormStatus } from './types.js';

export const statusSuccess: FormStatus = {
  icon: 'check_circle',
  message: 'Your data was successfully submitted!',
  type: 'success',
};

export const statusWarning: FormStatus = {
  icon: 'warning',
  message: 'Unknown status! Please fill out the form.',
  type: 'warning',
};

export const statusError: FormStatus = {
  icon: 'error',
  message: 'Your data could not be submitted! Please provide all required information',
  type: 'danger',
};
