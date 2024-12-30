"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface SizeSelectorProps {
  selectedSize: number | null;
  onSelectSize: (size: number) => void;
}

export default function SizeSelector({
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  return (
    <div className="grid grid-cols-5 gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelectSize(size)}
          className={`rounded-md border p-2 text-center transition-colors ${
            selectedSize === size
              ? "border-black bg-black text-white"
              : "border-gray-300 hover:border-black"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
