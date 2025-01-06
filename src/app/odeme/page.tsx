"use client";

import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    // Ödeme işlemi simülasyonu
    toast.success("Ödeme başarıyla tamamlandı!");
    clearCart(); // Sepeti temizle
    router.push("/"); // Ana sayfaya yönlendir
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Sepetiniz Boş</h1>
            <p className="text-gray-600 mb-8">
              Ödeme yapmak için sepetinizde ürün bulunmalıdır.
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Alışverişe Başla
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Ödeme</h1>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Beden: {item.size} | Adet: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {(
                      parseFloat(
                        item.price.replace(/[^\d,]/g, "").replace(",", ".")
                      ) * item.quantity
                    ).toFixed(3)}{" "}
                    TL
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Toplam</p>
                  <p className="font-semibold">{totalPrice.toFixed(3)} TL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Teslimat Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Adres</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kart Üzerindeki İsim
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Kart Numarası
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Son Kullanma Tarihi
                  </label>
                  <input
                    type="text"
                    placeholder="AA/YY"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            Ödemeyi Tamamla ({totalPrice.toFixed(3)} TL)
          </button>
        </div>
      </main>
    </div>
  );
}
