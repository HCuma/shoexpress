"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import SizeSelector from "./SizeSelector";
import { Heart, Share2, ShoppingBag, Truck } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = React.useState<number | null>(null);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if (selectedSize === null) {
      alert("Lütfen bir beden seçiniz");
      return;
    }

    // Stok kontrolü
    const availableStock = product.sizeStock[selectedSize] || 0;
    if (availableStock < quantity) {
      alert(
        `Üzgünüz, bu beden için sadece ${availableStock} adet stok bulunmaktadır.`
      );
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.color,
      size: selectedSize,
      quantity: quantity,
      category: product.category,
      description: product.description,
      material: product.material,
    });
    setIsCartOpen(true);
  };

  const handleQuantityChange = (change: number) => {
    if (!selectedSize) return;

    const newQuantity = quantity + change;
    const availableStock = product.sizeStock[selectedSize] || 0;

    if (newQuantity >= 1 && newQuantity <= availableStock) {
      setQuantity(newQuantity);
    }
  };

  // Seçili beden için stok kontrolü
  const getStockStatus = (size: number) => {
    const stock = product.sizeStock[size] || 0;
    if (stock === 0) return "Stokta yok";
    if (stock <= 5) return `Son ${stock} ürün`;
    return `Stokta ${stock} adet`;
  };

  const isMaxQuantity = React.useMemo(() => {
    if (!selectedSize) return true;
    const maxStock = product.sizeStock[selectedSize] || 0;
    return quantity >= maxStock;
  }, [selectedSize, quantity, product.sizeStock]);

  const hasStock = React.useMemo(() => {
    if (!selectedSize) return false;
    return (product.sizeStock[selectedSize] || 0) > 0;
  }, [selectedSize, product.sizeStock]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Sol Taraf - Ürün Görseli */}
        <div className="space-y-4">
          <div className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        </div>

        {/* Sağ Taraf - Ürün Bilgileri */}
        <div className="space-y-8">
          {/* Başlık ve Fiyat */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-3xl font-semibold text-black">
              {product.price} ₺
            </p>
          </div>

          {/* Renk Bilgisi */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Renk</h3>
            <p className="text-gray-600">{product.color}</p>
          </div>

          {/* Beden Seçimi */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700">Beden Seç</h3>
              {selectedSize && (
                <span className="text-sm text-gray-600">
                  {getStockStatus(selectedSize)}
                </span>
              )}
            </div>
            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={(size) => {
                setSelectedSize(size);
                const availableStock = product.sizeStock[size] || 0;
                if (quantity > availableStock) {
                  setQuantity(availableStock);
                }
              }}
              stockInfo={product.sizeStock}
            />
          </div>

          {/* Miktar Seçimi */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Miktar</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || !selectedSize}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  quantity <= 1 || !selectedSize
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 hover:border-black text-gray-600"
                }`}
              >
                -
              </button>
              <span className="text-xl font-medium w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={!selectedSize || isMaxQuantity}
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                  !selectedSize || isMaxQuantity
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 hover:border-black text-gray-600"
                }`}
              >
                +
              </button>
            </div>
          </div>

          {/* Aksiyon Butonları */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !hasStock}
              className={`w-full py-4 rounded-full font-semibold transition-all ${
                !selectedSize || !hasStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {!selectedSize
                ? "Beden Seçiniz"
                : !hasStock
                ? "Stokta Yok"
                : "Sepete Ekle"}
            </button>
            <button className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-black text-gray-600">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-14 h-14 rounded-full border border-gray-300 flex items-center justify-center hover:border-black text-gray-600">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Kargo Bilgisi */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Truck className="text-black w-6 h-6" />
            <div>
              <p className="font-medium">Ücretsiz Kargo</p>
              <p className="text-sm text-gray-600">
                2-4 iş günü içinde teslimat
              </p>
            </div>
          </div>

          {/* Ürün Detayları */}
          <div className="space-y-6 border-t pt-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Ürün Detayları
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Özellikler
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Materyal:</span>
                  {product.material}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Kategori:</span>
                  {product.category}
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Stok Durumu:</span>
                  <span
                    className={`${
                      hasStock ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {hasStock ? "Stokta var" : "Stokta yok"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
