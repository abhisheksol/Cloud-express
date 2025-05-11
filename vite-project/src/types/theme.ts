export type Theme = 'light' | 'dark' | 'colorful';

export interface ThemeClasses {
  container: string;
  header: string;
  card: string;
  input: string;
  select: string;
  button: string;
  imageUpload: string;
}

export interface FormData {
  height: number;
  weight: number;
  build: string;
  text: string;
}

export interface ValidationMessages {
  height: {
    required: string;
    min: string;
    max: string;
  };
  weight: {
    required: string;
    min: string;
    max: string;
  };
} 