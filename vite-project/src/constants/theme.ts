import { ValidationMessages } from '../types/theme';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  COLORFUL: 'colorful'
} as const;

export const DEFAULT_VALUES = {
  height: 180,
  weight: 80,
  build: 'athletic',
  text: ''
} as const;

export const VALIDATION_MESSAGES: ValidationMessages = {
  height: {
    required: 'Height is required',
    min: 'Height must be at least 100cm',
    max: 'Height must be less than 250cm'
  },
  weight: {
    required: 'Weight is required',
    min: 'Weight must be at least 30kg',
    max: 'Weight must be less than 200kg'
  }
}; 