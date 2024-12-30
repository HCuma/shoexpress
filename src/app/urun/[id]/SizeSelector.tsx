"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface SizeSelectorProps {
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    color: string;
    category: string;
  };
}

const sizesMap = {
  erkek: [40, 41, 42, 43, 44, 45],
  kadin: [36, 37, 38, 39, 40, 41],
  cocuk: [28, 29, 30, 31, 32, 33, 34, 35],
};

export default function SizeSelector({ product }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { addToCart, setIsCartOpen } = useCart();

  const sizes = sizesMap[product.category as keyof typeof sizesMap] || [];

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart({
        ...product,
        size: selectedSize,
        quantity: 1,
      });
      setIsCartOpen(true);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Beden</h3>
        <div className="flex flex-wrap gap-4">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-lg border-2 ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300 hover:border-black"
              } transition-colors flex items-center justify-center font-semibold`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className={`w-full bg-black text-white py-4 px-8 rounded-full transition-colors text-lg font-semibold ${
          !selectedSize
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-800 cursor-pointer"
        }`}
        disabled={!selectedSize}
      >
        {selectedSize ? "Sepete Ekle" : "Beden Seçiniz"}
      </button>
    </div>
  );
}
