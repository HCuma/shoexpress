"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const router = useRouter();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    totalPrice,
  } = useCart();

  // Fiyat formatlama fonksiyonu
  const formatPrice = (price: string, quantity: number) => {
    const numericPrice = parseFloat(
      price.replace(/[^\d,]/g, "").replace(",", ".")
    );
    return (numericPrice * quantity).toFixed(2);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/odeme");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute right-0 top-0 h-full w-full max-w-md">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="h-full bg-white shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Sepetim</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Trash2 className="w-12 h-12 mb-2" />
                <p>Sepetiniz boş</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex gap-4 bg-gray-50 p-3 rounded-xl"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Beden: {item.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="font-semibold">
                    {formatPrice(item.price, item.quantity)} TL
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Toplam</span>
                <span className="font-bold text-lg">
                  {totalPrice.toFixed(2)} TL
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="flex-1 py-3 px-4 rounded-full bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-colors"
                >
                  Sepeti Boşalt
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 py-3 px-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-colors"
                >
                  Ödemeye Geç
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
