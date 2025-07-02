import React from 'react';

interface DynamicFrameProp {
  colsNumber: number;
  itemsLength: number;
  ratio: number;
  width: number; 
  isSelected?: boolean;
  onClick?: () => void;
  images?: string[];
}

const DynamicFrame: React.FC<DynamicFrameProp> = ({
  colsNumber,
  itemsLength,
  ratio,
  width,
  isSelected = false,
  onClick,
  images = [],
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative grid bg-black p-1 gap-1 cursor-pointer rounded-md transition-transform ${isSelected ? 'ring-4 ring-blue-500 scale-105' : 'ring-2 ring-transparent'}`}
      style={{
        gridTemplateColumns: `repeat(${colsNumber}, 1fr)`,
      }}
    >
      {images && images.length > 0
        ? images.map((img, i) => (
            <div key={i} className="bg-white flex items-center justify-center overflow-hidden" style={{ aspectRatio: ratio, width: width }}>
              <img src={img} alt={`img-${i}`} className="w-full h-full object-contain" />
            </div>
          ))
        : Array.from({ length: itemsLength }).map((_, i) => (
            <div
              key={i}
              className="bg-white"
              style={{ aspectRatio: ratio, width: width }}
            />
          ))}

      <div
        className="bg-white aspect-square w-4 absolute bottom-1 right-1"
        style={{ gridColumn: `span ${colsNumber}` }}
      />
    </div>
  );
};

export default DynamicFrame;