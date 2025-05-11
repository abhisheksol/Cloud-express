import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/theme';

interface TextInputProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  themeClasses: {
    input: string;
  };
}

const TextInput: React.FC<TextInputProps> = ({ control, errors, themeClasses }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Custom Text</h3>
      <Controller
        name="text"
        control={control}
        rules={{ maxLength: 100 }}
        render={({ field }) => (
          <textarea
            {...field}
            rows={3}
            placeholder="Enter text for your t-shirt (max 3 lines)"
            className={`w-full p-4 rounded-xl border transition-colors duration-300 text-base bg-white/60 backdrop-blur-md ${themeClasses.input} ${errors.text ? 'border-red-500' : ''}`}
          />
        )}
      />
      <p className="text-sm mt-2 opacity-70">Press Enter for new line. Maximum 3 lines.</p>
      {errors.text && <p className="text-red-500 text-xs mt-2">Text is too long</p>}
    </div>
  );
};

export default TextInput;