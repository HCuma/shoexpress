"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const sizesMap = {
  erkek: [40, 41, 42, 43, 44, 45],
  kadin: [36, 37, 38, 39, 40, 41],
  cocuk: [28, 29, 30, 31, 32, 33, 34, 35],
};

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const sizes = sizesMap[product.category as keyof typeof sizesMap] || [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedSize) {
      addToCart({
        ...product,
        size: selectedSize,
        quantity: 1,
      });
      setIsCartOpen(true);
      setShowSizes(false);
      setSelectedSize(null);
    } else {
      setShowSizes(true);
    }
  };

  const handleSizeSelect = (e: React.MouseEvent, size: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  return (
    <Link href={`/urun/${product.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
        <div className="cursor-pointer">
          <div className="aspect-square overflow-hidden rounded-lg mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </div>
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.color}</p>
          <p className="font-bold text-lg">{product.price} TL</p>
        </div>

        {showSizes && (
          <div className="mt-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-wrap gap-2 mb-4">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeSelect(e, size)}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  } transition-colors flex items-center justify-center text-sm font-semibold`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          className={`w-full mt-4 py-3 px-4 rounded-full font-semibold transition-colors ${
            showSizes && !selectedSize
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
          disabled={showSizes && !selectedSize}
        >
          {showSizes
            ? selectedSize
              ? "Sepete Ekle"
              : "Beden Seçiniz"
            : "Sepete Ekle"}
        </button>
      </div>
    </Link>
  );
}
