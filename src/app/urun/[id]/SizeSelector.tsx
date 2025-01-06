"use client";

import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface SizeSelectorProps {
  sizes: number[];
  selectedSize: number | null;
  onSelectSize: (size: number) => void;
  stockInfo: { [key: number]: number };
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
  stockInfo,
}: SizeSelectorProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {sizes.map((size) => {
        const stock = stockInfo[size] || 0;
        const isOutOfStock = stock === 0;

        return (
          <button
            key={size}
            onClick={() => !isOutOfStock && onSelectSize(size)}
            disabled={isOutOfStock}
            className={`h-12 rounded-xl border-2 transition-all flex flex-col items-center justify-center text-sm ${
              isOutOfStock
                ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                : selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-200 hover:border-black"
            }`}
          >
            <span className="font-semibold">{size}</span>
            {stock <= 5 && stock > 0 && (
              <span className="text-xs text-orange-500">Son {stock}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
