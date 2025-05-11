import React, { useState, useRef, useEffect } from 'react';
import { TSHIRT_STYLES } from './TShirtSelector';
import type { TShirtStyle } from './TShirtSelector';

interface ImagePosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface TextPosition {
  x: number;
  y: number;
}

interface TShirtPreviewProps {
  previewImage: string;
  textLines: string[];
  selectedStyle: string;
  themeClasses: {
    card: string;
  };
}

const TShirtPreview: React.FC<TShirtPreviewProps> = ({
  previewImage,
  textLines,
  selectedStyle,
  themeClasses
}) => {
  const selectedTShirt = TSHIRT_STYLES.find(style => style.id === selectedStyle) || TSHIRT_STYLES[0];
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  });
  const [isLocked, setIsLocked] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const [textIsDragging, setTextIsDragging] = useState(false);
  const [textStartPos, setTextStartPos] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState<TextPosition>({ x: 0, y: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!previewImage || isLocked) return;
    setIsDragging(true);
    setStartPos({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!previewImage || isLocked) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX - imagePosition.x, y: touch.clientY - imagePosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || isLocked) return;
    setImagePosition(prev => ({
      ...prev,
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    }));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isLocked) return;
    const touch = e.touches[0];
    setImagePosition(prev => ({
      ...prev,
      x: touch.clientX - startPos.x,
      y: touch.clientY - startPos.y
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel events for scaling
  const handleWheel = (e: React.WheelEvent) => {
    if (!previewImage || isLocked) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setImagePosition(prev => ({
      ...prev,
      scale: Math.max(0.1, Math.min(2, prev.scale + delta))
    }));
  };

  // Handle rotation with Alt + wheel
  const handleWheelWithAlt = (e: React.WheelEvent) => {
    if (!previewImage || !e.altKey || isLocked) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -5 : 5;
    setImagePosition(prev => ({
      ...prev,
      rotation: prev.rotation + delta
    }));
  };

  // --- Text Drag Handlers ---
  const handleTextMouseDown = (e: React.MouseEvent) => {
    if (isLocked) return;
    setTextIsDragging(true);
    setTextStartPos({
      x: e.clientX - textPosition.x,
      y: e.clientY - textPosition.y
    });
  };
  const handleTextTouchStart = (e: React.TouchEvent) => {
    if (isLocked) return;
    const touch = e.touches[0];
    setTextIsDragging(true);
    setTextStartPos({
      x: touch.clientX - textPosition.x,
      y: touch.clientY - textPosition.y
    });
  };
  const handleTextMouseMove = (e: React.MouseEvent) => {
    if (!textIsDragging || isLocked) return;
    setTextPosition({
      x: e.clientX - textStartPos.x,
      y: e.clientY - textStartPos.y
    });
  };
  const handleTextTouchMove = (e: React.TouchEvent) => {
    if (!textIsDragging || isLocked) return;
    const touch = e.touches[0];
    setTextPosition({
      x: touch.clientX - textStartPos.x,
      y: touch.clientY - textStartPos.y
    });
  };
  const handleTextMouseUp = () => setTextIsDragging(false);

  // Reset image position when image changes
  useEffect(() => {
    setImagePosition({
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0
    });
    setIsLocked(false);
  }, [previewImage]);

  // Reset text position only when image or text content changes (NOT on isLocked)
  useEffect(() => {
    setTextPosition({ x: 0, y: 0 });
    setTextIsDragging(false);
  }, [previewImage, textLines.join('\n')]);

  return (
    <div
      className={`flex-1 p-8 rounded-3xl shadow-2xl border transition-colors duration-300 ${themeClasses.card} bg-white/70 backdrop-blur-md`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)'
      }}
    >
      <h2 className="text-2xl font-display font-bold mb-6 tracking-tight">Preview</h2>
      <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-2xl overflow-hidden shadow-lg">
        {/* T-shirt base */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              src={selectedTShirt.image}
              alt={selectedTShirt.name}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </div>
        </div>
        {/* Image on t-shirt */}
        {previewImage && (
          <div
            ref={imageRef}
            className={`absolute top-[25%] left-1/2 transform -translate-x-1/2 w-[60%] flex justify-center ${isLocked ? '' : 'cursor-move'}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            onWheel={handleWheelWithAlt}
            style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
          >
            <div
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imagePosition.scale}) rotate(${imagePosition.rotation}deg)`,
                transition: isDragging ? 'none' : 'transform 0.1s cubic-bezier(.4,2,.6,1)'
              }}
            >
              <img
                src={previewImage}
                alt="Custom design"
                className="max-h-32 object-contain rounded-xl shadow-md"
                draggable="false"
              />
            </div>
          </div>
        )}
        {/* Text on t-shirt */}
        <div
          ref={textRef}
          className={`absolute bottom-[25%] left-0 w-full flex flex-col items-center ${isLocked ? '' : 'cursor-move'}`}
          style={{
            transform: `translate(${textPosition.x}px, ${textPosition.y}px)`,
            transition: textIsDragging ? 'none' : 'transform 0.1s cubic-bezier(.4,2,.6,1)'
          }}
          onMouseDown={handleTextMouseDown}
          onMouseMove={handleTextMouseMove}
          onMouseUp={handleTextMouseUp}
          onMouseLeave={handleTextMouseUp}
          onTouchStart={handleTextTouchStart}
          onTouchMove={handleTextTouchMove}
          onTouchEnd={handleTextMouseUp}
        >
          {textLines.map((line, index) => (
            <div
              key={index}
              className="text-center text-black font-bold text-lg md:text-xl drop-shadow-sm bg-white/70 px-2 rounded"
              style={{ lineHeight: 1.2 }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      {/* T-shirt details */}
      <div className="mt-6 text-center">
        <h3 className="font-semibold text-lg">{selectedTShirt.name}</h3>
        <p className="text-base text-gray-700">${selectedTShirt.price}</p>
      </div>
      {/* Image adjustment instructions and Save/Edit button */}
      {previewImage && (
        <div className="mt-6 text-sm text-gray-600 flex flex-col items-center gap-2">
          {!isLocked ? (
            <>
              <p className="mb-1">Adjust the image, then <b>Save</b> to fix its position.</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="inline-block px-2 py-1 rounded bg-gray-100/80 text-gray-700">Drag to move</span>
                <span className="inline-block px-2 py-1 rounded bg-gray-100/80 text-gray-700">Scroll to resize</span>
                <span className="inline-block px-2 py-1 rounded bg-gray-100/80 text-gray-700">Alt+Scroll to rotate</span>
              </div>
              <button
                className="mt-3 px-5 py-2 bg-blue-500 text-white rounded-xl font-semibold shadow hover:bg-blue-600 transition"
                onClick={() => setIsLocked(true)}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p className="mb-1">Image position fixed. <b>Edit</b> to adjust again.</p>
              <button
                className="mt-3 px-5 py-2 bg-gray-500 text-white rounded-xl font-semibold shadow hover:bg-gray-600 transition"
                onClick={() => setIsLocked(false)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TShirtPreview;