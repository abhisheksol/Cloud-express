import React, { useRef } from 'react';

interface ImageUploadProps {
  uploadedImage: string | null;
  isUploading: boolean;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  themeClasses: {
    imageUpload: string;
  };
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadedImage,
  isUploading,
  onFileChange,
  onDragOver,
  onDrop,
  themeClasses
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Design Image</h3>
      <div
        className={`h-36 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 ${themeClasses.imageUpload} bg-white/60 backdrop-blur-md hover:border-blue-400`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {isUploading ? (
          <p>Loading...</p>
        ) : uploadedImage ? (
          <img src={uploadedImage} alt="Uploaded design" className="h-full object-contain rounded-xl shadow" />
        ) : (
          <>
            <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-4 4m4-4l4 4M20 16.5V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5" />
            </svg>
            <p className="mb-1 text-base font-medium text-gray-700">Drop an image here</p>
            <p className="text-xs opacity-70">or click to upload</p>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;