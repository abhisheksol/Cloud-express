import React from 'react';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormData, ValidationMessages } from '../types/theme';

interface SizeSpecificationsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  themeClasses: {
    input: string;
    select: string;
  };
  validationMessages: ValidationMessages;
}

const SizeSpecifications: React.FC<SizeSpecificationsProps> = ({
  control,
  errors,
  themeClasses,
  validationMessages
}) => {
  return (
    <div className="mb-8 p-6 border rounded-2xl bg-white/60 backdrop-blur-md shadow">
      <h3 className="text-lg font-semibold mb-4">Size Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Height (cm)</label>
          <Controller
            name="height"
            control={control}
            rules={{ required: true, min: 100, max: 250 }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`w-full p-3 rounded-lg border transition-all duration-300 text-base ${themeClasses.input} ${errors.height ? 'border-red-500 shake' : ''}`}
              />
            )}
          />
          {errors.height && (
            <p className="text-red-500 text-xs mt-2">
              {validationMessages.height[errors.height.type as keyof typeof validationMessages.height]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <Controller
            name="weight"
            control={control}
            rules={{ required: true, min: 30, max: 200 }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`w-full p-3 rounded-lg border transition-colors duration-300 text-base ${themeClasses.input} ${errors.weight ? 'border-red-500' : ''}`}
              />
            )}
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-2">
              {validationMessages.weight[errors.weight.type as keyof typeof validationMessages.weight]}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Build</label>
          <Controller
            name="build"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full p-3 rounded-lg border transition-colors duration-300 text-base ${themeClasses.select}`}
              >
                <option value="lean">Lean</option>
                <option value="regular">Regular</option>
                <option value="athletic">Athletic</option>
                <option value="big">Big</option>
              </select>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SizeSpecifications;