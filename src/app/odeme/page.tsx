"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function OdemePage() {
  const { cartItems, totalPrice } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/");
    }
  }, [cartItems.length, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada ödeme işlemleri yapılacak
    router.push("/");
  };

  return (
    <div className="min-h-screen relative pt-8 bg-gradient-to-br from-gray-50 to-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.3,
        }}
      />

      <div className="container relative mx-auto px-4 py-8 md:py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Geri Dön</span>
        </motion.button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Ödeme Bilgileri
          </h1>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Beden: {item.size} | Adet: {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {(
                      parseFloat(
                        item.price.replace(/[^\d,]/g, "").replace(",", ".")
                      ) * item.quantity
                    ).toFixed(2)}{" "}
                    TL
                  </span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between items-center font-bold">
                <span>Toplam</span>
                <span>{totalPrice.toFixed(2)} TL</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Kişisel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Adres Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Adres
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">İl</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      İlçe
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-xl font-semibold">Kart Bilgileri</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="Kart üzerindeki ismi giriniz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Son Kullanma Tarihi
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      placeholder="AA/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
            >
              Siparişi Tamamla ({totalPrice.toFixed(2)} TL)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
