"use client";

import { motion } from "framer-motion";

interface SizeSelectorProps {
  category: string;
  selectedSize: number | null;
  onSelect: (size: number) => void;
}

const sizesMap = {
  erkek: [40, 41, 42, 43, 44, 45],
  kadin: [36, 37, 38, 39, 40, 41],
  cocuk: [28, 29, 30, 31, 32, 33, 34, 35],
};

export default function SizeSelector({
  category,
  selectedSize,
  onSelect,
}: SizeSelectorProps) {
  const sizes = sizesMap[category as keyof typeof sizesMap] || [];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`h-12 rounded-xl border-2 transition-all flex items-center justify-center text-sm font-semibold hover:shadow-md
            ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-black"
            }
          `}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
