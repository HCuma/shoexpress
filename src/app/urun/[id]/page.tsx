"use client";

import { products } from "@/data/products";
import SizeSelector from "./SizeSelector";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen bir beden seçin");
      return;
    }

    addToCart({
      ...product,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Ürün Görseli */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          {/* Ürün Detayları */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.color}</p>
            <p className="text-2xl font-semibold">₺{product.price}</p>

            {/* Beden Seçici */}
            <div className="space-y-2">
              <p className="font-medium">Beden</p>
              <SizeSelector
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />
            </div>

            {/* Sepete Ekle Butonu */}
            <button
              onClick={handleAddToCart}
              className="mt-6 w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800"
            >
              Sepete Ekle
            </button>

            {/* Ürün Açıklaması */}
            <div className="mt-8 space-y-4 border-t pt-8">
              <h2 className="text-xl font-semibold">Ürün Açıklaması</h2>
              <p className="text-gray-600">
                Bu şık ve rahat ayakkabı, günlük kullanım için idealdir. Yüksek
                kaliteli malzemeler ve özenli işçilik ile üretilmiştir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
