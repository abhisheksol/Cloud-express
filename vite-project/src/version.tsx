import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Theme constants
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  COLORFUL: 'colorful'
};

const DEFAULT_VALUES = {
  height: 180,
  weight: 80,
  build: 'athletic',
  text: ''
};

const App = () => {
  // State for the currently selected theme
  const [currentTheme, setCurrentTheme] = useState(THEMES.LIGHT);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('/api/placeholder/300/400');
  const fileInputRef = useRef(null);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: DEFAULT_VALUES
  });

  const textValue = watch('text');
  
  // Handle theme switching with Alt+Q
  useEffect(() => {
    const handleKeyDown = (e) => {
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data) => {
    console.log('Form submitted:', { ...data, image: uploadedImage });
    // This would typically send the data to a backend or process it further
    alert('Form submitted! Check console for details.');
  };
  
  // Dynamic theme-based class names
  const getThemeClasses = () => {
    switch (currentTheme) {
      case THEMES.DARK:
        return {
          container: 'bg-gray-900 text-white',
          header: 'text-white',
          card: 'bg-gray-800 border-gray-700',
          input: 'bg-gray-700 text-white border-gray-600',
          select: 'bg-gray-700 text-white border-gray-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          imageUpload: 'border-dashed border-gray-600 bg-gray-800'
        };
      case THEMES.COLORFUL:
        return {
          container: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          header: 'text-yellow-300',
          card: 'bg-gradient-to-r from-purple-500 to-pink-500 border-yellow-300',
          input: 'bg-purple-800 text-white border-yellow-300',
          select: 'bg-purple-800 text-white border-yellow-300',
          button: 'bg-yellow-400 hover:bg-yellow-500 text-purple-900',
          imageUpload: 'border-dashed border-yellow-300 bg-purple-700'
        };
      default: // LIGHT theme
        return {
          container: 'bg-gray-100 text-gray-800',
          header: 'text-gray-800',
          card: 'bg-white border-gray-300',
          input: 'bg-white text-gray-800 border-gray-300',
          select: 'bg-white text-gray-800 border-gray-300',
          button: 'bg-blue-500 hover:bg-blue-600',
          imageUpload: 'border-dashed border-gray-300 bg-gray-50'
        };
    }
  };
  
  const themeClasses = getThemeClasses();
  
  // Split text into lines for t-shirt preview
  const textLines = textValue ? textValue.split('\n').slice(0, 3) : [];
  
  return (
    <div className={`min-h-screen p-6 flex flex-col items-center transition-colors duration-300 ${themeClasses.container}`}>
      <div className="w-full max-w-6xl">
        <h1 className={`text-3xl font-bold mb-8 text-center transition-colors duration-300 ${themeClasses.header}`}>
          POD T-Shirt Customizer
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* T-shirt Preview Area */}
          <div className={`flex-1 p-6 rounded-lg shadow-lg border transition-colors duration-300 ${themeClasses.card}`}>
            <h2 className="text-xl font-semibold mb-4">Preview</h2>
            <div className="relative w-full aspect-[3/4] bg-white rounded-lg overflow-hidden">
              {/* T-shirt base */}
              <div className="absolute inset-0 bg-white">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <svg viewBox="0 0 300 400" className="w-full h-full">
                    <path 
                      d="M100,50 L50,120 L50,350 L250,350 L250,120 L200,50 Z" 
                      fill="#f8f8f8" 
                      stroke="#cccccc" 
                      strokeWidth="2"
                    />
                    <path 
                      d="M100,50 L120,100 L180,100 L200,50" 
                      fill="none" 
                      stroke="#cccccc" 
                      strokeWidth="2"
                    />
                    <circle cx="95" cy="50" r="15" fill="#f8f8f8" stroke="#cccccc" strokeWidth="2" />
                    <circle cx="205" cy="50" r="15" fill="#f8f8f8" stroke="#cccccc" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              
              {/* Image on t-shirt */}
              {previewImage && (
                <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-[60%] flex justify-center">
                  <img 
                    src={previewImage} 
                    alt="Custom design" 
                    className="max-h-32 object-contain"
                  />
                </div>
              )}
              
              {/* Text on t-shirt */}
              <div className="absolute bottom-[25%] left-0 w-full flex flex-col items-center">
                {textLines.map((line, index) => (
                  <div key={index} className="text-center text-black font-bold">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Customization Form */}
          <div className={`flex-1 p-6 rounded-lg shadow-lg border transition-colors duration-300 ${themeClasses.card}`}>
            <div>
              <h2 className="text-xl font-semibold mb-4">Customize Your T-Shirt</h2>
              
              {/* Size Specifications */}
              <div className="mb-6 p-4 border rounded-lg">
                <h3 className="text-lg font-medium mb-3">Size Specifications</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <Controller
                      name="height"
                      control={control}
                      rules={{ required: true, min: 100, max: 250 }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className={`w-full p-2 rounded border transition-colors duration-300 ${themeClasses.input} ${errors.height ? 'border-red-500' : ''}`}
                        />
                      )}
                    />
                    {errors.height && <p className="text-red-500 text-xs mt-1">Valid height required (100-250cm)</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <Controller
                      name="weight"
                      control={control}
                      rules={{ required: true, min: 30, max: 200 }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="number"
                          className={`w-full p-2 rounded border transition-colors duration-300 ${themeClasses.input} ${errors.weight ? 'border-red-500' : ''}`}
                        />
                      )}
                    />
                    {errors.weight && <p className="text-red-500 text-xs mt-1">Valid weight required (30-200kg)</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Build</label>
                    <Controller
                      name="build"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className={`w-full p-2 rounded border transition-colors duration-300 ${themeClasses.select}`}
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
              
              {/* Image Upload */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Design Image</h3>
                <div 
                  className={`h-32 border-2 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ${themeClasses.imageUpload}`}
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded design" className="h-full object-contain" />
                  ) : (
                    <>
                      <p className="mb-2">Drop an image here</p>
                      <p className="text-sm opacity-70">or click to upload</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>
              
              {/* Text Input */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Custom Text</h3>
                <Controller
                  name="text"
                  control={control}
                  rules={{ maxLength: 100 }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows="3"
                      placeholder="Enter text for your t-shirt (max 3 lines)"
                      className={`w-full p-3 rounded border transition-colors duration-300 ${themeClasses.input} ${errors.text ? 'border-red-500' : ''}`}
                    />
                  )}
                />
                <p className="text-sm mt-1 opacity-70">Press Enter for new line. Maximum 3 lines.</p>
                {errors.text && <p className="text-red-500 text-xs mt-1">Text is too long</p>}
              </div>
              
              {/* Submit Button */}
              <button 
                onClick={handleSubmit(onSubmit)}
                className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${themeClasses.button}`}
              >
                Add to Cart
              </button>
              
              <p className="text-center mt-4 text-sm opacity-70">
                Press Alt+Q to switch between themes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;