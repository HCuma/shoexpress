"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, getProductStock } = useCart();

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (selectedSize) {
        const stock = getProductStock(product.id, selectedSize);
        if (stock <= 0) {
          toast.error("Bu beden için stok bulunmamaktadır.");
          return;
        }

        addToCart({
          ...product,
          size: selectedSize,
          quantity: 1,
        });
        setShowSizes(false);
        setSelectedSize(null);
      } else {
        setShowSizes(true);
      }
    },
    [addToCart, product, selectedSize, getProductStock]
  );

  const handleSizeSelect = useCallback((e: React.MouseEvent, size: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  }, []);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFavorite((prev) => !prev);
      toast.success(
        isFavorite ? "Favorilerden çıkarıldı" : "Favorilere eklendi"
      );
    },
    [isFavorite]
  );

  const handleShare = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(
        window.location.origin + `/urun/${product.id}`
      );
      toast.success("Ürün linki kopyalandı!");
    },
    [product.id]
  );

  const isStockAvailable = useCallback(
    (size: number) => {
      const stock = getProductStock(product.id, size);
      return stock > 0;
    },
    [product.id, getProductStock]
  );

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Link href={`/urun/${product.id}`}>
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 relative h-full flex flex-col">
          <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
            >
              <Share2 className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>

          <div className="cursor-pointer flex-grow">
            <div className="aspect-square overflow-hidden rounded-xl mb-4 relative group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority={false}
                loading="lazy"
                quality={75}
                className={`object-cover transition-transform duration-500 ${
                  isHovered ? "scale-110" : "scale-100"
                }`}
              />
              {product.price.includes("indirim") && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  İndirim
                </div>
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-2 line-clamp-1">{product.color}</p>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-lg">{product.price} TL</p>
              {product.price.includes("indirim") && (
                <p className="text-sm text-gray-500 line-through">
                  {parseInt(product.price) * 1.2} TL
                </p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {showSizes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.sizes.map((size) => {
                    const stock = getProductStock(product.id, size);
                    const hasStock = isStockAvailable(size);

                    return (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e: React.MouseEvent) =>
                          hasStock && handleSizeSelect(e, size)
                        }
                        disabled={!hasStock}
                        className={`w-10 h-10 rounded-lg border-2 relative ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : !hasStock
                            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                            : "border-gray-300 hover:border-black"
                        } transition-all flex items-center justify-center text-sm font-semibold hover:shadow-md`}
                      >
                        <span>{size}</span>
                        {stock <= 5 && stock > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                            {stock}
                          </span>
                        )}
                        {!hasStock && (
                          <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs px-1 rounded-full">
                            Tükendi
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={Boolean(
              showSizes &&
                (!selectedSize ||
                  (selectedSize && !isStockAvailable(selectedSize)))
            )}
            className={`w-full mt-4 py-3 px-4 rounded-full font-semibold transition-all ${
              showSizes && !selectedSize
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : selectedSize && !isStockAvailable(selectedSize)
                ? "bg-red-100 text-red-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 hover:shadow-lg"
            }`}
          >
            {showSizes
              ? !selectedSize
                ? "Beden Seçiniz"
                : !isStockAvailable(selectedSize)
                ? "Stokta Yok"
                : "Sepete Ekle"
              : "Sepete Ekle"}
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
}
