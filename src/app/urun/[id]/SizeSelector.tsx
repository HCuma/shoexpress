"use client";

import React from "react";

interface SizeSelectorProps {
  sizes: number[];
  selectedSize: number | null;
  onSelectSize: (size: number) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="grid grid-cols-6 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelectSize(size)}
          className={`h-12 rounded-lg border text-center transition-all ${
            selectedSize === size
              ? "border-black bg-black text-white font-medium"
              : "border-gray-300 hover:border-black text-gray-700 hover:bg-gray-50"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
