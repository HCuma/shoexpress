"use client";

import { useCart } from "@/context/CartContext";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Kart numarası formatlaması
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 16)
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    }
    // Son kullanma tarihi formatlaması
    else if (name === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4)
        .replace(/(\d{2})(?=\d)/, "$1/");
    }
    // CVV formatlaması
    else if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 3);
    }
    // Telefon formatlaması
    else if (name === "phone") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 10)
        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Burada ödeme işlemi yapılacak
    alert("Siparişiniz başarıyla alındı!");
    clearCart();
    router.push("/");
  };

  if (typeof window !== "undefined" && cartItems.length === 0) {
    router.push("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sol Taraf - Sipariş Özeti */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Sipariş Özeti</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.color} - Beden: {item.size}
                    </p>
                    <p className="text-sm">Adet: {item.quantity}</p>
                    <p className="font-semibold">₺{item.price}</p>
                  </div>
                </div>
              ))}
              <div className="mt-4 flex justify-between border-t pt-4">
                <span className="text-lg font-semibold">Toplam</span>
                <span className="text-lg font-semibold">
                  ₺
                  {totalPrice.toLocaleString("tr-TR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Ödeme Formu */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Ödeme Bilgileri</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                  placeholder="Ad Soyad"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                  placeholder="E-posta adresiniz"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                  placeholder="(5XX) XXX-XXXX"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Adres</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                  rows={3}
                  placeholder="Teslimat adresi"
                />
              </div>
              <div className="mt-6 border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">Kart Bilgileri</h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Son Kullanma Tarihi
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                        placeholder="AA/YY"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-md border p-2 focus:border-black focus:outline-none"
                        placeholder="XXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-black py-3 text-white transition-colors hover:bg-gray-800"
              >
                Ödemeyi Tamamla
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
