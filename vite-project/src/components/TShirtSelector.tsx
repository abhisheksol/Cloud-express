import React from 'react';

export interface TShirtStyle {
  id: string;
  name: string;
  image: string;
  price: number;
}

export const TSHIRT_STYLES: TShirtStyle[] = [
  {
    id: 'classic',
    name: 'Classic Fit',
    image: '/images/tshirts/classic.png',
    price: 24.99
  },
  {
    id: 'slim',
    name: 'Slim Fit',
    image: '../images/tshirts/slim.png',
    price: 26.99
  },
  {
    id: 'oversized',
    name: 'Oversized',
    image: '/images/tshirts/oversized.png',
    price: 29.99
  },
  {
    id: 'vneck',
    name: 'V-Neck',
    image: '/images/tshirts/vneck.png',
    price: 25.99
  }
];

interface TShirtSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  themeClasses: {
    card: string;
    input: string;
  };
}

const TShirtSelector: React.FC<TShirtSelectorProps> = ({
  selectedStyle,
  onStyleChange,
  themeClasses
}) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">T-Shirt Style</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {TSHIRT_STYLES.map((style) => (
          <div
            key={style.id}
            className={`cursor-pointer rounded-2xl border-2 bg-white/70 backdrop-blur-md shadow-md transition-all duration-300 flex flex-col items-center hover:scale-105 ${
              selectedStyle === style.id
                ? 'border-blue-500 ring-2 ring-blue-400 scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStyleChange(style.id)}
            style={{
              boxShadow: selectedStyle === style.id
                ? '0 4px 16px 0 rgba(59,130,246,0.10)'
                : '0 2px 8px 0 rgba(0,0,0,0.04)'
            }}
          >
            <div className="aspect-[3/4] w-full flex items-center justify-center p-2">
              <img
                src={style.image}
                alt={style.name}
                className="w-20 h-24 object-contain"
              />
            </div>
            <div className="p-2 text-center">
              <p className="font-semibold text-base">{style.name}</p>
              <p className="text-sm text-gray-600">${style.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TShirtSelector;