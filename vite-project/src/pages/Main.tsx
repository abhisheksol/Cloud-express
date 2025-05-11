import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { THEMES, DEFAULT_VALUES, VALIDATION_MESSAGES } from '../constants/theme';
import type { Theme, FormData, ThemeClasses } from '../types/theme';
import TShirtPreview from '../components/TShirtPreview';
import SizeSpecifications from '../components/SizeSpecifications';
import ImageUpload from '../components/ImageUpload';
import TextInput from '../components/TextInput';
import TShirtSelector from '../components/TShirtSelector';
import { TSHIRT_STYLES } from '../components/TShirtSelector';

const Main: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES.LIGHT);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('/api/placeholder/300/400');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(TSHIRT_STYLES[0].id);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: DEFAULT_VALUES
  });

  const textValue = watch('text');
  
  // Handle theme switching with Alt+Q
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'q') {
        setCurrentTheme(prevTheme => {
          const themes = Object.values(THEMES);
          const currentIndex = themes.indexOf(prevTheme);
          const nextIndex = (currentIndex + 1) % themes.length;
          return themes[nextIndex];
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setPreviewImage(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setUploadedImage(result);
        setPreviewImage(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', { ...data, image: uploadedImage });
    alert('Form submitted! Check console for details.');
  };
  
  // Dynamic theme-based class names
  const getThemeClasses = (): ThemeClasses => {
    switch (currentTheme) {
      case THEMES.DARK:
        return {
          container: 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ',
          header: 'text-cyan-300 drop-shadow',
          card: 'bg-gray-800/80 border-cyan-900',
          input: 'bg-gray-700/80  border-cyan-700 placeholder-gray-400',
          select: 'bg-gray-700/80  border-cyan-700',
          button: 'bg-cyan-500 hover:bg-cyan-600 text-gray-900',
          imageUpload: 'border-dashed border-cyan-700 bg-gray-900/60'
        };
      case THEMES.COLORFUL:
        return {
          container: 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900',
          header: 'text-pink-700 drop-shadow',
          card: 'bg-white/80 border-pink-300 shadow-lg',
          input: 'bg-pink-100/80 text-pink-900 border-pink-300 placeholder-pink-400',
          select: 'bg-pink-100/80 text-pink-900 border-pink-300',
          button: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-md',
          imageUpload: 'border-dashed border-pink-400 bg-pink-50/60'
        };
      default: // LIGHT theme
        return {
          container: 'bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800',
          header: 'text-indigo-700 drop-shadow',
          card: 'bg-white/80 border-indigo-200 shadow',
          input: 'bg-white/80 text-gray-800 border-indigo-200 placeholder-gray-400',
          select: 'bg-white/80 text-gray-800 border-indigo-200',
          button: 'bg-indigo-500 hover:bg-indigo-600 text-white shadow',
          imageUpload: 'border-dashed border-indigo-200 bg-indigo-50/60'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  // Split text into lines for t-shirt preview
  const textLines = textValue ? textValue.split('\n').slice(0, 3) : [];
  
  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center transition-colors duration-300 ${themeClasses.container} font-sans`}
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="w-full max-w-6xl">
        <h1
          className={`text-4xl md:text-5xl font-display font-extrabold mb-10 text-center transition-colors duration-300 tracking-tight drop-shadow-lg ${themeClasses.header}`}
        >
          POD T-Shirt Customizer
        </h1>

        <div className="flex flex-col md:flex-row gap-10">
          <TShirtPreview
            previewImage={previewImage}
            textLines={textLines}
            selectedStyle={selectedStyle}
            themeClasses={themeClasses}
          />

          <div
            className={`flex-1 p-8 rounded-3xl shadow-2xl border transition-colors duration-300 ${themeClasses.card} bg-white/70 backdrop-blur-md`}
            style={{
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
            }}
          >
            <div>
              <h2 className="text-2xl font-display font-bold mb-6 tracking-tight">Customize Your T-Shirt</h2>

              <TShirtSelector
                selectedStyle={selectedStyle}
                onStyleChange={setSelectedStyle}
                themeClasses={themeClasses}
              />

              <SizeSpecifications
                control={control}
                errors={errors}
                themeClasses={themeClasses}
                validationMessages={VALIDATION_MESSAGES}
              />

              <ImageUpload
                uploadedImage={uploadedImage}
                isUploading={isUploading}
                onFileChange={handleFileChange}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                themeClasses={themeClasses}
              />

              <TextInput
                control={control}
                errors={errors}
                themeClasses={themeClasses}
              />

              <button
                onClick={handleSubmit(onSubmit)}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold transition-all duration-300 ${themeClasses.button} font-display tracking-wide shadow-md hover:scale-105 active:scale-95`}
                style={{
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.10)'
                }}
              >
                Add to Cart
              </button>

              <p className="text-center mt-6 text-sm opacity-80 font-medium">
                <span className="inline-block px-2 py-1 rounded bg-white/60 backdrop-blur text-gray-700 shadow-sm">
                  Press <kbd className="font-bold">Alt</kbd>+<kbd className="font-bold">Q</kbd> to switch themes
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;