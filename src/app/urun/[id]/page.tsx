"use client";

import { products } from "@/data/products";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import SizeSelector from "./SizeSelector";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  useEffect(() => {
    // Beden değiştiğinde miktarı 1'e resetle
    setQuantity(1);
  }, [selectedSize]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <p className="text-center text-gray-500">Ürün bulunamadı.</p>
        </main>
      </div>
    );
  }

  const getStockStatus = (size: number | null) => {
    if (!size) return null;
    const stock = product.sizeStock[size] || 0;
    if (stock === 0)
      return { status: "out", message: "Stokta Yok", color: "red" };
    if (stock <= 5)
      return { status: "low", message: `Son ${stock} Ürün!`, color: "orange" };
    return {
      status: "in",
      message: `Stokta ${stock} Adet Var`,
      color: "green",
    };
  };

  const stockInfo = getStockStatus(selectedSize);
  const maxQuantity = selectedSize ? product.sizeStock[selectedSize] || 0 : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Lütfen bir beden seçin");
      return;
    }

    const sizeStock = product.sizeStock[selectedSize] || 0;
    if (sizeStock < quantity) {
      toast.error("Seçilen bedende yeterli stok bulunmuyor");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      color: product.color,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: quantity,
      category: product.category,
      description: product.description,
      material: product.material,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Fotoğraf Galerisi */}
          <div className="w-full lg:w-1/2 space-y-4">
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-white cursor-pointer"
              onClick={() => setShowLightbox(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer ${
                    selectedImage === index
                      ? "ring-2 ring-black"
                      : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Görsel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Ürün Bilgileri */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-500 mt-2">{product.color}</p>
            </div>

            <p className="text-2xl font-semibold">{product.price} TL</p>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Beden Seçimi</h2>
                {stockInfo && (
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      stockInfo.status === "out"
                        ? "bg-red-100 text-red-600"
                        : stockInfo.status === "low"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {stockInfo.message}
                  </span>
                )}
              </div>
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                stockInfo={product.sizeStock}
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Adet</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={!selectedSize}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                    !selectedSize
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(quantity + 1, maxQuantity))
                  }
                  disabled={!selectedSize || quantity >= maxQuantity}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                    !selectedSize || quantity >= maxQuantity
                      ? "border-gray-100 text-gray-300 cursor-not-allowed"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || quantity > maxQuantity}
              className={`w-full py-4 rounded-full font-semibold transition-all ${
                !selectedSize || quantity > maxQuantity
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {!selectedSize
                ? "Beden Seçiniz"
                : quantity > maxQuantity
                ? "Stokta Yok"
                : "Sepete Ekle"}
            </button>

            <div className="space-y-4 pt-8 border-t">
              <h2 className="text-lg font-semibold">Ürün Detayları</h2>
              <p className="text-gray-600">{product.description}</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="font-medium">Materyal:</span>
                  <span className="text-gray-600">{product.material}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Renk:</span>
                  <span className="text-gray-600">{product.color}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-medium">Kategori:</span>
                  <span className="text-gray-600">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 p-8 flex items-center justify-center"
            onClick={() => setShowLightbox(false)}
          >
            <div className="relative max-w-4xl mx-auto">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
